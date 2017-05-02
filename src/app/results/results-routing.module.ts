import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameResultComponent} from "./game-result/game-result.component";
import {LeaderboardResultComponent} from "./leaderboard-result/leaderboard-result.component";

const routes: Routes = [
  { path: 'results/:code/:id', component: GameResultComponent },
  { path: 'results/:code/:id/board/:side', component: LeaderboardResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
