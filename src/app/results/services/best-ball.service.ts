import { Injectable } from '@angular/core';
import { RoundService } from '../../core/round.service';
import { GameService } from '../../core/game.service';
import { Game } from '../../models/game';
import { Score } from '../../models/score';
import { Hole } from '../../models/hole';
import { clone } from 'lodash';

export class BestBallResult {
  description: string;
  position: number = 0;
  teamNumber: number = 0;
  players: string;
  totalScore: number = 0;
  resultText: string;
  amount: number = 0;
}

class MatchResult {
  winner: number;
  runningTotal: number;
  remainingHoles: number;
}

@Injectable()
export class BestBallService {

  private holes: Hole[];

  constructor(
    private roundService: RoundService,
    private gameService: GameService
  ) {
    this.holes = roundService.round.course.holes;
  }

  payoutScoring(game: Game, scores: Score[]): BestBallResult[] {
    let results: BestBallResult[] = [];
    // calculate combined scores
    game.teamNumbers.forEach(nbr => {
      let result = new BestBallResult();
      result.teamNumber = nbr;
      result.players = this.gameService.teamMembers(game, nbr);
      this.holes.forEach(hole => {
        let teamScores = scores.filter(s => s.teamNumber === nbr && s.holeId === hole.id);
        result.totalScore += this.getScore(game, teamScores);
      });
    });
    // sort and assign places
    results = results.sort((r1: BestBallResult, r2: BestBallResult) => r1.totalScore - r2.totalScore);
    results.forEach((r: BestBallResult, idx: number) =>  {
      r.position = idx + 1;
      r.resultText = `${this.displayPosition(r.position)} place`;
    });
    // calculate payouts for the winners
    game.payouts.forEach(payout => {
      let team = results.find(r => r.position === payout.place);
      if (team) {
        team.amount = payout.amount;
      }
    });
    return results;
  }

  matchPlayScoring(game: Game, scores: Score[]): BestBallResult[] {
    let result = new BestBallResult();
    let match = this.evaluateMatch(game, scores, this.holes);
    result.position = 1;
    result.teamNumber = match.winner;
    result.players = this.gameService.teamMembers(game, match.winner);
    result.resultText = this.getResultText(match.runningTotal, match.remainingHoles);
    result.amount = game.betValue;
    return [result];
  }

  nassauScoring(game: Game, scores: Score[]): BestBallResult[] {
    // front 9
    let front = new BestBallResult();
    let match1 = this.evaluateMatch(game, scores, this.holes.filter(h => h.holeNumber <= 9));
    front.description = 'Front 9';
    front.position = 1;
    front.teamNumber = match1.winner;
    front.players = this.gameService.teamMembers(game, match1.winner);
    front.resultText = this.getResultText(match1.runningTotal, match1.remainingHoles);
    front.amount = game.betValue;
    // back 9
    let back = new BestBallResult();
    let match2 = this.evaluateMatch(game, scores, this.holes.filter(h => h.holeNumber >= 10));
    back.description = 'Back 9';
    back.position = 1;
    back.teamNumber = match2.winner;
    back.players = this.gameService.teamMembers(game, match2.winner);
    back.resultText = this.getResultText(match2.runningTotal, match2.remainingHoles);
    back.amount = game.betValue;
    // total
    let total = new BestBallResult();
    let match = this.evaluateMatch(game, scores, this.holes);
    total.description = 'Total';
    total.position = 1;
    total.teamNumber = match.winner;
    total.players = this.gameService.teamMembers(game, match.winner);
    total.resultText = this.getResultText(match.runningTotal, match.remainingHoles);
    total.amount = game.betValue;

    return [front, back, total];
  }

