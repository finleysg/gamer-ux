import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { RoundService } from './round.service';
import { Round } from '../models/round';
import { Group } from '../models/group';
import { Score } from '../models/score';
import { Leaderboard } from '../models/leaderboard';
import { Hole } from '../models/hole';
import { Player } from '../models/player';

@Injectable()
export class ScoringService {

  private _players: Player[];
  private _scores: Score[];
  private _leaderboardSource: Subject<Leaderboard>;
  private _currentRound: Round;
  private _currentHole: Hole;
  private _currentHoleSource: Subject<Hole>;

  constructor(
    private roundService: RoundService,
    private dataService: DataService
  ) {
    this.roundService.currentRound.subscribe((round: Round) => {
      this._currentRound = round;
      this._players = this.roundService.players;
    });
    this._currentHoleSource = new Subject<Hole>();
    this._leaderboardSource = new Subject<Leaderboard>();
  }

  get currentHole(): Observable<Hole> {
    return this._currentHoleSource.asObservable();
  }

  get leaderboard(): Observable<Leaderboard> {
    return this._leaderboardSource.asObservable();
  }

  reloadScores(): void {
    this.dataService.getApiRequest('scores', { 'session': this._currentRound.id })
      .do((json: any) => {
        this._scores = json.map(s => new Score().fromJson(s));
        // Attach a Player and Hole object for UI convenience
        this._scores.forEach((score: Score) => {
          score.hole = this.getHole(score.holeId);
          score.player = this.getPlayer(score.playerId); // TODO: may be unnecessary
        });
        this.refreshLeaderboard();
      });
  }

  getScores(group: Group, hole: Hole): Score[] {
    const playerIds = group.players.map(p => p.id);
    let scores = this._scores.filter(s => {
      return s.holeId === hole.id && playerIds.includes(s.playerId);
    });
    // No scores for this hole yet, so create them with par to start
    if (!scores || !scores.length) {
      scores = [];
      group.players.forEach((player: Player) => {
        let score = new Score();
        score.roundId = this._currentRound.id;
        score.holeId = hole.id;
        score.playerId = player.id;
        score.grossScore = hole.par;
        score.hole = hole;
        score.player = player;
        scores.push(score);
      });
    }
    return scores;
  }

  addScore(score: Score): void {
    this.dataService.postApiRequest('scores', score.toJson())
      .do(() => {
        this.reloadScores();
      });
  }

  updateScore(score: Score): void {
    this.dataService.putApiRequest(`scores/${score.id}`, score.toJson())
      .do(() => {
        this.reloadScores();
      });
  }

  calculateEsc(score: Score): number {
    // TODO: based on handicap and current hole
    return score.hole.par + 2;
  }

  private refreshLeaderboard(): void {
    let leaderboard = new Leaderboard(this._currentRound.course);
    leaderboard.reload(this._players, this._scores);
    this._leaderboardSource.next(leaderboard);
  }

  private getHole(holeId: number): Hole {
    return this._currentRound.course.getHole(holeId);
  }

  private getPlayer(playerId: number): Player {
    return this._players.find(p => p.id === playerId);
  }
}
