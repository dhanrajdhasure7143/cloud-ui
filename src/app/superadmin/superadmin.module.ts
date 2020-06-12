import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { SuperadminComponent } from './superadmin.component';


@NgModule({
  declarations: [DashboardComponent,SuperadminComponent],
  imports: [
    CommonModule,
    SharedModule,
    SuperadminRoutingModule,
    FormsModule,
  ]
})
export class SuperadminModule { }
