import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseSelectComponent } from './course-select/course-select.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseHolesComponent } from './course-holes/course-holes.component';

const routes: Routes = [
  { path: 'courses', children: [
    { path: 'select', component: CourseSelectComponent },
    { path: 'create', component: CourseCreateComponent },
    // { path: 'edit/:id', component: CourseCreateComponent },
    { path: 'holes/:id', component: CourseHolesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
