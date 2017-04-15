import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoundService } from '../../../core/round.service';
import { Round } from '../../../models/round';
import { Game } from '../../../models/game';
import { Team } from '../../../models/team';
import { Player } from '../../../models/player';
import { clone } from 'lodash';

@Component({
  selector: 'app-game-team',
  templateUrl: './game-team.component.html',
  styleUrls: ['./game-team.component.css']
})
export class GameTeamComponent implements OnInit {

  round: Round;
  game: Game;
  players: Player[];
  availablePlayers: Player[];

  constructor(
    private roundService: RoundService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: {round: Round, game: Game}) => {
        this.round = data.round;
        this.game = data.game;
        this.players = clone(this.roundService.players);
        this.calculateAvailablePlayers();
      });
  }

  assignByGroups(): void {
    this.game.teamsFromGroups(this.round);
  }

  addTeam(): void {
    const teamNumbers = this.game.teams.map(t => t.teamNumber);
    const maxNumber = Math.max(...teamNumbers); // spread operator converts to distinct args
    let team = new Team();
    team.teamNumber = maxNumber + 1;
    this.game.teams.push(team);
    this.calculateAvailablePlayers();
  }

  removeTeam(teamNumber: number): void {
    for (let i = this.game.teams.length-1; i >= 0; i--) {
      if (this.game.teams[i].teamNumber === teamNumber) {
        this.game.teams.splice(i, 1);
      }
    }
    // TODO: maybe a re-number function, or simply only allow deleting from the tail
    this.calculateAvailablePlayers();
  }

  addPlayer(team: Team): void {
    let newTeam = new Team();
    newTeam.teamNumber = team.teamNumber;
    this.game.teams.push(newTeam);
    this.calculateAvailablePlayers();
  }

  removePlayer(team: Team): void {
    const idx = this.game.teams.findIndex(t => t.playerId === team.playerId);
    this.game.teams.splice(idx, 1);
    this.calculateAvailablePlayers();
  }

  save(): void {
    this.roundService.updateGame(this.game).then(() => {
      this.router.navigate(['gameTypes']); //TODO: relative to? (may need to do absolute route)
    });
  }

  // in the context of a single game, a player can only be on one team
  calculateAvailablePlayers(): void {
    this.availablePlayers.length = 0;
    this.players.forEach(p => {
      let idx = this.game.teams.findIndex(t => t.playerId === p.id);
      if (idx < 0) {
        this.availablePlayers.push(clone(p));
      }
    });
  }
}
