import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { RoundService } from '../../core/round.service';
import { GameService } from '../../core/game.service';
import { Round } from '../../models/round';
import { Game } from '../../models/game';
import { Player } from '../../models/player';
import { clone } from 'lodash';

@Component({
  selector: 'app-game-match',
  templateUrl: './game-match.component.html',
  styleUrls: ['./game-match.component.css']
})
export class GameMatchComponent implements OnInit, OnDestroy {

  round: Round;
  game: Game;
  players: Player[];
  gameTypes: string[];
  scoringTypes: string[] = [];

  private subscription: Subscription;

  constructor(
    private roundService: RoundService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameTypes = this.gameService.matchGames;
    this.subscription = this.roundService.currentRound
      .subscribe((round: Round) => {
        this.round = round;
        this.game = this.round.games.find(g => g.id.toString() === this.route.snapshot.queryParams['id']);
        this.players = clone(this.roundService.players);
        if (this.game.teams.length !== 2) {
          this.game.teams = this.gameService.createMatchTeams();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateScoringTypes(): void {
    this.scoringTypes = this.gameService.getMatchScoringTypes(this.game.gameType);
    if (this.scoringTypes.length === 1) {
      this.game.scoringType = this.scoringTypes[0];
    }
    this.deriveName();
  }

  displayName(playerId: number): string {
    let player = this.players.find(p => p.id === playerId);
    if (!player || !player.name) {
      return 'TBD';
    }
    return player.name;
  }

  save(): void {
    this.roundService.updateGame(this.game).then(() => {
      this.router.navigate(['rounds', this.round.code, 'games']);
    });
  }

  refresh(): void {
    this.deriveName();
    this.calculateHandicaps();
  }

  deriveName(): void {
    this.game.name = `${this.displayName(this.game.teams[0].playerId)} vs ${this.displayName(this.game.teams[1].playerId)}`;
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
