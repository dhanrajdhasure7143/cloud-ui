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
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap';
 
import { FormsModule } from '@angular/forms';
import { AlertsComponent } from './alerts/alerts.component';
@NgModule({
 declarations: [ActivationComponent, PlatformComponent, PlandetailsComponent, UsermanagementComponent, AlertsComponent],
 imports: [
 CommonModule,
 ActivationRoutingModule,
 SharedModule,
 BsDropdownModule,
 ProgressbarModule.forRoot(),
 ModalModule.forRoot(),
 AgGridModule.withComponents([
 UsermanagementComponent
 ]),
 FormsModule,
 ],
 exports: [PlatformComponent],
 schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ActivationModule { }