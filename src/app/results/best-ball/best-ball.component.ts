import { Component, OnInit } from '@angular/core';
import { ResultComponent } from "../result.component";

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
