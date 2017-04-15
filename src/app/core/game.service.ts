import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Team } from '../models/team';
import { RoundService } from './round.service';

@Injectable()
export class GameService {

  constructor(private roundService: RoundService) { }

  // To auto-include everyone for an individual game
  allPlay(): Team[] {
    let teams = [];
    this.roundService.players.forEach(p => {
      let team = new Team();
      team.playerId = p.id;
      team.strokes = this.roundService.round.course.calculateHandicap(p.handicapIndex);
      team.teamNumber = 0;
      teams.push(team);
    });
    return teams;
  }

  teamsFromGroups(): Team[] {
    let teams = [];
    this.roundService.round.groups.forEach(group => {
      group.players.forEach(player => {
        let team = new Team();
        team.playerId = player.id;
        team.strokes = this.roundService.round.course.calculateHandicap(player.handicapIndex);
        team.teamNumber = group.number;
        teams.push(team);
      });
    });
    return teams;
  }

  getScoringTypes(gameType: string): string[] {
    switch (gameType) {
      case 'Skins':
      case 'Deuce Pot':
        return ['Split Pot'];
      case 'Defender':
      case 'Nine Points':
      case 'Split Sixes':
      case 'Las Vegas':
      case 'Las Vegas (Flips)':
        return ['Points'];
      case 'Chicago':
      case 'Stableford':
        return ['Payouts', 'Points'];
      case 'Low Ball, Low Total':
      case 'Low Ball, High Ball':
        return ['Closeout', 'Match', 'Nassau', 'Points'];
      case 'Match Play':
        return ['Closeout', 'Match', 'Nassau'];
      case 'Low Gross / Low Net':
      case 'Stroke Play':
        return ['Payouts'];
      case 'Hollywood':
        return ['Match', 'Points'];
      default:
        return [];
    }
  }

  get individualGames(): string[] {
    return [
      'Chicago',
      'Defender',
      'Deuce Pot',
      'Low Gross / Low Net',
      'Nine Points',
      'Skins',
      'Split Sixes',
      'Stableford',
      'Stroke Play'
    ];
  }

  get teamGames(): string [] {
    return [
      'Best Ball',
      'Hollywood',
      'Las Vegas',
      'Las Vegas (Flips)',
      'Low Ball, Low Total',
      'Low Ball, High Ball',
      'Match Play'
    ];
  }
}
