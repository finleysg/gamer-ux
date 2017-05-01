import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[result-host]'
})
export class ResultDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
