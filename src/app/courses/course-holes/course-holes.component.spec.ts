import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHolesComponent } from './course-holes.component';

describe('CourseHolesComponent', () => {
  let component: CourseHolesComponent;
  let fixture: ComponentFixture<CourseHolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseHolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseHolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
