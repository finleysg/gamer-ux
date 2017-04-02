import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { ErrorHandlerService } from './error-handler.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [DataService, ErrorHandlerService]
})
export class AppCoreModule { }
