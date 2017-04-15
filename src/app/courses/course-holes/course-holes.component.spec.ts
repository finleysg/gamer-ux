import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { CourseHolesComponent } from './course-holes.component';
import { RouterStub, ActivatedRouteStub } from '../../testing/router-stubs';
import { CourseServiceSpy, RoundServiceSpy } from '../../testing/service-spies';
import { CourseService } from '../../core/course.service';
import { RoundService } from '../../core/round.service';

describe('CourseHolesComponent', () => {
  let component: CourseHolesComponent;
  let fixture: ComponentFixture<CourseHolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseHolesComponent ],
      providers: [
        { provide: RoundService, useClass: RoundServiceSpy },
        { provide: CourseService, useClass: CourseServiceSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub }
      ]
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
