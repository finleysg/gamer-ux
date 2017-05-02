import {Component, OnInit, Input} from '@angular/core';
import {Game} from "../../models/game";
import {Score} from "../../models/score";
import {SkinService} from "../../core/skin.service";
import {ResultComponent} from "../result.component";
import {RoundService} from "../../core/round.service";
import {Skinsboard} from "./skinsboard";
import {Router, ActivatedRoute} from "@angular/router";
import {Round} from "../../models/round";

@Component({
  templateUrl: './skins-board.component.html',
  styleUrls: ['./skins-board.component.css']
})
export class SkinsBoardComponent implements OnInit, ResultComponent {

  @Input()
  game: Game;
  @Input()
  scores: Score[];

  round: Round;
  side: string;
  skinsboard: Skinsboard;

  constructor(
    private roundService: RoundService,
    private skinService: SkinService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.round = this.roundService.round;
    this.side = this.route.snapshot.params['side'];
    this.calculate();
  }

  calculate() {
    const skins = this.skinService.calculate(this.game, this.scores);
    this.skinsboard = new Skinsboard(this.roundService.round.course);
    this.skinsboard.load(this.game.teams, this.scores, skins);
  }
  
  changeSide(side: string): void {
    this.router.navigate(['results', this.round.code, this.game.id, 'board', side], {relativeTo: this.route.parent});
  }

  goBack(): void {
  }
}
