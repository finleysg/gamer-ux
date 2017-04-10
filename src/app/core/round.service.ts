import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { Round } from '../models/round';
import { Course } from '../models/course';
import { Group } from '../models/group';
import { Game } from '../models/game';
import { Player } from '../models/player';

@Injectable()
export class RoundService {

  private _currentRound: Round;
  private _currentRoundSource: Subject<Round>;
  private _players: Player[]; // flattened list of players

  constructor(private dataService: DataService) {
    this._currentRoundSource = new Subject<Round>();
  }

  get round(): Round {
    return this._currentRound;
  }

  get currentRound(): Observable<Round> {
    return this._currentRoundSource.asObservable();
  }

  get players(): Player[] {
    return this._players;
  }

  createRound(course: Course): Promise<Round> {
    let round = new Round();
    round.course = course;
    return this.dataService.postApiRequest('rounds', round.toJson())
      .do((json: any) => {
        this._currentRound = new Round().fromJson(json);
        this._currentRoundSource.next(this._currentRound);
        return this._currentRound;
      })
      .toPromise();
  }

  joinRound(code: string): Promise<boolean> {
    return this.dataService.getApiRequest('rounds', { 'code': code })
      .map((json: any) => {
        if (!json || json.length === 0) {
          return false;
        } else {
          this._currentRound = new Round().fromJson(json[0]);
          this._currentRoundSource.next(this._currentRound);
          return true;
        }
      })
      .toPromise();
  }

  loadRound(code: string): Promise<Round> {
    return this.dataService.getApiRequest('rounds', { 'code': code })
      .map((json: any) => {
        if (!json || json.length === 0) {
          this._currentRound = new Round();
        }
        this._currentRound = new Round().fromJson(json[0]);
        this._currentRoundSource.next(this._currentRound);
        return this._currentRound;
      })
      .toPromise();
  }

  reloadRound(): void {
    this.dataService.getApiRequest(`rounds/${this._currentRound.id}`)
      .do((json: any) => {
        this._currentRound = new Round().fromJson(json);
        this.flattenPlayerList();
        this._currentRoundSource.next(this._currentRound);
      });
  }

  updateCourse(course: Course): void {
    this.dataService.patchApiRequest(`rounds/${this._currentRound.id}`, { 'course': course.id })
      .do(() => {
        this.reloadRound();
      });
  }

  saveGroups(groups: Group[]): Promise<void> {
    let json = [];
    groups.forEach(g => json.push(g.toJson()));
    return this.dataService.postApiRequest('groups', json)
      .do(() => {
        this.reloadRound();
      })
      .toPromise();
  }

  createGame(game: Game): Promise<void> {
    return this.dataService.postApiRequest('games', game.toJson())
      .do(() => {
        this.reloadRound();
      })
      .toPromise();
  }

  updateGame(game: Game): Promise<void> {
    return this.dataService.putApiRequest(`games/${game.id}`, game.toJson())
      .do(() => {
        this.reloadRound();
      })
      .toPromise();
  }

  private flattenPlayerList(): void {
    this._players = [];
    this._currentRound.groups.forEach((group: Group) => {
      group.players.forEach((player: Player) => this._players.push(player));
    });
  }
}
