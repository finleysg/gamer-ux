import {Component, ViewChild, ComponentFactoryResolver, AfterViewInit, Type} from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {ScoringService} from "../../core/scoring.service";
import {Round} from "../../models/round";
import {Score} from "../../models/score";
import {ResultComponent} from "../result.component";
import {Game} from "../../models/game";
import {LeaderboardResultDirective} from "../leaderboard-result.directive";
import {SkinsBoardComponent} from "../skins-board/skins-board.component";

@Component({
  selector: 'app-leaderboard-result',
  templateUrl: './leaderboard-result.component.html',
  styleUrls: ['./leaderboard-result.component.css']
})
export class LeaderboardResultComponent implements AfterViewInit {

  round: Round;
  game: Game;
  scores: Score[];

  @ViewChild(LeaderboardResultDirective) leaderboardHost: LeaderboardResultDirective;

  constructor(
    private route: ActivatedRoute,
    private scoringService: ScoringService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngAfterViewInit() {
    this.route.params
      .subscribe((p: Params) => {
        this.scoringService.ensureRound(p['code'])
          .then(round => {
            this.round = round;
            this.game = round.games.find(g => g.id === +p['id']);
            this.scoringService.getAllScores()
              .then(scores => {
                this.scores = scores;
                this.loadResultComponent();
              });
          });
      });
  }

  private loadResultComponent(): void {
    let factory = this.componentFactoryResolver.resolveComponentFactory(this.getComponent(this.game));
    let containerRef = this.leaderboardHost.viewContainerRef;
    containerRef.clear();
    let componentRef = containerRef.createComponent(factory);
    (<ResultComponent>componentRef.instance).game = this.game;
    (<ResultComponent>componentRef.instance).scores = this.scores;
  }

  // TODO: probably move to a service
  private getComponent(game: Game): Type<ResultComponent> {
    if (game.gameType === 'Skins') {
      return SkinsBoardComponent;
    }
  }
}
