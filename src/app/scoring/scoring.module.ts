import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ScoringRoutingModule } from './scoring-routing.module';
import { GroupScoreComponent } from './group-score/group-score.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  imports: [
    SharedModule,
    ScoringRoutingModule
  ],
  declarations: [GroupScoreComponent, LeaderboardComponent]
})
export class ScoringModule { }
