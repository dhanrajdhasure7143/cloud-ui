import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuperadminComponent } from './superadmin.component';
import { SearchPipe } from './custom_pipe/searchPipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SuperadminmetricsComponent } from './superadminmetrics/superadminmetrics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomersComponent } from './customers/customers.component';
import { EnterpriseCustomersComponent } from './enterprise-customers/enterprise-customers.component';
import { PrimengCustomModule } from '../primeng-custom/primeng-custom.module';
import { OnboardTenantComponent } from './onboard-tenant/onboard-tenant.component';
import { MatSelectModule } from '@angular/material/select';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { EnterpriseRequestsComponent } from './enterprise-requests/enterprise-requests.component';
import { PredefinedBotsComponent } from './predefined-bots/predefined-bots.component';
import { PredefinedBotsTemplateComponent } from './predefined-bots-template/predefined-bots-template.component';
import { VmConfigurationListComponent } from './vm-configuration-list/vm-configuration-list.component';
@NgModule({
  declarations: [DashboardComponent,SuperadminComponent,SearchPipe, SuperadminmetricsComponent, CustomersComponent, EnterpriseCustomersComponent, 
    OnboardTenantComponent,
    EnterpriseRequestsComponent,
    PredefinedBotsComponent,
    PredefinedBotsTemplateComponent,
    VmConfigurationListComponent
  ],
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
    MatIconModule,
    ReactiveFormsModule,
    PrimengCustomModule,
    MatSelectModule,
    Ng2TelInputModule,
    BsDatepickerModule.forRoot(),
    ScrollPanelModule
  ],
providers:[DatePipe]
})
export class SuperadminModule { }
