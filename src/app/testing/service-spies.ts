import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Round } from '../models/round';
import { Course } from '../models/course';

@Injectable()
export class RoundServiceSpy {
  // TODO: some sort of universal spy/fixture
  get currentRound(): Observable<Round> {
    return Observable.of(new Round());
  }
}

@Injectable()
export class DataServiceSpy {
  // TODO: some sort of universal spy/fixture
}

@Injectable()
export class CourseServiceSpy {
  // TODO: some sort of universal spy/fixture
  getCourses(): Promise<Course[]> {
    return new Promise(resolve => {
      resolve([]);
    });
  }
}
