import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SetupRoutingModule } from './setup-routing.module';
import { CourseSelectComponent } from './course-select/course-select.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { GroupCreateComponent } from './group-create/group-create.component';

@NgModule({
  imports: [
    SharedModule,
    SetupRoutingModule
  ],
  declarations: [CourseSelectComponent, CourseCreateComponent, CourseEditComponent, GroupCreateComponent]
})
export class SetupModule { }
