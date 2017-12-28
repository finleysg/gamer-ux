import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { ErrorHandlerService } from './error-handler.service';
import { RoundService } from './round.service';
import { CourseService } from './course.service';
import { ScoringService } from './scoring.service';
import { GroupService } from './group.service';
import { RoundResolverService } from './round-resolver.service';
import { GameResolverService } from './game-resolver.service';
import { GameService } from './game.service';
import './rxjs-extensions';

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: [],
  providers: [
    DataService,
    ErrorHandlerService,
    RoundService,
    CourseService,
    ScoringService,
    GroupService,
    RoundResolverService,
    GameResolverService,
    GameService
  ]
})
export class AppCoreModule { }
