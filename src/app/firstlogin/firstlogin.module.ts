import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstloginRoutingModule } from './firstlogin-routing.module';
import { FirstloginComponent } from './firstlogin.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FirstloginComponent],
  imports: [
    CommonModule,
    FirstloginRoutingModule,
    SharedModule
  ]
})
export class FirstloginModule { }
