import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestBallComponent } from './best-ball.component';

describe('BestBallComponent', () => {
  let component: BestBallComponent;
  let fixture: ComponentFixture<BestBallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestBallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
