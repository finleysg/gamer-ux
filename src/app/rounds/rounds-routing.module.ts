import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { GroupCreateComponent } from './groups/group-create.component';
import { RoundResolverService } from '../core/round-resolver.service';
import { GamesComponent } from './games/games.component';
import { GameIndividualComponent } from './games/game-individual/game-individual.component';
import { GameTeamComponent } from './games/game-team/game-team.component';
import { GameResultComponent } from './games/game-result/game-result.component';
import { GameResultsComponent } from './games/game-results/game-results.component';
import { LeaderboardComponent } from './scoring/leaderboard/leaderboard.component';
import { GroupScoreComponent } from './scoring/group-score/group-score.component';
import { GameResolverService } from '../core/game-resolver.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'rounds/:code', resolve: { round: RoundResolverService }, children: [
    { path: 'summary', component: SummaryComponent },
    { path: 'groups', component: GroupCreateComponent },
    { path: 'gameTypes', component: GamesComponent, children: [
      { path: ':id', resolve: { game: GameResolverService }, children: [
        { path: 'individual', component: GameIndividualComponent },
        { path: 'team', component: GameTeamComponent },
        { path: 'result', component: GameResultComponent }
      ]},
      { path: 'results', component: GameResultsComponent }
    ]},
    { path: 'scoring/:group/:hole', component: GroupScoreComponent },
    { path: 'leaderboard', component: LeaderboardComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoundsRoutingModule { }
