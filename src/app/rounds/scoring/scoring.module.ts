import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GroupScoreComponent } from './group-score/group-score.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SkinService } from './skin.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [GroupScoreComponent, LeaderboardComponent],
  providers: [SkinService]
})
export class ScoringModule { }
