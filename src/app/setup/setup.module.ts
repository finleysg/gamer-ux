import { NgModule } from '@angular/core';

import { SetupRoutingModule } from './setup-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SummaryComponent } from './summary/summary.component';
import { GroupCreateComponent } from './groups/group-create.component';
import { GamesComponent } from './games/games.component';
import { GameIndividualComponent } from './individual/game-individual.component';
import { GameTeamComponent } from './team/game-team.component';
import { GameComponent } from './game/game.component';
import { TeamFilterPipe } from './team/team-filter.pipe';
import { GameMatchComponent } from './match/game-match.component';


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
    GameIndividualComponent,
    GameMatchComponent,
    GameTeamComponent,
    TeamFilterPipe,
    GameMatchComponent
  ]
})
export class SetupModule { }
