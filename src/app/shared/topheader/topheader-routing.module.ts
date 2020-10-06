import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopheaderComponent } from './topheader.component';

const routes: Routes = [{
  path: '',
  component: TopheaderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopheaderRoutingModule { }
