import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [{
  path: 'details',
  component: DetailsComponent,
}, {
  path: 'review',
  component: ReviewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
