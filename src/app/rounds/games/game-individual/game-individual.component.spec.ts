import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { GameIndividualComponent } from './game-individual.component';
import { ActivatedRouteStub, RouterStub } from '../../../testing/router-stubs';
import { RoundService } from '../../../core/round.service';
import { RoundServiceSpy } from '../../../testing/service-spies';

describe('GameIndividualComponent', () => {
  let component: GameIndividualComponent;
  let fixture: ComponentFixture<GameIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoundService, useClass: RoundServiceSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub }
      ],
      declarations: [ GameIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
