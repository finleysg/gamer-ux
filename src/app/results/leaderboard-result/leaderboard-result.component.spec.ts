import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardResultComponent } from './leaderboard-result.component';

describe('LeaderboardResultComponent', () => {
  let component: LeaderboardResultComponent;
  let fixture: ComponentFixture<LeaderboardResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
