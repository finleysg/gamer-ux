import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPlayComponent } from './match-play.component';

describe('MatchPlayComponent', () => {
  let component: MatchPlayComponent;
  let fixture: ComponentFixture<MatchPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
