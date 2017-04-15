import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Game } from '../models/game';
import { RoundService } from './round.service';

@Injectable()
export class GameResolverService implements Resolve<Game> {

  constructor(private roundService: RoundService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Game> {
    let id = route.params['id'];
    let game = this.roundService.round.games.find(g => g.id === id);
    if (game) {
      return new Promise(resolve => {
        resolve(game);
      });
    }
    // TODO: route to gameTypes?
    return null;
  }
}