  closeoutScoring(game: Game, scores: Score[]): BestBallResult[] {
    let results: BestBallResult[] = [];
    let holes = clone(this.holes);
    let bet = game.betValue;
    do {
      let result = new BestBallResult();
      let match = this.evaluateMatch(game, scores, holes);
      result.description = 'TODO';
      result.position = 1;
      result.teamNumber = match.winner;
      result.players = this.gameService.teamMembers(game, match.winner);
      result.resultText = this.getResultText(match.runningTotal, match.remainingHoles);
      result.amount = bet;
      results.push(result);
      holes = holes.filter(h => h.holeNumber > this.holes.length - match.remainingHoles);
      bet = Math.floor(bet / 2);
    } while(holes.length > 0);

    return results;
  }

  // TODO: Net scoring
  evaluateMatch(game: Game, scores: Score[], holes: Hole[]): MatchResult {
    let isOver: boolean = false;
    let holeCount: number = 0;
    let runningTotal: number = 0;
    let remainingHoles: number = holes.length;
    // compare and tally hole by hole
    holes.forEach(hole => {
      if (!isOver) {
        holeCount += 1;
        const team1Scores = scores.filter(s => s.teamNumber === 1 && s.holeId === hole.id);
        const team2Scores = scores.filter(s => s.teamNumber === 2 && s.holeId === hole.id);
        const t1 = this.getScore(game, team1Scores);
        const t2 = this.getScore(game, team2Scores);
        if (t1 < t2) {
          runningTotal += 1;
        } else if (t2 < t1) {
          runningTotal -= 1;
        }
        remainingHoles = this.holes.length - holeCount;
        if (Math.abs(runningTotal) > remainingHoles) {
          // Match over
          isOver = true;
        }
      }
    });
    // format and return the result
    let match = new MatchResult();
    match.winner = null;
    match.runningTotal = runningTotal;
    match.remainingHoles = remainingHoles;
    if (runningTotal > 0) {
      match.winner = 1;
    } else if (runningTotal < 0) {
      match.winner = 2;
    }
    
    return match;
  }

  getResultText(runningTotal: number, remainingHoles: number): string {
    if (remainingHoles === 0) {
      return `${Math.abs(runningTotal)} up`;
    }
    return `${Math.abs(runningTotal)} and ${remainingHoles}`;
  }

  displayPosition(position: number): string {
    switch (position) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return `${position}th`;
    }
  }

  getNumberOfBalls(game: Game): number {
    let balls: number = 1;
    if (game.gameType === 'Best Two Balls') {
      balls = 2;
    } else if (game.gameType === 'Best Three Balls') {
      balls = 3;
    }
    return balls;
  }

  getLowScores(game: Game, scores: Score[]): Score[] {
    const balls = this.getNumberOfBalls(game);
    const lowScores = scores.sort((s1: Score, s2: Score) => s1.grossScore - s2.grossScore);
    return lowScores.slice(0, balls-1);
  }

  getScore(game: Game, scores: Score[]): number {
    let score = 0;
    const balls = this.getNumberOfBalls(game);
    const scoreNumbers = scores.map(s => s.grossScore).sort((n1: number, n2: number) => n1 - n2);
    for(let i = 0; i < balls; i++) {
      score += scoreNumbers[i];
    }
    return score;
  }

  getLowNetScores(game: Game, scores: Score[]): Score[] {
    this.calculateNetScores(game, scores);
    const balls = this.getNumberOfBalls(game);
    const lowScores = scores.sort((s1: Score, s2: Score) => s1.netScore - s2.netScore);
    return lowScores.slice(0, balls-1);
  }

  getNetScore(game: Game, scores: Score[]): number {
    this.calculateNetScores(game, scores);
    let score = 0;
    const balls = this.getNumberOfBalls(game);
    const scoreNumbers = scores.map(s => s.netScore).sort((n1: number, n2: number) => n1 - n2);
    for(let i = 0; i < balls; i++) {
      score += scoreNumbers[i];
    }
    return score;
  }

  calculateNetScores(game: Game, scores: Score[]): void {
    scores.forEach(s => {
      const strokes = game.teams.filter(t => t.playerId === s.playerId).map(m => m.strokes)[0];
      s.netScore = s.grossScore - s.hole.getBumps(strokes, this.holes.length);
    });
  }
}
