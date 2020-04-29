import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermsconditionsComponent } from './termsconditions/termsconditions.component';

const routes: Routes = [{
  path: '',
  component: PrivacypolicyComponent},
  {path: 'privacy',
  component: PrivacypolicyComponent},
{path:'terms',
component:TermsconditionsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
