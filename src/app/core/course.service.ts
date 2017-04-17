import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Course } from '../models/course';

@Injectable()
export class CourseService {

  constructor(
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

  getCourse(id: number): Promise<Course> {
    return this.dataService.getApiRequest(`courses/${id}`)
      .map((json: any) => {
        return new Course().fromJson(json);
      })
      .toPromise();
  }

  createCourse(course: Course): Promise<Course> {
    return this.dataService.postApiRequest('courses', course.toJson())
      .map((json: any) => {
        return new Course().fromJson(json);
      })
      .toPromise();
  }

  updateCourse(course: Course): Promise<Course> {
    return this.dataService.putApiRequest(`courses/${course.id}`, course.toJson())
      .map((json: any) => {
        return new Course().fromJson(json);
      })
      .toPromise();
  }
}
