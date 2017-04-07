import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { ErrorHandlerService } from './error-handler.service';
import { RoundService } from './round.service';
import { CourseService } from './course.service';
import './rxjs-extensions';
import { ScoringService } from './scoring.service';

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: [],
  providers: [DataService, ErrorHandlerService, RoundService, CourseService, ScoringService]
})
export class AppCoreModule { }
