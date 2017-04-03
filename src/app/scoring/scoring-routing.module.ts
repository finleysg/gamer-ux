import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupScoreComponent } from './group-score/group-score.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
  { path: 'group', component: GroupScoreComponent },
  { path: 'leaderboard', component: LeaderboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoringRoutingModule { }
