import { WorkflowcreateComponent } from './home/workflowcreate/workflowcreate.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkfloweditComponent } from './home/workflowedit/workflowedit.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'workflowedit/:workflowrobot',
      component: WorkfloweditComponent
    },
    {
      path: 'workflowcreate',
      component: WorkflowcreateComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignstudioRoutingModule { }
