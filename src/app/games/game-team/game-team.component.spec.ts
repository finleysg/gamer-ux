import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTeamComponent } from './game-team.component';

describe('GameTeamComponent', () => {
  let component: GameTeamComponent;
  let fixture: ComponentFixture<GameTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
