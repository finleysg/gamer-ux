import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../core/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  newCourse: Course;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.newCourse = new Course();
    this.newCourse.numberOfHoles = 18;
  }

  onNext() {
    this.courseService.createCourse(this.newCourse).then((course: Course) => {
      this.router.navigate(['edit', course.id.toString()], { relativeTo: this.route.parent });
    });
  }
}
