import { NgModule } from '@angular/core';

import { ResultsRoutingModule } from './results-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GameResultComponent } from './game-result/game-result.component';
import { GameResultsComponent } from './game-results/game-results.component';

@NgModule({
  imports: [
    SharedModule,
    ResultsRoutingModule
  ],
  declarations: [
    GameResultComponent,
    GameResultsComponent
  ]
})
export class ResultsModule { }
