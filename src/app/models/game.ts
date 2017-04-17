import { Team } from './team';

export class Game {
  id: number;
  name: string;
  isNet: boolean;
  isTeam: boolean;
  gameType: string;
  scoringType: string;
  numberOfScores: number;
  betValue: number;
  roundId: number;
  teams: Team[] = [];
  payouts: Payout[] = [];

  fromJson(json): Game {
    this.id = json.id;
    this.isNet = json.is_net;
    this.isTeam = json.is_team;
    this.gameType = json.game_type;
    this.scoringType = json.scoring_type;
    this.betValue = json.bet_value;
    this.roundId = json.round;
    if (json.teams) {
      json.teams.forEach(team => {
        this.teams.push(new Team().fromJson(team));
      });
    }
    if (json.payout) {
      json.payouts.forEach(payout => {
        this.payouts.push(new Payout().fromJson(payout));
      })
    }
    return this;
  }

  toJson(): any {
    let teams = [];
    this.teams.forEach(t => teams.push(t.toJson()));
    let payouts = [];
    this.payouts.forEach(p => payouts.push(p.toJson()));
    return {
      'id': this.id,
      'round': this.roundId,
      'is_net': this.isNet,
      'is_team': this.isTeam,
      'game_type': this.gameType,
      'scoring_type': this.scoringType,
      'bet_value': this.betValue,
      'teams': teams,
      'payouts': payouts
    }
  }
}

export class Payout {
  id: number;
  place: number;
  percentage: number;
  amount: number;

  fromJson(json: any): Payout {
    this.id = json.id;
    this.place = json.place;
    this.percentage = json.percentage;
    this.amount = json.amount;
    return this;
  }

  toJson(): any {
    return {
      'id': this.id,
      'place': this.place,
      'percentage': this.percentage,
      'amount': this.amount
    }
  }
}
