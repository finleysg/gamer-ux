import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { RoundService } from '../../core/round.service';
import { GameService } from '../../core/game.service';
import { Round } from '../../models/round';
import { Game, Payout } from '../../models/game';

@Component({
  selector: 'app-game-individual',
  templateUrl: './game-individual.component.html',
  styleUrls: ['./game-individual.component.css']
})
export class GameIndividualComponent implements OnInit, OnDestroy {

  round: Round;
  game: Game;
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
    this.gameTypes = this.gameService.individualGames;
    this.subscription = this.roundService.currentRound
      .subscribe((round: Round) => {
        this.round = round;
        this.game = this.round.games.find(g => g.id.toString() === this.route.snapshot.queryParams['id']);
        // Auto-create teams if this is a new game
        if (this.game && (!this.game.teams || this.game.teams.length === 0)) {
          this.game.teams = this.gameService.allPlay();
        }
      });
  }

  ngOnDestroy() {
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

  //TODO: only allow deleting from the tail
  removePayout(): void {
    const idx = this.game.payouts.length - 1;
    this.game.payouts.splice(idx, 1);
  }

  deriveName(): void {
    this.game.name = `${this.game.gameType} (${this.game.isNet ? 'Net': 'Gross'})`;
  }

  save(): void {
    // TODO: Remove anyone not playing
    this.roundService.updateGame(this.game).then(() => {
      this.router.navigate(['rounds', this.round.code, 'games']);
    });
  }
}
