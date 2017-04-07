import { Team } from './team';

export class Game {
  id: number;
  isNet: boolean;
  teamType: string;
  gameType: string;
  scoringType: string;
  betValue: number;
  sessionId: number;
  teams: Team[];

  fromJson(json): Game {
    this.id = json.id;
    this.isNet = json.is_net;
    this.teamType = json.team_type;
    this.gameType = json.game_type;
    this.scoringType = json.team_scoring_type;
    this.betValue = json.bet_value;
    this.sessionId = json.session;
    if (json.teams) {
      json.teams.forEach(team => {
        this.teams.push(new Team().fromJson(team));
      });
    }
    return this;
  }

  toJson(): any {
    return {
      'id': this.id,
      'is_net': this.isNet,
      'team_type': this.teamType,
      'game_type': this.gameType,
      'team_scoring_type': this.scoringType,
      'bet_value': this.betValue,
      'session': this.sessionId
    }
  }
}
