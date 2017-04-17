import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { RoundService } from '../../core/round.service';
import { GameService } from '../../core/game.service';
import { Round } from '../../models/round';
import { Game, Payout } from '../../models/game';
import { Team } from '../../models/team';
import { Player } from '../../models/player';
import { clone } from 'lodash';

@Component({
  selector: 'app-game-team',
  templateUrl: './game-team.component.html',
  styleUrls: ['./game-team.component.css']
})
export class GameTeamComponent implements OnInit, OnDestroy {

  round: Round;
  game: Game;
  players: Player[];
  gameTypes: string[];
  scoringTypes: string[] = [];
  teams: number[] = [];
  availablePlayers: any = {};
  teamsAreGroups: boolean;

  private subscription: Subscription;

  constructor(
    private roundService: RoundService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameTypes = this.gameService.teamGames;
    this.subscription = this.roundService.currentRound$
      .subscribe(
        (round: Round) => {
          console.log(`GameTeamComponent: round ${round.code}, ${round.games.length} games`);
          this.round = round;
          this.game = this.round.games.find(g => g.id.toString() === this.route.snapshot.queryParams['id']);
          this.players = clone(this.roundService.players);
          this.refresh();
        },
        (err: any) => {
          console.log('GameTeamComponent err');
          console.error(err);
        },
        () => {
          console.log('GameTeamComponent complete');
        }
      );
    this.roundService.reloadRound();
  }

  ngOnDestroy() {
    console.log('GameTeamComponent unsubscribes');
    this.subscription.unsubscribe();
  }

  updateScoringTypes(): void {
    this.scoringTypes = this.gameService.getScoringTypes(this.game.gameType);
    if (this.scoringTypes.length === 1) {
      this.game.scoringType = this.scoringTypes[0];
    }
    this.deriveName();
  }

  displayName(playerId: number): string {
    return this.roundService.players.find(p => p.id === playerId).name;
  }

  addPayout(): void {
    if (!this.game.payouts) {
      this.game.payouts = [];
    }
    let payout = new Payout();
    payout.place = this.game.payouts.length + 1;
    this.game.payouts.push(payout);
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

  updatePayouts(): void {
    const pot = this.game.betValue * this.game.teams.length;
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

  deriveName(): void {
    this.game.name = `${this.game.gameType} (${this.game.isNet ? 'Net': 'Gross'})`;
  }

  assignByGroups(): void {
    if (!this.teamsAreGroups) {
      this.game.teams = this.gameService.teamsFromGroups();
      this.teamsAreGroups = true;
      this.refresh();
    }
  }

  addTeam(): void {
    let teamNumber = 1;
    if (this.teams.length > 0) {
      teamNumber = Math.max(...this.teams) + 1;
    }
    let team1 = new Team();
    team1.teamNumber = teamNumber;
    this.game.teams.push(team1);
    let team2 = new Team();
    team2.teamNumber = teamNumber;
    this.game.teams.push(team2);
    this.refresh();
  }

  removeTeam(): void {
    const maxNumber = Math.max(...this.teams); // spread operator converts to distinct args
    if (maxNumber) {
      for (let i = this.game.teams.length - 1; i >= 0; i--) {
        if (this.game.teams[i].teamNumber === maxNumber) {
          this.game.teams.splice(i, 1);
        }
      }
      this.refresh();
    }
  }

  addPlayer(teamNumber: number): void {
    let newTeam = new Team();
    newTeam.teamNumber = teamNumber;
    this.game.teams.push(newTeam);
    this.refresh();
  }

  removePlayer(teamNumber): void {
    const teams = this.game.teams.filter(t => t.teamNumber === teamNumber);
    const localId = teams[teams.length - 1].localId;
    const idx = this.game.teams.findIndex(t => t.localId === localId);
    this.game.teams.splice(idx, 1);
    this.refresh();
  }

  refresh(): void {
    this.calculateTeamNumbers();
    this.calculateAvailablePlayers();
    this.calculateHandicaps();
    this.deriveName();
  }

  save(): void {
    this.roundService.updateGame(this.game).then(() => {
      this.router.navigate(['rounds', this.round.code, 'games']);
    });
  }

  // in the context of a single game, a player can only be on one team
  calculateAvailablePlayers(): void {
    this.availablePlayers = {};
    this.game.teams.forEach(team => {
      this.availablePlayers[team.localId] = [];
      this.players.forEach(p => {
        let playerTeam = this.game.teams.find(t => t.playerId === p.id);
        if (!playerTeam || playerTeam.localId === team.localId) {
          this.availablePlayers[team.localId].push(clone(p));
        }
      });
    });
  }

  calculateTeamNumbers(): void {
    this.teams = this.game.teams.map(team => team.teamNumber)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  calculateHandicaps(): void {
    if (this.game.isNet) {
      // Start with course handicaps
      this.game.teams.forEach(team => {
        const player = this.roundService.players.find(p => p.id === team.playerId);
        if (player) {
          team.strokes = this.roundService.round.course.calculateHandicap(player.handicapIndex);
        }
      });
      // Find low and play off that
      const caps = this.game.teams.map(t => t.strokes || 0);
      const lowCap = Math.min(...caps);
      this.game.teams.forEach(team => {
        if (team.playerId) {
          team.strokes = team.strokes - lowCap;
        }
      });
    } else {
      this.game.teams.forEach(team => {
        team.strokes = 0;
      });
    }
  }
}
