import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigateRoutingModule } from './navigate-routing.module';
import { NavigateComponent } from './navigate/navigate.component';

@NgModule({
  declarations: [NavigateComponent],
  imports: [
    CommonModule,
    NavigateRoutingModule
  ]
})
export class NavigateModule { }
