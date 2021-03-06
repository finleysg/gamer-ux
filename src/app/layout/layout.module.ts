import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [LayoutComponent, SidebarComponent],
  exports: [LayoutComponent]
})
export class LayoutModule { }
