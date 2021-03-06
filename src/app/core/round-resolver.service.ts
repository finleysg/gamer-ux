import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Round } from '../models/round';
import { RoundService } from './round.service';

@Injectable()
export class RoundResolverService implements Resolve<Round> {

  constructor(private roundService: RoundService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Round> {
    let code = route.params['code'].toUpperCase();
    return this.roundService.loadRound(code);
  }
}
