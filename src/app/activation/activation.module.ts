import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { ActivationRoutingModule } from './activation-routing.module';
import { ActivationComponent } from './activation.component';
import { PlatformComponent } from './platform/platform.component';
import { SharedModule } from '../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PlandetailsComponent } from './plandetails/plandetails.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';
import { UsermanagementService } from '../_services/usermanagement.service';
import { AlertsComponent } from './alerts/alerts.component';
// import { Cellrender } from './usermanagement/cellrender';
import { MetricsComponent , Slicedate } from './metrics/metrics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
 declarations: [ActivationComponent, PlatformComponent, PlandetailsComponent, UsermanagementComponent, 
  AlertsComponent
  ,MetricsComponent,Slicedate],
 imports: [
 CommonModule,
 ActivationRoutingModule,
 SharedModule,
 BsDropdownModule,
 NgxChartsModule,
 ProgressbarModule.forRoot(),
 ModalModule.forRoot(),
 TabsModule.forRoot(),
 FormsModule,
 ],
 exports: [PlatformComponent],
 schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers:[]
})
export class ActivationModule { }