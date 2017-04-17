import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GroupScoreComponent } from './group-score/group-score.component';

const routes: Routes = [
  { path: 'leaderboard/:code/:id', component: LeaderboardComponent },
  { path: 'scoring/:code/:group/:hole', component: GroupScoreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoringRoutingModule { }
