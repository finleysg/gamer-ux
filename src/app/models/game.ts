import { Team } from './team';
import { Course } from './course';
import { Round } from './round';

export class Game {
  id: number;
  name: string;
  isNet: boolean;
  isTeam: boolean;
  gameType: string;
  scoringType: string;
  numberOfScores: number;
  payouts: Payout[];
  betValue: number;
  roundId: number;
  teams: Team[] = [];

  // Auto include everyone for an individual game
  allPlay(players: any[], course: Course): void {
    if (this.isTeam) return;
    players.forEach(p => {
      let team = new Team();
      team.playerId = p.id;
      team.strokes = course.calculateHandicap(p.handicapIndex);
      team.teamNumber = 0;
      this.teams.push(team);
      p.playing = true;
    })
  }

  teamsFromGroups(round: Round): void {
    if (!this.isTeam) return;
    this.teams = [];
    round.groups.forEach(group => {
      group.players.forEach(player => {
        let team = new Team();
        team.playerId = player.id;
        team.strokes = round.course.calculateHandicap(player.handicapIndex);
        team.teamNumber = group.number;
        this.teams.push(team);
      });
    });
  }

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
    return this;
  }

  toJson(): any {
    return {
      'id': this.id,
      'is_net': this.isNet,
      'is_team': this.isTeam,
      'game_type': this.gameType,
      'scoring_type': this.scoringType,
      'bet_value': this.betValue,
      'session': this.roundId
    }
  }
}

export class Payout {
  place: number;
  percentage: number;
  amount: number;
}
