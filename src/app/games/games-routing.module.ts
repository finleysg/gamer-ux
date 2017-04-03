import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameIndividualComponent } from './game-individual/game-individual.component';
import { GameTeamComponent } from './game-team/game-team.component';
import { GameResultsComponent } from './game-results/game-results.component';
import { GamesComponent } from './games.component';
import { GameResultComponent } from './game-result/game-result.component';

const routes: Routes = [
  { path: 'games', component: GamesComponent, children: [
    { path: ':id', component: GameCreateComponent, children: [
      { path: 'individual', component: GameIndividualComponent },
      { path: 'team', component: GameTeamComponent },
      { path: 'result', component: GameResultComponent }
    ]},
    { path: 'results', component: GameResultsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
