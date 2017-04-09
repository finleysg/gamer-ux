import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseSelectComponent } from './course-select/course-select.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { GroupCreateComponent } from './group-create/group-create.component';

const routes: Routes = [
  { path: 'course', component: CourseSelectComponent, children: [
    { path: 'create', component: CourseCreateComponent },
    { path: 'edit/:id', component: CourseEditComponent }
  ]},
  { path: 'groups', component: GroupCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
