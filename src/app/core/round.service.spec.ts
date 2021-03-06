import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { RoundService } from './round.service';
import { DataService } from './data.service';

describe('RoundService', () => {

  @Injectable()
  class DataServiceSpy {
    // TODO: some sort of universal spy/fixture
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoundService,
        { provide: DataService, useClass: DataServiceSpy }
      ]
    });
  });

  it('should ...', inject([RoundService], (service: RoundService) => {
    expect(service).toBeTruthy();
  }));
});
