import { Course } from './course';
import { Group } from './group';

export class Round {
/*
 ("id", "code", "created",  "expires", "course", "groups", "games", "scores", )
 */
  id: number;
  code: string;
  created: any; // TODO: moment
  expires: any; // TODO: moment
  course: Course;
  groups: Group[] = [];
  games: any[];
  scores: any[];

  fromJson(json: any): Round {
    this.id = json.id;
    this.code = json.code;
    this.created = json.number_of_holes;
    this.expires = json.expires;
    this.course = new Course().fromJson(json.course);
    if (json.groups) {
      json.groups.forEach(group => {
        this.groups.push(new Group().fromJson(group));
      });
    }
    return this;
  }
}
