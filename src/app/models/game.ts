import { Team } from './team';

export class Game {
  id: number;
  name: string;
  isNet: boolean;
  competitionType: string;
  gameType: string;
  scoringType: string;
  numberOfScores: number;
  betValue: number;
  roundId: number;
  teams: Team[] = [];
  payouts: Payout[] = [];

  fromJson(json): Game {
    this.id = json.id;
    this.name = json.name;
    this.isNet = json.is_net;
    this.competitionType = json.competition_type;
    this.gameType = json.game_type;
    this.scoringType = json.scoring_type;
    this.numberOfScores = json.number_of_scores;
    this.betValue = json.bet_value;
    this.roundId = json.round;
    if (json.teams) {
      json.teams.forEach(team => {
        this.teams.push(new Team().fromJson(team));
      });
    }
    if (json.payouts) {
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
      'name': this.name,
      'round': this.roundId,
      'is_net': this.isNet,
      'competition_type': this.competitionType,
      'game_type': this.gameType,
      'scoring_type': this.scoringType,
      'number_of_scores': this.numberOfScores,
      'bet_value': this.betValue,
      'teams': teams,
      'payouts': payouts
    }
  }
  
  get teamNumbers(): number[] {
    return this.teams.map(team => team.teamNumber)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((n1: number, n2: number) => n1 - n2);
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
    this.percentage = json.percentage * 100;
    this.amount = json.amount;
    return this;
  }

  toJson(): any {
    return {
      'id': this.id,
      'place': this.place,
      'percentage': this.percentage / 100,
      'amount': this.amount
    }
  }
}
