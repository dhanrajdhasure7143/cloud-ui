import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';
import { PlandetailsComponent } from './plandetails/plandetails.component';

@NgModule({
  declarations: [SubscriptionComponent, PlandetailsComponent],
  imports: [
    CommonModule,
    SubscriptionRoutingModule
  ],
  exports: [PlandetailsComponent]
})
export class SubscriptionModule { }
