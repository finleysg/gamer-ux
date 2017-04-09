import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../core/course.service';
import { RoundService } from '../../core/round.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.css']
})
export class CourseSelectComponent implements OnInit {

  courses: Course[];

  constructor(
    private courseService: CourseService,
    private roundService: RoundService,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseService.getCourses().then(courses => this.courses = courses);
  }

  onNext(course: Course): void {
    this.roundService.updateCourse(course);
    this.router.navigate(['/groups']);
  }

  onNew(): void {
    this.router.navigate(['create']);
  }
}
