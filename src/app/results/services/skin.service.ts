import { Injectable } from '@angular/core';

import { Game } from '../models/game';
import { Score, Skin } from '../models/score';
import { RoundService } from '../core/round.service';
import { clone } from 'lodash';

@Injectable()
export class SkinService {

  constructor(private roundService: RoundService) { }

  calculate(game: Game, scores: Score[]): Skin[] {
    let results: Score[] = [];
    const holes = this.roundService.round.course.holes;
    holes.forEach(hole => {
      const holeScores = scores.filter(s => s.hole.holeNumber === hole.holeNumber);
      if (holeScores && holeScores.length === game.teams.length) {  // does everyone have a score for the hole?
        const score = game.isNet ? this.getNetSkin(game, clone(holeScores)) : this.getGrossSkin(clone(holeScores));
        if (score) {
          results.push(score);
        }
      }
    });
    const value = results && results.length ? game.betValue * game.teams.length / results.length : 0;
    return results.map(skin => {
      return new Skin(skin, value, game.isNet);
    });
  }

  // Assumption is that all scores are on the same hole
  getGrossSkin(scores: Score[]): Score {
    const scoreNumbers = scores.map(s => s.grossScore);
    const low = Math.min(...scoreNumbers);
    const lowScores = scores.filter(s => s.grossScore === low);
    if (lowScores.length === 1) {
      return lowScores[0];
    }
    return null;
  }

  getNetSkin(game: Game, scores: Score[]): Score {
    const holes = this.roundService.round.course.numberOfHoles;
    // const netScores = scores.map(s => {
    //   // find the player's strokes for this game
    //   const strokes = game.teams.filter(t => t.playerId === s.playerId).map(m => m.strokes)[0];
    //   return {
    //     'playerId': s.playerId,
    //     'netScore': s.grossScore - s.hole.getBumps(strokes, holes)
    //   }
    // });
    scores.forEach(s => {
      const strokes = game.teams.filter(t => t.playerId === s.playerId).map(m => m.strokes)[0];
      s.netScore = s.grossScore - s.hole.getBumps(strokes, holes);
    });
    const low = Math.min(...scores.map(m => m.netScore));
    const lowScores = scores.filter(s => s.netScore === low);
    if (lowScores.length === 1) {
      return scores.filter(s => s.playerId === lowScores[0].playerId)[0];
    }
    return null;
  }
}
