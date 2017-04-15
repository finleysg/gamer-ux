import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CourseSelectComponent } from './course-select.component';
import { RoundService } from '../../core/round.service';
import { CourseService } from '../../core/course.service';
import { RouterStub, ActivatedRouteStub } from '../../testing/router-stubs';
import { CourseServiceSpy, RoundServiceSpy } from '../../testing/service-spies';

describe('CourseSelectComponent', () => {
  let component: CourseSelectComponent;
  let fixture: ComponentFixture<CourseSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, FormsModule, NoopAnimationsModule ],
      providers: [
        { provide: RoundService, useClass: RoundServiceSpy },
        { provide: CourseService, useClass: CourseServiceSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub }
      ],
      declarations: [ CourseSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
