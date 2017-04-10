import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { Player } from '../models/player';

@Injectable()
export class GroupService {

  constructor() { }

  newGroup(roundId: number, groups: Group[]): void {
    let group = new Group();
    group.roundId = roundId;
    group.number = groups.length + 1;
    for (let i = 0; i < 4; i++) {
      group.players.push(new Player());
      group.players[i].localId = Math.random();
    }
    groups.push(group);
  }

  removeGroup(groupNumber: number, groups: Group[]): void {
    const idx = groups.findIndex(g => g.number === groupNumber);
    groups.splice(idx, 1);
    let i = 1;
    groups.forEach(g => {
      g.number = i;
      i += 1;
    });
  }

  addPlayer(group: Group): void {
    let player = new Player();
    player.localId = Math.random();
    group.players.push(player);
  }

  removePlayer(localId: number, groups: Group[]): void {
    groups.forEach(g => {
      let idx = g.players.findIndex(p => p.localId === localId);
      if (idx >= 0) {
        g.players.splice(idx, 1);
      }
    });
  }
}
