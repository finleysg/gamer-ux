import { NgModule } from '@angular/core';

import { ResultsRoutingModule } from './results-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GameResultComponent } from './game-result/game-result.component';
import { SkinsComponent } from './skins/skins.component';
import { BestBallComponent } from './best-ball/best-ball.component';
import { MatchPlayComponent } from './match-play/match-play.component';
import { ResultDirective } from "./result.directive";
import { LeaderboardResultComponent } from './leaderboard-result/leaderboard-result.component';
import { LeaderboardResultDirective } from "./leaderboard-result.directive";
import { SkinsBoardComponent } from './skins-board/skins-board.component';

@NgModule({
  imports: [
    SharedModule,
    ResultsRoutingModule
  ],
  declarations: [
    GameResultComponent,
    ResultDirective,
    LeaderboardResultDirective,
    SkinsComponent,
    BestBallComponent,
    MatchPlayComponent,
    LeaderboardResultComponent,
    SkinsBoardComponent
  ],
  entryComponents: [
    SkinsComponent,
    BestBallComponent,
    MatchPlayComponent,
    SkinsBoardComponent
  ]
})
export class ResultsModule { }
