import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivationRoutingModule } from './activation-routing.module';
import { ActivationComponent } from './activation.component';
import { PlatformComponent } from './platform/platform.component';
import { SharedModule } from '../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PlandetailsComponent } from './plandetails/plandetails.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
  declarations: [ActivationComponent, PlatformComponent, PlandetailsComponent],
  imports: [
    CommonModule,
    ActivationRoutingModule,
    SharedModule,
    BsDropdownModule,
    ProgressbarModule.forRoot()
  ],
  exports: [PlatformComponent]
})
export class ActivationModule { }
