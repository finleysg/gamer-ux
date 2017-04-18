import { NgModule } from '@angular/core';

import { SetupRoutingModule } from './setup-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SummaryComponent } from './summary/summary.component';
import { GroupCreateComponent } from './groups/group-create.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { TeamFilterPipe } from './game/team-filter.pipe';


@NgModule({
  imports: [
    SharedModule,
    SetupRoutingModule
  ],
  declarations: [
    SummaryComponent,
    GroupCreateComponent,
    GamesComponent,
    GameComponent,
    TeamFilterPipe
  ]
})
export class SetupModule { }
