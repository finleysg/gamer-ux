import { NgModule } from '@angular/core';

import { ScoringRoutingModule } from './scoring-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GroupScoreComponent } from './group-score/group-score.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  imports: [
    SharedModule,
    ScoringRoutingModule
  ],
  providers: [
  ],
  declarations: [
    GroupScoreComponent,
    LeaderboardComponent
  ]
})
export class ScoringModule { }
