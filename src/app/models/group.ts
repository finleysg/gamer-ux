import { Player } from './player';

export class Group {
  id: number;
  number: number;
  sessionId: number;
  players: Player[] = [];

  fromJson(json: any): Group {
    this.id = json.id;
    this.number = json.group_number;
    this.sessionId = json.session;
    if (json.players) {
      json.players.forEach(player => {
        this.players.push(new Player().fromJson(player));
      });
    }
    return this;
  }

  toJson(): any {
    let players = [];
    this.players.forEach(p => players.push(p.toJson()));
    return {
      'id': this.id,
      'group_number': this.number,
      'session': this.sessionId,
      'players': players
    }
  }

  getPlayer(id: number): Player {
    return this.players.find(p => p.id === id);
  }
}
