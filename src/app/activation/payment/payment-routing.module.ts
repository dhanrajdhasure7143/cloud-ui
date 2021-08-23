import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ReviewComponent } from './review/review.component';
import { ChooseplanComponent } from './chooseplan/chooseplan.component';
import { CouponComponent } from './coupon/coupon.component';


const routes: Routes = [{
  path: 'chooseplan',
  component: ChooseplanComponent,
}, {
  path: 'details',
  component: DetailsComponent,
}, {
  path: 'review',
  component: ReviewComponent
},
{
  path: 'coupon',
  component: CouponComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
