import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { RoundService } from './round.service';
import { Round } from '../models/round';
import { Group } from '../models/group';
import { Score } from '../models/score';
import { Hole } from '../models/hole';
import { Player } from '../models/player';
import { Observable } from "rxjs/Observable";
import {Leaderboard} from "../models/leaderboard";

@Injectable()
export class ScoringService {

  private _group: Group;
  private _scores: Score[];
  private _currentRound: Round;
  private _hole: Hole;
  
  constructor(
    private roundService: RoundService,
    private dataService: DataService
  ) {
  }
  
  get lastHole(): Hole {
    return this._hole;
  }
  
  get currentGroup(): Group {
    return this._group;
  }

  ensureRound(code: string): Promise<Round> {
    if (this._currentRound && this._currentRound.code === code) {
      return new Promise(resolve => {
        resolve(this._currentRound);
      });
    }
    else {
      return this.roundService.loadRound(code)
        .then(round => {
          this._currentRound = round;
          return round;
        });
    }
  } 
  
  private loadScores(): Promise<Score[]> {
    return this.dataService.getApiRequest('scores', { 'round': this._currentRound.id })
      .map((json: any) => {
        this._scores = json.map(s => new Score().fromJson(s));
        this._scores.forEach((score: Score) => {
          score.hole = this.getHole(score.holeId);
          score.player = this.getPlayer(score.playerId);
        });
        return this._scores;
      })
      .toPromise();
  }

  getScores(group: Group, hole: Hole): Promise<Score[]> {
    this._group = group;
    return this.loadScores()
      .then(scores => {
        const playerIds = group.players.map(p => p.id);
        let groupScores = scores.filter(s => {
          return s.holeId === hole.id && playerIds.includes(s.playerId);
        });
        // No scores for this hole yet, so create them with par to start
        if (!groupScores || !groupScores.length) {
          groupScores = [];
          group.players.forEach((player: Player) => {
            let score = new Score();
            score.roundId = this._currentRound.id;
            score.holeId = hole.id;
            score.playerId = player.id;
            score.grossScore = hole.par;
            score.hole = hole;
            score.player = player;
            score.dirty = true;
            groupScores.push(score);
          });
        }
        return groupScores;
      });
  }

  saveScores(scores: Score[]): void {
    if (scores[0]) {
      this._hole = scores[0].hole;
    }
    let actions = [];
    scores.forEach(s => {
      if (s.id) {
        actions.push(this.dataService.putApiRequest(`scores/${s.id}`, s.toJson()));
      } else {
        actions.push(this.dataService.postApiRequest('scores', s.toJson()));
      }
    });
    Observable.forkJoin(actions).subscribe();
  }

  calculateEsc(score: Score): number {
    // TODO: based on handicap and current hole
    return score.hole.par + 2;
  }

  getLeaderboard(): Promise<Leaderboard> {
    return this.loadScores()
      .then(scores => {
        let leaderboard = new Leaderboard(this._currentRound.course);
        leaderboard.reload(this.roundService.players, scores);
        return leaderboard;
      });
  }
  
  private getHole(holeId: number): Hole {
    return this._currentRound.course.getHole(holeId);
  }

  private getPlayer(playerId: number): Player {
    return this.roundService.players.find(p => p.id === playerId);
  }
}
