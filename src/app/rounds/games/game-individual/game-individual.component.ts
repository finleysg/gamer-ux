import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoundService } from '../../../core/round.service';
import { Round } from '../../../models/round';
import { Game, Payout } from '../../../models/game';
import { Team } from '../../../models/team';
import { clone } from 'lodash';
import { GameService } from '../../../core/game.service';

@Component({
  selector: 'app-game-individual',
  templateUrl: './game-individual.component.html',
  styleUrls: ['./game-individual.component.css']
})
export class GameIndividualComponent implements OnInit {

  round: Round;
  game: Game;
  gameTypes: string[];
  scoringTypes: string[] = [];

  constructor(
    private roundService: RoundService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameTypes = this.gameService.individualGames;
    this.route.data
      .subscribe((data: {round: Round, game: Game}) => {
        this.round = data.round;
        this.game = data.game;
        // Auto-load teams if this is a new game
        if (this.game.teams.length === 0) {
          this.game.teams = this.gameService.allPlay();
        }
      });
  }

  updateScoringTypes(gameType: string): void {
    this.scoringTypes = this.gameService.getScoringTypes(gameType);
  }

  displayName(playerId: number): string {
    return this.roundService.players.find(p => p.id === playerId).name;
  }

  addPayout(): void {
    if (!this.game.payouts) {
      this.game.payouts = [];
    }
    this.game.payouts.push(new Payout());
  }

  removePayout(): void {
    const idx = this.game.payouts.length - 1;
    this.game.payouts.splice(idx, 1);
  }

  save(): void {
    this.roundService.updateGame(this.game).then(() => {
      this.router.navigate(['gameTypes']); //TODO: relative to? (may need to do absolute route)
    });
  }
}
