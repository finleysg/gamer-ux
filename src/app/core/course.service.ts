import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { Course } from '../models/course';
import { RoundService } from './round.service';

@Injectable()
export class CourseService {

  private _courseListSource: BehaviorSubject<Course[]>;
  private _courseList: Course[];

  constructor(
    private roundService: RoundService,
    private dataService: DataService
  ) {
    this._courseList = [];
    this._courseListSource = new BehaviorSubject(<Course[]>(this._courseList));
  }

  get courses(): Observable<Course[]> {
    return this._courseListSource.asObservable();
  }

  loadCourses(): void {
    this.dataService.getApiRequest('courses')
      .do((json: any) => {
        this._courseList = json.map(c => new Course().fromJson(c));
        this._courseListSource.next(this._courseList);
      });
  }

  createCourse(course: Course): Promise<void> {
    return this.dataService.postApiRequest('courses', course.toJson())
      .do((json: any) => {
        const course = new Course().fromJson(json);
        this._courseList.push(course);
        this._courseListSource.next(this._courseList);
        this.roundService.updateCourse(course);
      })
      .toPromise();
  }

  updateCourse(course: Course): Promise<void> {
    return this.dataService.putApiRequest(`courses/${course.id}`, course.toJson())
      .do((json: any) => {
        const course = new Course().fromJson(json);
        this._courseList.push(course);
        this._courseListSource.next(this._courseList);
        this.roundService.updateCourse(course);
      })
      .toPromise();
  }
}
