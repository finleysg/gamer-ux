import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Round } from '../models/round';
import { Course } from '../models/course';
import { Group } from '../models/group';
import { Game } from '../models/game';

@Injectable()
export class RoundService {

  private _currentRound: Round;
  private _currentRoundSource: BehaviorSubject<Round>;
  public currentRound$: Observable<Round>;
  private _currentHole: number;
  private _currentHoleSource: BehaviorSubject<number>;
  public currentHole$: Observable<number>;

  constructor(private dataService: DataService) {
    this._currentRoundSource = new BehaviorSubject(new Round());
    this.currentRound$ = this._currentRoundSource.asObservable();
    this._currentHole = 1;
    this._currentHoleSource = new BehaviorSubject(this._currentHole);
    this.currentHole$ = this._currentHoleSource.asObservable();
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
}
