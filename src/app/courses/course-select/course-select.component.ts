import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selectedCourse: Course;

  constructor(
    private courseService: CourseService,
    private roundService: RoundService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.courseService.getCourses().then(courses => this.courses = courses);
  }

  onNext(): void {
    if (this.selectedCourse) {
      this.roundService.createRound(this.selectedCourse)
        .then(round => {
          this.router.navigate(['setup', round.code.toLowerCase(), 'groups']);
        });
    }
  }

  onNew(): void {
    this.router.navigate(['create'], { relativeTo: this.route.parent });
  }
}
