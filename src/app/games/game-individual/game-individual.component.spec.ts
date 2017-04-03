import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameIndividualComponent } from './game-individual.component';

describe('GameIndividualComponent', () => {
  let component: GameIndividualComponent;
  let fixture: ComponentFixture<GameIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
