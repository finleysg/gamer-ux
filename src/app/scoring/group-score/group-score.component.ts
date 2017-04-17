import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RoundService } from '../../core/round.service';
import { ScoringService } from '../../core/scoring.service';
import { Round } from '../../models/round';
import { Group } from '../../models/group';
import { Hole } from '../../models/hole';
import { Score } from '../../models/score';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-group-score',
  templateUrl: './group-score.component.html',
  styleUrls: ['./group-score.component.css']
})
export class GroupScoreComponent implements OnInit {

  round: Round;
  group: Group;
  hole: Hole;
  scores: Score[];

  constructor(
    private roundService: RoundService,
    private scoringService: ScoringService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: {round: Round}) => {
        this.round = data.round;
        this.route.params
          .subscribe((p: Params) => {
            this.group = this.round.groups.find(g => g.number === p['group']);
            this.hole = this.round.course.holes.find(h => h.holeNumber === p['hole']);
            this.scores = this.scoringService.getScores(this.group, this.hole);
          });
      });
  }

  addOne(score: Score): void {
    score.grossScore += 1;
  }

  subtractOne(score: Score): void {
    score.grossScore -= 1;
  }

  toggleNoScore(score: Score): void {
    score.noScore = !score.noScore;
  }

  nextHole(): void {
    if (this.hole.holeNumber < this.round.course.numberOfHoles) {
      // TODO: update our current hole w/the service
      this.router.navigate([this.hole.holeNumber + 1], { relativeTo: this.route.parent });
    }
  }

  previousHole(): void {
    if (this.hole.holeNumber > 1) {
      // TODO: update our current hole w/the service
      this.router.navigate([this.hole.holeNumber - 1], { relativeTo: this.route.parent });
    }
  }

  toLeaderboard(): void {
    // TODO: navigate to the leaderboard -- or should it be a modal?
  }

  // TODO: use a deactivate guard to save?
  saveScores(): boolean {
    return true;
  }
}
