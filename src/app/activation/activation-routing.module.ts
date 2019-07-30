import { PlatformComponent } from './platform/platform.component';
import { ActivationComponent } from './activation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlandetailsComponent } from './plandetails/plandetails.component';
import { ChooseplanComponent } from './chooseplan/chooseplan.component';

const routes: Routes = [{
  path: '',
  component: ActivationComponent,
  children: [{
    path: '',
    component: PlatformComponent
  }, {
    path: 'plandetails',
    component: PlandetailsComponent
  }, {
    path: 'chooseplan',
    component: ChooseplanComponent
  }, {
    path: 'payment',
    loadChildren: './payment/payment.module#PaymentModule'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationRoutingModule { }
