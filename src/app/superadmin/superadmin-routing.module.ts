import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuperadminComponent } from './superadmin.component';
import { SuperadminmetricsComponent } from './superadminmetrics/superadminmetrics.component';

const routes: Routes = [{
  path: '',
  component: SuperadminComponent,
  children:[
    {
      path:'', component: DashboardComponent
    },
    {
     path:'metrics', component: SuperadminmetricsComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
