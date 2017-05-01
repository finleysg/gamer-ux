import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { RoundService } from './round.service';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { clone, cloneDeep } from 'lodash';

@Injectable()
export class GameService {

  private playerList: Player[];
  private teamNumbers: number[];

  constructor(private roundService: RoundService) {
    this.playerList = clone(roundService.players);
  }

  get allPlayers(): Player[] {
    return this.playerList;
  }

  get uniqueTeamNumbers(): number[] {
    return this.teamNumbers;
  }

  selectGame(id: number): Game {
    const game = this.roundService.round.games.find(g => g.id === id);
    if (!game) {
      throw `No game has been created for id ${id}`;
    }
    if (game.teams.length == 0 && game.competitionType != 'team') {
      this.createDefaultTeams(game);
    }
    return game;
  }

  createDefaultTeams(game: Game): void {
    if (game.competitionType === 'individual') {
      game.teams = this.allPlay();
    } else if (game.competitionType === 'team') {
      game.teams = this.teamsFromGroups();
    } else {
      game.teams = this.createMatchTeams();
    }
    this.calculateHandicaps(game);
  }

  getScoringTypes(game: Game): string[] {
    if (game.competitionType === 'match') {
      switch (game.gameType) {
        case 'Stableford':
          return ['Single Bet', 'Points'];
        case 'Match Play':
          return ['Closeout', 'Nassau', 'Single Bet'];
        case 'Stroke Play':
          return ['Single Bet'];
        default:
          return [];
      }
    } else {
      switch (game.gameType) {
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
  }

  getGameTypes(game: Game): string[] {
    if (game.competitionType === 'individual') {
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
    } else if (game.competitionType === 'team') {
      return [
        'Best Ball',
        'Best Two Balls',
        'Best Three Balls',
        'Flip the Burger',
        'Hollywood',
        'Las Vegas',
        'Las Vegas (Flips)',
        'Low Ball, Low Total',
        'Low Ball, High Ball'
      ];
    } else {
      return [
        'Match Play',
        'Stableford',
        'Stroke Play'
      ];
    }
  }

  // To auto-include everyone for an individual game
  private allPlay(): Team[] {
    let teams = [];
    this.roundService.players.forEach(p => {
      let team = new Team();
      team.playerId = p.id;
      // team.strokes = this.roundService.round.course.calculateHandicap(p.handicapIndex);
      team.teamNumber = 0;
      teams.push(team);
    });
    return teams;
  }

  private teamsFromGroups(): Team[] {
    let teams = [];
    this.roundService.round.groups.forEach(group => {
      group.players.forEach(player => {
        let team = new Team();
        team.playerId = player.id;
        // team.strokes = this.roundService.round.course.calculateHandicap(player.handicapIndex);
        team.teamNumber = group.number;
        teams.push(team);
      });
    });
    return teams;
  }

  private createMatchTeams(): Team[] {
    let teams = [];
    let team1 = new Team();
    team1.teamNumber = 1;
    teams.push(team1);
    let team2 = new Team();
    team2.teamNumber = 2;
    teams.push(team2);
    return teams;
  }

  // TODO: maybe make it an option not to play off the low cap
  calculateHandicaps(game: Game): void {
    if (game.isNet) {
      // Start with course handicaps
      game.teams.forEach(team => {
        const player = this.playerList.find(p => p.id === team.playerId);
        if (player) {
          team.strokes = this.roundService.round.course.calculateHandicap(player.handicapIndex);
        }
      });
      // Find low and play off that
      const caps = game.teams.map(t => t.strokes || 0);
      const lowCap = Math.min(...caps);
      game.teams.forEach(team => {
        if (team.playerId) {
          team.strokes = team.strokes - lowCap;
        }
      });
    } else {
      game.teams.forEach(team => {
        team.strokes = 0;
      });
    }
  }
}
