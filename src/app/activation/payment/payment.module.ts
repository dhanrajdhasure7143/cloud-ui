import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { DetailsComponent } from './details/details.component';
import { ReviewComponent } from './review/review.component';
import { ChooseplanComponent } from './chooseplan/chooseplan.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetailsComponent, ReviewComponent, ChooseplanComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaymentRoutingModule,
    TabsModule.forRoot(),
    FormsModule,
  ]
})
export class PaymentModule { }
