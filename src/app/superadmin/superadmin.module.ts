import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { SuperadminComponent } from './superadmin.component';
import { SearchPipe } from './custom_pipe/searchPipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SuperadminmetricsComponent } from './superadminmetrics/superadminmetrics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatIconModule, MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [DashboardComponent,SuperadminComponent,SearchPipe, SuperadminmetricsComponent],
  imports: [
    CommonModule,
    SharedModule,
    SuperadminRoutingModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    TabsModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    NgxChartsModule,
    MatTabsModule,
    MatIconModule
  ]
})
export class SuperadminModule { }
