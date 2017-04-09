import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Course } from '../models/course';
import { RoundService } from './round.service';

@Injectable()
export class CourseService {

  constructor(
    private roundService: RoundService,
    private dataService: DataService
  ) {
  }

  getCourses(): Promise<Course[]> {
    return this.dataService.getApiRequest('courses')
      .map((json: any) => {
        return json.map(c => {
          return new Course().fromJson(c);
        });
      })
      .toPromise();
  }

  createCourse(course: Course): Promise<number> {
    return this.dataService.postApiRequest('courses', course.toJson())
      .map((json: any) => {
        const course = new Course().fromJson(json);
        this.roundService.updateCourse(course);
        return course.id;
      })
      .toPromise();
  }

  updateCourse(course: Course): Promise<void> {
    return this.dataService.putApiRequest(`courses/${course.id}`, course.toJson())
      .do((json: any) => {
        const course = new Course().fromJson(json);
        this.roundService.reloadRound();
      })
      .toPromise();
  }
}
