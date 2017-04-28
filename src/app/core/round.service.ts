import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { CourseService } from './course.service';
import { Round } from '../models/round';
import { Course } from '../models/course';
import { Group } from '../models/group';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { cloneDeep } from 'lodash';

@Injectable()
export class RoundService {

  private _currentRound: Round;
  private _currentRoundSource: BehaviorSubject<Round>;
  private _players: Player[]; // flattened list of players
  currentRound$: Observable<Round>;

  constructor(
    private courseService: CourseService,
    private dataService: DataService
  ) {
    this._currentRound = new Round();
    this._currentRoundSource = new BehaviorSubject<Round>(this._currentRound);
    this.currentRound$ = this._currentRoundSource.asObservable();
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
    return this.dataService.postApiRequest('rounds', round.toJson()).toPromise()
      .then((json: any) => {
        this._currentRound = new Round().fromJson(json);
        this._currentRound.course = course;
        this._currentRoundSource.next(cloneDeep(this._currentRound));
        return this._currentRound;
      });
  }

  loadRound(code: string): Promise<Round> {
    return this.dataService.getApiRequest('rounds', { 'code': code }).toPromise()
      .then((json: any) => {
        if (!json || json.length === 0) {
          return null;
        } else {
          this._currentRound = new Round().fromJson(json[0]);
          this.flattenPlayerList();
          return this.courseService.getCourse(this._currentRound.course.id);
        }
      })
      .then(course => {
        if (!course) {
          return null;
        }
        this._currentRound.course = course;
        this._currentRoundSource.next(cloneDeep(this._currentRound));
        return this._currentRound;
      });

  }

  reloadRound(): void {
    let course = this._currentRound.course;
    this.dataService.getApiRequest(`rounds/${this._currentRound.id}`)
      .do((json: any) => {
        this._currentRound = new Round().fromJson(json);
        this._currentRound.course = course;
        this.flattenPlayerList();
        console.log(`RoundService: round ${this._currentRound.code}, ${this._currentRound.games.length} games`);
        this._currentRoundSource.next(cloneDeep(this._currentRound));
      })
      .subscribe();
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

  createGame(competitionType): Promise<Game> {
    let game = new Game();
    game.roundId = this._currentRound.id;
    game.competitionType = competitionType;
    return this.dataService.postApiRequest('games', game.toJson())
      .map((json) => {
        return new Game().fromJson(json);
      })
      .toPromise();
  }

  updateGame(game: Game): Promise<Game> {
    return this.dataService.putApiRequest(`games/${game.id}`, game.toJson())
      .map((json) => {
        return new Game().fromJson(json);
      })
      .toPromise();
  }

  deleteGame(game: Game): void {
    this.dataService.deleteApiRequest('games', game.id)
      .do(() => {
        this.reloadRound();
      });
  }

  private flattenPlayerList(): void {
    this._players = [];
    this._currentRound.groups.forEach((group: Group) => {
      group.players.forEach((player: Player) => this._players.push(player));
    });
  }
}
