import { Hole } from './hole';
import { Player } from './player';

export class Score {
  id: number;
  sessionId: number;
  playerId: number;
  holeId: number;
  grossScore: number;
  player: Player;
  hole: Hole;

  fromJson(json: any): Score {
    this.id = json.id;
    this.sessionId = json.session;
    this.playerId = json.player;
    this.holeId = json.hole;
    this.grossScore = json.gross_score;
    return this;
  }

  toJson(): any {
    return {
      'id': this.id,
      'session': this.sessionId,
      'player': this.playerId,
      'hole': this.holeId,
      'gross_score': this.grossScore
    }
  }
}
