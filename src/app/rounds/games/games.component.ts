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

  // editGame(game: Game): void {
  //   let page = game.isTeam ? 'team' : 'individual';
  //   this.router.navigate([game.id, page]);
  // }

  removeGame(game: Game): void {

  }

  newIndividualGame(): void {
    this.roundService.createGame(false).then((game) => {
      this.router.navigate([game.id, 'individual']);
    });
  }

  newTeamGame(): void {
    this.roundService.createGame(true).then((game) => {
      this.router.navigate([game.id, 'team']);
    });
  }

  onNext(): void {

  }
}
