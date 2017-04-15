import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';

import { GroupScoreComponent } from './group-score.component';
import { RoundService } from '../../../core/round.service';
import { RoundServiceSpy } from '../../../testing/service-spies';
import { ScoringService } from '../../../core/scoring.service';
import { ActivatedRouteStub, RouterStub } from '../../../testing/router-stubs';

describe('GroupScoreComponent', () => {
  let component: GroupScoreComponent;
  let fixture: ComponentFixture<GroupScoreComponent>;

  @Injectable()
  class ScoringServiceSpy {
    // TODO: some sort of universal spy/fixture
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, NoopAnimationsModule ],
      providers: [
        { provide: RoundService, useClass: RoundServiceSpy },
        { provide: ScoringService, useClass: ScoringServiceSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub }
      ],
      declarations: [ GroupScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
