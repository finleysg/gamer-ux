import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { GameResolverService } from './game-resolver.service';
import { RoundService } from './round.service';

describe('GameResolverService', () => {

  @Injectable()
  class RoundServiceSpy {
    // TODO: some sort of universal spy/fixture
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameResolverService,
        { provide: RoundService, useClass: RoundServiceSpy }
      ]
    });
  });

  it('should ...', inject([GameResolverService], (service: GameResolverService) => {
    expect(service).toBeTruthy();
  }));
});
