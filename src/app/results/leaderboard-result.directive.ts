import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[leaderboard-host]'
})
export class LeaderboardResultDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
