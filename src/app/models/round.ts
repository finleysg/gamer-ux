import { Course } from './course';
import { Group } from './group';
import { Game } from './game';

export class Round {
  id: number;
  code: string;
  created: any; // TODO: moment
  expires: any; // TODO: moment
  course: Course;
  groups: Group[] = [];
  games: Game[] = [];
  currentState: RoundStateEnum;

  fromJson(json: any): Round {
    // only serializing a course id
    let course = new Course();
    course.id = json.course;
    this.id = json.id;
    this.course = course;
    this.code = json.code;
    this.created = json.created;
    this.expires = json.expires;
    if (json.groups) {
      json.groups.forEach(group => {
        this.groups.push(new Group().fromJson(group));
      });
    }
    if (json.games) {
      json.games.forEach(game => {
        this.games.push(new Game().fromJson(game));
      });
    }
    return this;
  }

  // Only the course is directly editable on a Round - everything else is derived or calculated
  // Sending just enough to pass that validator
  toJson(): any {
    return {
      'code': '',
      'expires': null,
      'course': this.course.id
    }
  }
}

export enum RoundStateEnum {
  NoRound = 0,
  SetupIncomplete,
  SetupComplete,
  Scoring,
  ScoringComplete,
  Archived
}
