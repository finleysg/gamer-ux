import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppCoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { SetupModule } from './setup/setup.module';
import { GamesModule } from './games/games.module';
import { ScoringModule } from './scoring/scoring.module';

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
    SetupModule,
    GamesModule,
    ScoringModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
