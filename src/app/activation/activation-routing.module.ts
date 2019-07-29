import { PlatformComponent } from './platform/platform.component';
import { ActivationComponent } from './activation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: ActivationComponent,
  children: [{
    path: '',
    component: PlatformComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationRoutingModule { }
