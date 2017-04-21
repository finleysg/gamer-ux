import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoundService } from '../../core/round.service';
import { GameService } from '../../core/game.service';
import { Game, Payout } from '../../models/game';
import { Player } from '../../models/player';
import { clone } from 'lodash';
import { Team } from '../../models/team';
import { Round } from '../../models/round';
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  round: Round;
  game: Game;
  gameTypes: string[];
  scoringTypes: string[] = [];
  playerList: Player[] = [];
  teamNumbers: number[] = [];
  availablePlayers: any = {};
  teamsAreGroups: boolean;

  constructor(
    private roundService: RoundService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private snackBar: MdSnackBar,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: {round: Round}) => {
          this.round = data.round;
          this.game = this.gameService.selectGame(+this.route.snapshot.params['id']);
          this.gameTypes = this.gameService.getGameTypes(this.game);
          this.playerList = this.gameService.allPlayers;
          this.updateAvailablePlayers();
        },
        (err: any) => {
          console.log('GameComponent err');
          console.error(err);
        },
        () => {
          console.log('GameComponent complete');
        }
      );
  }

  updateGameType(): void {
    this.scoringTypes = this.gameService.getScoringTypes(this.game);
    if (this.scoringTypes.length === 1) {
      this.game.scoringType = this.scoringTypes[0];
    }
    this.deriveGameName();
  }

  updateScoringType(): void {
    this.deriveGameName();
  }

  updateNetVsGross(): void {
    this.deriveGameName();
    this.gameService.calculateHandicaps(this.game);
  }

  displayName(playerId: number): string {
    let player = this.playerList.find(p => p.id === playerId);
    if (!player || !player.name) {
      return 'TBD';
    }
    return player.name;
  }

  deriveGameName(): void {
    let name = 'New Game';
    if (this.game.gameType) {
      if (this.game.competitionType.toLowerCase() === 'match') {
        name = `${this.displayName(this.game.teams[0].playerId)} vs ${this.displayName(this.game.teams[1].playerId)} ${this.game.gameType}`;
      } else {
        name = `${this.game.isNet ? 'Net' : 'Gross'} ${this.game.gameType} (${this.game.scoringType})`;
      }
    }
    this.game.name = name;
  }

  updateTeamNumbers(): void {
    this.teamNumbers = this.game.teams.map(team => team.teamNumber)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  save(): void {
    // TODO: remove any non-playing team members
    this.roundService.updateGame(this.game)
      .then(() => {
        this.location.back();
        // this.router.navigate(['rounds', this.round.code, 'games']);
      })
      .catch(err => this.snackBar.open(err, '', { duration: 3000 }));
  }

  // Methods for team games
  assignByGroups(): void {
    if (!this.teamsAreGroups) {
      this.gameService.createDefaultTeams(this.game);
      this.teamsAreGroups = true;
    }
  }


  addTeam(): void {
    let teamNumber = 1;
    if (this.teamNumbers.length > 0) {
      teamNumber = Math.max(...this.teamNumbers) + 1;
    }
    let team1 = new Team();
    team1.teamNumber = teamNumber;
    this.game.teams.push(team1);
    let team2 = new Team();
    team2.teamNumber = teamNumber;
    this.game.teams.push(team2);
    this.updateTeamNumbers();
    this.updateAvailablePlayers();
  }

  removeTeam(): void {
    const maxNumber = Math.max(...this.teamNumbers); // spread operator converts to distinct args
    if (maxNumber) {
      for (let i = this.game.teams.length - 1; i >= 0; i--) {
        if (this.game.teams[i].teamNumber === maxNumber) {
          this.game.teams.splice(i, 1);
        }
      }
      this.updateTeamNumbers();
      this.updateAvailablePlayers();
      this.gameService.calculateHandicaps(this.game);
    }
  }

  addPlayer(teamNumber: number): void {
    let newTeam = new Team();
    newTeam.teamNumber = teamNumber;
    this.game.teams.push(newTeam);
  }

  removePlayer(teamNumber): void {
    const teams = this.game.teams.filter(t => t.teamNumber === teamNumber);
    const localId = teams[teams.length - 1].localId;
    const idx = this.game.teams.findIndex(t => t.localId === localId);
    this.game.teams.splice(idx, 1);
    this.gameService.calculateHandicaps(this.game);
  }

  // in the context of a single team game, a player can only be on one team
  updateAvailablePlayers(): void {
    this.availablePlayers = {};
    this.game.teams.forEach(team => {
      this.availablePlayers[team.localId] = [];
      this.playerList.forEach(p => {
        let playerTeam = this.game.teams.find(t => t.playerId === p.id);
        if (!playerTeam || playerTeam.localId === team.localId) {
          this.availablePlayers[team.localId].push(clone(p));
        }
      });
    });
    this.gameService.calculateHandicaps(this.game);
    this.deriveGameName();
  }

  // Methods for payouts
  addPayout(): void {
    if (!this.game.payouts) {
      this.game.payouts = [];
    }
    let payout = new Payout();
    payout.place = this.game.payouts.length + 1;
    this.game.payouts.push(payout);
  }

  calculatePayouts(): void {
    const pot = this.calculatePot();
    if (pot > 0) {
      this.game.payouts.forEach(payout =>  {
        if (payout.percentage) {
          payout.amount = Math.floor(pot * (payout.percentage / 100));
        }
      });
    }
  }

  removePayout(): void {
    const idx = this.game.payouts.length - 1;
    this.game.payouts.splice(idx, 1);
  }

  // TODO: exclude non-playing
  private calculatePot(): number {
    return this.game.betValue * this.playerList.length;
  }

  displayPlace(place: number): string {
    switch (place) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return `${place}th`;
    }
  }
}
