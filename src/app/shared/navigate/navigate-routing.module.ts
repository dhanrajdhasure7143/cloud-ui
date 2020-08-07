import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigateComponent } from './navigate/navigate.component';

const routes: Routes = [
  {
    path: '',
    component: NavigateComponent,
    children: [{
      path: '',
      loadChildren: './../shared/topheader/topheader.module#TopheaderModule'
    }]
    
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigateRoutingModule { }
