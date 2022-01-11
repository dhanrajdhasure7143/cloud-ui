import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import { AddcardComponent } from '../firstlogin/addcard/addcard.component';
import { ReviewComponent } from '../firstlogin/review/review.component';

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
  },{
    path: 'roles-and-permissions',
    component: RolesAndPermissionsComponent
  },
  {
    path: 'add-card',
    component: AddcardComponent
  },
  {
    path: 'card-review',
    component: ReviewComponent
  }


]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
