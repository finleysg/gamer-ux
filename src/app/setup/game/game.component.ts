import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoundService } from '../../core/round.service';
import { GameService } from '../../core/game.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game;
  gameTypes: string[];
  scoringTypes: string[] = [];

  teams: number[] = [];
  availablePlayers: any = {};
  teamsAreGroups: boolean;

  constructor(
    private roundService: RoundService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        () => {
          this.gameService.selectGame(+this.route.snapshot.params['id'])
            .subscribe(game => {
              this.game = game;
              this.gameTypes = this.gameService.getGameTypes();
              this.scoringTypes = this.gameService.getScoringTypes();
              this.teams = this.gameService.uniqueTeamNumbers;
              this.availablePlayers = this.gameService.availablePlayerMap;
            });
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

  updateGameType(selectedType: string): void {
    this.gameService.updateGameType(selectedType);
  }

  displayName(playerId: number): string {
    return this.gameService.getPlayerName(playerId);
  }

  save(): void {
    // TODO: remove any non-playing team members
    this.roundService.updateGame(this.game).then(() => {
      // TODO: navigate back
      // this.router.navigate(['rounds', this.round.code, 'games']);
    });
  }

  // Methods for team games
  assignByGroups(): void {
    if (!this.teamsAreGroups) {
      this.gameService.createDefaultTeams();
      this.teamsAreGroups = true;
    }
  }

  addTeam(): void {
    this.gameService.addTeam();
  }

  removeTeam(): void {
    this.gameService.removeTeam();
  }

  addPlayer(teamNumber: number): void {
    this.gameService.addPlayer(teamNumber);
  }

  removePlayer(teamNumber): void {
    this.gameService.removePlayer(teamNumber);
  }

  // Methods for payouts
  addPayout(): void {
    this.gameService.addPayout();
  }

  updatePayouts(): void {
    this.gameService.calculatePayouts();
  }

  removePayout(): void {
    this.gameService.removePayout();
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
