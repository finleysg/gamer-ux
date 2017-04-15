import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { RoundResolverService } from './round-resolver.service';
import { RoundService } from './round.service';

describe('RoundResolverService', () => {

  @Injectable()
  class RoundServiceSpy {
    // TODO: some sort of universal spy/fixture
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoundResolverService,
        { provide: RoundService, useClass: RoundServiceSpy }
      ]
    });
  });

  it('should ...', inject([RoundResolverService], (service: RoundResolverService) => {
    expect(service).toBeTruthy();
  }));
});
