import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [{
    path: '',
    loadChildren: './../firstlogin/firstlogin.module#FirstloginModule'
  }, {
    path: 'userdetails',
    component: UserdetailsComponent
  },
  {
    path: 'editprofile',
    component: EditprofileComponent
  },
  


]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
