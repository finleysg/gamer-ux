import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Round } from '../../models/round';

@Component({
  selector: 'app-game',
  template: '<router-outlet></router-outlet>'
})
export class GameComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: {round: Round}) => {
        const game = data.round.games.find(g => g.id === this.route.params['id']);
        this.router.navigate([game.isTeam ? 'team-game' : 'individual-game'], { relativeTo: this.route });
      });
  }
}
