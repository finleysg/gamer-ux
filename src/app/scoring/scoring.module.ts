import { NgModule } from '@angular/core';

import { ScoringRoutingModule } from './scoring-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GroupScoreComponent } from './group-score/group-score.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SkinService } from './skin.service';
import {LeaderboardPipe} from "./leaderboard/leaderboard.pipe";

@NgModule({
  imports: [
    SharedModule,
    ScoringRoutingModule
  ],
  providers: [
    SkinService
  ],
  declarations: [
    GroupScoreComponent,
    LeaderboardComponent,
    LeaderboardPipe
  ]
})
export class ScoringModule { }
