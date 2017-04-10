import { Course } from './course';
import { Group } from './group';

export class Round {
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

  // Only the course is directly editable on a Round - everything else is derived or calculated
  // Sending just enough to pass that validator
  toJson(): any {
    return {
      'code': '',
      'expires': null,
      'course': this.course.id,
    }
  }
}
