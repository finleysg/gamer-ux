import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { GroupCreateComponent } from './groups/group-create.component';
import { RoundResolverService } from '../core/round-resolver.service';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: 'setup', children: [
    { path: ':code', children: [
      { path: 'summary', resolve: { round: RoundResolverService }, component: SummaryComponent },
      { path: 'groups', resolve: { round: RoundResolverService }, component: GroupCreateComponent },
      { path: 'games', resolve: { round: RoundResolverService }, component: GamesComponent },
      { path: 'game/:id', resolve: { round: RoundResolverService }, component: GameComponent }
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
