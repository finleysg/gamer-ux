import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { RoundService } from './round.service';
import { Game, Payout } from '../models/game';
import { Player } from '../models/player';
import { clone, cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GameService {

  private playerList: Player[];
  private teamNumbers: number[];
  private playerMap: any;

  private currentGameSource: BehaviorSubject<Game>;
  private currentGame: Game;

  constructor(private roundService: RoundService) {
    this.currentGame = new Game();
    this.currentGameSource = new BehaviorSubject<Game>(this.currentGame);
    this.playerList = clone(roundService.players);
  }

  get uniqueTeamNumbers(): number[] {
    return this.teamNumbers;
  }

  get availablePlayerMap(): any {
    return this.playerMap;
  }

  selectGame(id: number): Observable<Game> {
    if (!this.currentGame || this.currentGame.id !== id) {
      this.currentGame = this.roundService.round.games.find(g => g.id === id);
      if (!this.currentGame) {
        throw `No game has been created for id ${id}`;
      }
      if (this.currentGame.teams.length == 0 && this.currentGame.competitionType != 'team') {
        this.createDefaultTeams();
      }
      this.currentGameSource.next(cloneDeep(this.currentGame));
    }
    return this.currentGameSource.asObservable();
  }

  updateGameType(gameType: string): void {
    this.currentGame.gameType = gameType;
    const scoringTypes = this.getScoringTypes();
    if (scoringTypes.length === 1) {
      this.currentGame.scoringType = scoringTypes[0];
    }
    this.refresh();
  }

  createDefaultTeams(): void {
    if (this.currentGame.competitionType === 'individual') {
      this.currentGame.teams = this.allPlay();
    } else if (this.currentGame.competitionType === 'team') {
      this.currentGame.teams = this.teamsFromGroups();
    } else {
      this.currentGame.teams = this.createMatchTeams();
    }
    this.refresh();
  }

  addTeam(): void {
    let teamNumber = 1;
    if (this.teamNumbers.length > 0) {
      teamNumber = Math.max(...this.teamNumbers) + 1;
    }
    let team1 = new Team();
    team1.teamNumber = teamNumber;
    this.currentGame.teams.push(team1);
    let team2 = new Team();
    team2.teamNumber = teamNumber;
    this.currentGame.teams.push(team2);
    this.refresh();
  }

  removeTeam(): void {
    const maxNumber = Math.max(...this.teamNumbers); // spread operator converts to distinct args
    if (maxNumber) {
      for (let i = this.currentGame.teams.length - 1; i >= 0; i--) {
        if (this.currentGame.teams[i].teamNumber === maxNumber) {
          this.currentGame.teams.splice(i, 1);
        }
      }
      this.refresh();
    }
  }

  addPlayer(teamNumber: number): void {
    let newTeam = new Team();
    newTeam.teamNumber = teamNumber;
    this.currentGame.teams.push(newTeam);
    this.refresh();
  }

  removePlayer(teamNumber): void {
    const teams = this.currentGame.teams.filter(t => t.teamNumber === teamNumber);
    const localId = teams[teams.length - 1].localId;
    const idx = this.currentGame.teams.findIndex(t => t.localId === localId);
    this.currentGame.teams.splice(idx, 1);
    this.refresh();
  }

  addPayout(): void {
    if (!this.currentGame.payouts) {
      this.currentGame.payouts = [];
    }
    let payout = new Payout();
    payout.place = this.currentGame.payouts.length + 1;
    this.currentGame.payouts.push(payout);
    this.refresh();
  }

  calculatePayouts(): void {
    const pot = this.calculatePot();
    if (pot > 0) {
      this.currentGame.payouts.forEach(payout =>  {
        if (payout.percentage) {
          payout.amount = Math.floor(pot * (payout.percentage / 100));
        }
      });
      this.refresh();
    }
  }

  removePayout(): void {
    const idx = this.currentGame.payouts.length - 1;
    this.currentGame.payouts.splice(idx, 1);
    this.refresh();
  }

  getScoringTypes(): string[] {
    if (this.currentGame.competitionType === 'match') {
      switch (this.currentGame.gameType) {
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
      switch (this.currentGame.gameType) {
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

  getGameTypes(): string[] {
    if (this.currentGame.competitionType === 'individual') {
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
    } else if (this.currentGame.competitionType === 'team') {
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
    } else {
      return [
        'Match Play',
        'Stableford',
        'Stroke Play'
      ];
    }
  }

  getPlayerName(playerId: number): string {
    let player = this.playerList.find(p => p.id === playerId);
    if (!player || !player.name) {
      return 'TBD';
    }
    return player.name;
  }

  refresh(): void {
    this.updateTeamNumbers();
    this.updatePlayerMap();
    this.calculateHandicaps();
    this.deriveGameName();
    this.currentGameSource.next(cloneDeep(this.currentGame));
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

  private deriveGameName(): void {
    let name = 'New Game';
    if (this.currentGame.gameType) {
      if (this.currentGame.competitionType.toLowerCase() === 'match') {
        name = `${this.getPlayerName(this.currentGame.teams[0].playerId)} vs ${this.getPlayerName(this.currentGame.teams[1].playerId)} ${this.currentGame.gameType}`;
      } else {
        name = `${this.currentGame.isNet ? 'Net' : 'Gross'} ${this.currentGame.gameType} (${this.currentGame.scoringType})`;
      }
    }
    this.currentGame.name = name;
  }

  private updateTeamNumbers(): void {
    this.teamNumbers = this.currentGame.teams.map(team => team.teamNumber)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  // in the context of a single team game, a player can only be on one team
  private updatePlayerMap(): void {
    this.playerMap = {};
    this.currentGame.teams.forEach(team => {
      this.playerMap[team.localId] = [];
      this.playerList.forEach(p => {
        let playerTeam = this.currentGame.teams.find(t => t.playerId === p.id);
        if (!playerTeam || playerTeam.localId === team.localId) {
          this.playerMap[team.localId].push(clone(p));
        }
      });
    });
  }

  // TODO: maybe make it an option not to play off the low cap
  private calculateHandicaps(): void {
    if (this.currentGame.isNet) {
      // Start with course handicaps
      this.currentGame.teams.forEach(team => {
        const player = this.playerList.find(p => p.id === team.playerId);
        if (player) {
          team.strokes = this.roundService.round.course.calculateHandicap(player.handicapIndex);
        }
      });
      // Find low and play off that
      const caps = this.currentGame.teams.map(t => t.strokes || 0);
      const lowCap = Math.min(...caps);
      this.currentGame.teams.forEach(team => {
        if (team.playerId) {
          team.strokes = team.strokes - lowCap;
        }
      });
    } else {
      this.currentGame.teams.forEach(team => {
        team.strokes = 0;
      });
    }
  }

  // TODO: exclude non-playing
  private calculatePot(): number {
    return this.currentGame.betValue * this.playerList.length;
  }
}
