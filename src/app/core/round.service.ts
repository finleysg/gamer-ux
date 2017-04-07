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

  get currentRound(): Observable<Round> {
    return this._currentRoundSource.asObservable();
  }

  get players(): Player[] {
    return this._players;
  }

  createRound(course: Course): Promise<void> {
    return this.dataService.postApiRequest('sessions', { 'course': course.id })
      .do((json: any) => {
        this._currentRound = new Round().fromJson(json);
        this._currentRoundSource.next(this._currentRound);
      })
      .toPromise();
  }

  joinRound(code: string): Promise<boolean> {
    return this.dataService.getApiRequest('sessions', { 'code': code })
      .map((json: any) => {
        this._currentRound = new Round().fromJson(json);
        this._currentRoundSource.next(this._currentRound);
        return true; // 404 otherwise
      })
      .toPromise();
  }

  reloadRound(): void {
    this.dataService.getApiRequest(`sessions/${this._currentRound.id}`)
      .do((json: any) => {
        this._currentRound = new Round().fromJson(json);
        this.flattenPlayerList();
        this._currentRoundSource.next(this._currentRound);
      });
  }

  updateCourse(course: Course): void {
    // TODO: patch round with course id
    this._currentRound.course = course;
    this._currentRoundSource.next(this._currentRound);
  }

  createGroup(group: Group): Promise<void> {
    return this.dataService.postApiRequest('groups', group.toJson())
      .do(() => {
        this.reloadRound();
      })
      .toPromise();
  }

  updateGroup(group: Group): Promise<void> {
    return this.dataService.putApiRequest(`groups/${group.id}`, group.toJson())
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
