import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { ScoringService } from './scoring.service';
import { RoundService } from './round.service';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { Round } from '../models/round';

describe('ScoringService', () => {

  @Injectable()
  class RoundServiceSpy {
    // TODO: some sort of universal spy/fixture
    get currentRound(): Observable<Round> {
      return Observable.of(new Round());
    }
  }

  @Injectable()
  class DataServiceSpy {
    // TODO: some sort of universal spy/fixture
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScoringService,
        { provide: RoundService, useClass: RoundServiceSpy },
        { provide: DataService, useClass: DataServiceSpy }
      ]
    });
  });

  it('should ...', inject([ScoringService], (service: ScoringService) => {
    expect(service).toBeTruthy();
  }));
});
