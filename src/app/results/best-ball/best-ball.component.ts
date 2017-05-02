import { Component, OnInit, Input } from '@angular/core';
import { ResultComponent } from "../result.component";
import { Game } from "../../models/game";
import { Score } from "../../models/score";

@Component({
  selector: 'app-best-ball',
  templateUrl: './best-ball.component.html',
  styleUrls: ['./best-ball.component.css']
})
export class BestBallComponent implements OnInit, ResultComponent {

  @Input()
  game: Game;
  @Input()
  scores: Score[];
  
  constructor() { }

  ngOnInit() {
  }

}
