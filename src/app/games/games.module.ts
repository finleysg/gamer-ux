import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GamesRoutingModule } from './games-routing.module';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameIndividualComponent } from './game-individual/game-individual.component';
import { GameTeamComponent } from './game-team/game-team.component';
import { GameResultsComponent } from './game-results/game-results.component';
import { GameResultComponent } from './game-result/game-result.component';
import { GamesComponent } from './games.component';

@NgModule({
  imports: [
    SharedModule,
    GamesRoutingModule
  ],
  declarations: [GameCreateComponent, GameIndividualComponent, GameTeamComponent, GameResultsComponent, GameResultComponent, GamesComponent]
})
export class GamesModule { }
