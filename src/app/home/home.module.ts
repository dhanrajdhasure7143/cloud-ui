import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { SharedModule } from '../shared/shared.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';

@NgModule({
  declarations: [HomeComponent, UserdetailsComponent, EditprofileComponent, RolesAndPermissionsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
