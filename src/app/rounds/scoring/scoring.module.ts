import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GroupScoreComponent } from './group-score/group-score.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [GroupScoreComponent, LeaderboardComponent]
})
export class ScoringModule { }
