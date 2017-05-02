import { TestBed, inject } from '@angular/core/testing';

import { BestBallServiceService } from './best-ball-service.service';

describe('BestBallServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BestBallServiceService]
    });
  });

  it('should ...', inject([BestBallServiceService], (service: BestBallServiceService) => {
    expect(service).toBeTruthy();
  }));
});
