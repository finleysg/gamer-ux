import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { CourseService } from './course.service';
import { RoundService } from './round.service';
import { DataService } from './data.service';

describe('CourseService', () => {

  @Injectable()
  class RoundServiceSpy {
    // TODO
  }

  @Injectable()
  class DataServiceSpy {
    // TODO: some sort of universal spy/fixture
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        { provide: RoundService, useClass: RoundServiceSpy },
        { provide: DataService, useClass: DataServiceSpy }
      ]
    });
  });

  it('should ...', inject([CourseService], (service: CourseService) => {
    expect(service).toBeTruthy();
  }));
});
