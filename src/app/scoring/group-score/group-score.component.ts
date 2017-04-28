import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ScoringService } from '../../core/scoring.service';
import { Round } from '../../models/round';
import { Group } from '../../models/group';
import { Hole } from '../../models/hole';
import { Score } from '../../models/score';

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
    private scoringService: ScoringService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('group score init');
    this.route.params
      .subscribe((p: Params) => {
        this.scoringService.ensureRound(p['code'])
          .then(round => {
            this.round = round;
            this.group = round.groups.find(g => g.number === +p['group']);
            this.hole = round.course.holes.find(h => h.holeNumber === +p['hole']);
            this.scoringService.getScores(this.group, this.hole)
              .then(scores => {
                this.scores = scores;
              });
          });
      });
  }

  updateScore(score: Score, amount: number): void {
    score.grossScore += amount;
    score.dirty = true;
  }

  toggleNoScore(score: Score): void {
    score.noScore = !score.noScore;
    if (score.noScore) {
      score.grossScore = this.scoringService.calculateEsc(score);
    }
    score.dirty = true;
  }

  getScoreClass(score: Score): string {
    let scoreClass = 'par';
    if (score.noScore) {
      scoreClass = 'no-score'
    } else {
      if (score.grossScore < score.hole.par) {
        scoreClass = 'below-par';
      }
      else if (score.grossScore > score.hole.par) {
        scoreClass = 'above-par';
      }
    }
    return scoreClass;
  }

  nextHole(): void {
    if (this.hole.holeNumber < this.round.course.numberOfHoles) {
      this.scoringService.saveScores(this.scores.filter(s => s.dirty));
      this.router.navigate(['scoring', this.round.code, this.group.number, this.hole.holeNumber + 1]);
    }
  }

  previousHole(): void {
    if (this.hole.holeNumber > 1) {
      this.scoringService.saveScores(this.scores.filter(s => s.dirty));
      this.router.navigate(['scoring', this.round.code, this.group.number, this.hole.holeNumber - 1]);
    }
  }

  toLeaderboard(): void {
    this.router.navigate(['leaderboard', this.round.code, 'front', 0]);
  }

  // TODO: use a deactivate guard to save?
  saveScores(): boolean {
    return true;
  }
}
