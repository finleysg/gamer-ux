import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {ScoringService} from "../../core/scoring.service";
import {Round} from "../../models/round";
import {Leaderboard} from "../../models/leaderboard";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  round: Round;
  leaderboard: Leaderboard;
  side: string;
  net: boolean;

  constructor(
    private scoringService: ScoringService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('leaderboard init');
    this.route.params
      .subscribe((p: Params) => {
        this.scoringService.ensureRound(p['code'])
          .then(round => {
            this.round = round;
            this.side = p['side'];
            this.scoringService.getLeaderboard()
              .then(leaderboard => {
                this.leaderboard = leaderboard;
              });
          });
      });
  }

  changeSide(side: string): void {
    this.router.navigate(['leaderboard', this.round.code, side, 0]);
  }
  
  gotoScores(): void {
    let currentHole = this.scoringService.lastHole.holeNumber < this.round.course.numberOfHoles ? this.scoringService.lastHole.holeNumber + 1 : this.scoringService.lastHole.holeNumber;
    this.router.navigate(['scoring', this.round.code, this.scoringService.currentGroup.number, currentHole]);
  }
}
