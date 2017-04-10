import { TestBed, inject } from '@angular/core/testing';

import { RoundResolverService } from './round-resolver.service';

describe('RoundResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoundResolverService]
    });
  });

  it('should ...', inject([RoundResolverService], (service: RoundResolverService) => {
    expect(service).toBeTruthy();
  }));
});
