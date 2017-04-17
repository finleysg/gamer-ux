import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoundResolverService } from '../core/round-resolver.service';
import { GameResultsComponent } from './game-results/game-results.component';

const routes: Routes = [
  { path: 'results', children: [
    { path: ':code', resolve: { round: RoundResolverService }, component: GameResultsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
