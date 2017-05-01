import { NgModule } from '@angular/core';

import { ResultsRoutingModule } from './results-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GameResultComponent } from './game-result/game-result.component';
import { GameResultsComponent } from './game-results/game-results.component';
import { SkinsComponent } from './skins/skins.component';
import { BestBallComponent } from './best-ball/best-ball.component';
import { MatchPlayComponent } from './match-play/match-play.component';
import { ResultDirective } from "./result.directive";

@NgModule({
  imports: [
    SharedModule,
    ResultsRoutingModule
  ],
  declarations: [
    GameResultComponent,
    GameResultsComponent,
    ResultDirective
  ],
  entryComponents: [
    SkinsComponent,
    BestBallComponent,
    MatchPlayComponent
  ]
})
export class ResultsModule { }
