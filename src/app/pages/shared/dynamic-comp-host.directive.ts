import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamic-comp-host]',
  exportAs: 'dynamic-comp-host'
})
export class DynamicCompHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
