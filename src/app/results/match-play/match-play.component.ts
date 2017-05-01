import { Component, OnInit } from '@angular/core';
import { ResultComponent } from "../result.component";

@Component({
  selector: 'app-match-play',
  templateUrl: './match-play.component.html',
  styleUrls: ['./match-play.component.css']
})
export class MatchPlayComponent implements OnInit, ResultComponent {

  @Input()
  game: Game;
  @Input()
  scores: Score[];
  
  constructor() { }

  ngOnInit() {
  }

}
