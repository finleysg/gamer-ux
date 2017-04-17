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
      team.isPlaying = true;
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

  createMatchTeams(): Team[] {
    let teams = [];
    let team1 = new Team();
    team1.teamNumber = 1;
    teams.push(team1);
    let team2 = new Team();
    team2.teamNumber = 2;
    teams.push(team2);
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
      case 'Best Ball':
      case 'Best Two Balls':
      case 'Best Three Balls':
        return ['Closeout', 'Match', 'Nassau', 'Payouts'];
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


  getMatchScoringTypes(gameType: string): string[] {
    switch (gameType) {
      case 'Stableford':
        return ['Single Bet', 'Points'];
      case 'Match Play':
        return ['Closeout', 'Nassau', 'Single Bet'];
      case 'Stroke Play':
        return ['Single Bet'];
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
      'Best Two Balls',
      'Best Three Balls',
      'Hollywood',
      'Las Vegas',
      'Las Vegas (Flips)',
      'Low Ball, Low Total',
      'Low Ball, High Ball'
    ];
  }

  get matchGames(): string [] {
    return [
      'Match Play',
      'Stableford',
      'Stroke Play'
    ];
  }
}
