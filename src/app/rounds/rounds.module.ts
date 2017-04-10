import { NgModule } from '@angular/core';

import { RoundsRoutingModule } from './rounds-routing.module';
import { ScoringModule } from './scoring/scoring.module';
import { GamesModule } from './games/games.module';
import { SharedModule } from '../shared/shared.module';import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { GroupCreateComponent } from './groups/group-create.component';


@NgModule({
  imports: [
    SharedModule,
    RoundsRoutingModule,
    ScoringModule,
    GamesModule,
  ],
  declarations: [
    SummaryComponent,
    HomeComponent,
    GroupCreateComponent,
  ]
})
export class RoundsModule { }
