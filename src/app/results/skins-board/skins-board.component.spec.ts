import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinsBoardComponent } from './skins-board.component';

describe('SkinsBoardComponent', () => {
  let component: SkinsBoardComponent;
  let fixture: ComponentFixture<SkinsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkinsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
