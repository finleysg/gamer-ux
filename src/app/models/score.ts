import { Hole } from './hole';
import { Player } from './player';

export class Score {
  id: number;
  roundId: number;
  playerId: number;
  holeId: number;
  grossScore: number;
  player: Player;
  hole: Hole;
  // TODO: add these to the api
  noScore: boolean;
  proxy: boolean;

  fromJson(json: any): Score {
    this.id = json.id;
    this.roundId = json.round;
    this.playerId = json.player;
    this.holeId = json.hole;
    this.grossScore = json.gross_score;
    return this;
  }

  toJson(): any {
    return {
      'id': this.id,
      'round': this.roundId,
      'player': this.playerId,
      'hole': this.holeId,
      'gross_score': this.grossScore
    }
  }
}

export class Skin {
  hole: Hole;
  player: Player;
  score: number;
  value: number;

  constructor(score: Score, value: number, bumps: number = 0) {
    this.hole = score.hole;
    this.player = score.player;
    this.score = score.grossScore - bumps;
    this.value = value;
  }
}
