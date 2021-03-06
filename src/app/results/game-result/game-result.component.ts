import {Component, ViewChild, ComponentFactoryResolver, AfterViewInit, Type} from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {ScoringService} from "../../core/scoring.service";
import {Round} from "../../models/round";
import {Score} from "../../models/score";
import {ResultDirective} from "../result.directive";
import {SkinsComponent} from "../skins/skins.component";
import {MatchPlayComponent} from "../match-play/match-play.component";
import {BestBallComponent} from "../best-ball/best-ball.component";
import {ResultComponent} from "../result.component";
import {Game} from "../../models/game";

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent implements AfterViewInit {

  round: Round;
  game: Game;
  scores: Score[];

  @ViewChild(ResultDirective) resultHost: ResultDirective;

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
    let containerRef = this.resultHost.viewContainerRef;
    containerRef.clear();
    let componentRef = containerRef.createComponent(factory);
    (<ResultComponent>componentRef.instance).game = this.game;
    (<ResultComponent>componentRef.instance).scores = this.scores;
  }
  
  // TODO: probably move to a service
  private getComponent(game: Game): Type<ResultComponent> {
    if (game.gameType === 'Skins') {
      return SkinsComponent;
    } else if (game.gameType === 'Match Play') {
      return MatchPlayComponent;
    } else {
      return BestBallComponent;
    }
  }
}
