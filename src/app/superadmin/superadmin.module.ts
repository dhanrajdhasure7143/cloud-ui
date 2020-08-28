import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { SuperadminComponent } from './superadmin.component';
import { SearchPipe } from './custom_pipe/searchPipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [DashboardComponent,SuperadminComponent,SearchPipe],
  imports: [
    CommonModule,
    SharedModule,
    SuperadminRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class SuperadminModule { }
