import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CourseService } from '../../core/course.service';
import { RoundService } from '../../core/round.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-holes',
  templateUrl: './course-holes.component.html',
  styleUrls: ['./course-holes.component.css']
})
export class CourseHolesComponent implements OnInit, OnDestroy {

  course: Course;
  private subscription: Subscription;

  constructor(
    private roundService: RoundService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.roundService.currentRound.subscribe(round => {
      this.course = round.course;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNext() {
    this.courseService.updateCourse(this.course).then(() => {
      this.router.navigate(['/groups'])
    })
  }
}
