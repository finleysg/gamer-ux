import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { GameTeamComponent } from './game-team.component';
import { RouterStub, ActivatedRouteStub } from '../../../testing/router-stubs';
import { RoundServiceSpy } from '../../../testing/service-spies';
import { RoundService } from '../../../core/round.service';

describe('GameTeamComponent', () => {
  let component: GameTeamComponent;
  let fixture: ComponentFixture<GameTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoundService, useClass: RoundServiceSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub }
      ],
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
