import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppCoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { CoursesModule } from './courses/courses.module';
import { SetupModule } from './setup/setup.module';
import { ScoringModule } from './scoring/scoring.module';
import { ResultsModule } from './results/results.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCoreModule,
    SharedModule,
    LayoutModule,
    CoursesModule,
    SetupModule,
    ScoringModule,
    ResultsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
