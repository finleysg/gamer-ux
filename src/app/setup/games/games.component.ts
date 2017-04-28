import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoundService } from '../../core/round.service';
import { Round } from '../../models/round';
import { Game } from '../../models/game';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  round: Round;
  games: Game[];

  constructor(
    private roundService: RoundService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: {round: Round}) => {
        this.round = data.round;
        this.games = cloneDeep(this.round.games);
      });
  }

  removeGame(game: Game): void {
    // TODO: get confirmation
    this.roundService.deleteGame(game);
  }

  newGame(competitionType: string): void {
    this.roundService.createGame(competitionType).then((game) => {
      this.router.navigate(['game', game.id], { relativeTo: this.route.parent })
    });
  }
  
  editGame(game: Game): void {
    this.router.navigate(['game', game.id], { relativeTo: this.route.parent })
  }

  onNext(): void {
    this.router.navigate(['scoring', this.round.code, 1, 1]);
  }
}
