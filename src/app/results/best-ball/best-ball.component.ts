import { Component, OnInit, Input } from '@angular/core';
import { ResultComponent } from '../result.component';
import { BestBallService } from '../services/best-ball.service';
import { Game } from '../../models/game';
import { Score } from '../../models/score';

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
  
  constructor(private bestBallService: BestBallService) { }

  ngOnInit() {
  }

}
