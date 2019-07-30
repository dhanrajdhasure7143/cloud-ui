import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { DetailsComponent } from './details/details.component';
import { ReviewComponent } from './review/review.component';
import { ChooseplanComponent } from './chooseplan/chooseplan.component';

@NgModule({
  declarations: [DetailsComponent, ReviewComponent, ChooseplanComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
