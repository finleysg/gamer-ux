import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {ScoringService} from "../../core/scoring.service";
import {Round} from "../../models/round";
import {Score} from "../../models/score";

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit {

  round: Round;
  scores: Score[];
  
  constructor(
    private scoringService: ScoringService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((p: Params) => {
        this.scoringService.ensureRound(p['code'])
          .then(round => {
            this.round = round;
            this.scoringService.getAllScores()
              .then(scores => {
                this.scores = scores;
              });
          });
      });
  }

}
