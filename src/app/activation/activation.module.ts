import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivationRoutingModule } from './activation-routing.module';
import { ActivationComponent } from './activation.component';
import { PlatformComponent } from './platform/platform.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ActivationComponent, PlatformComponent],
  imports: [
    CommonModule,
    ActivationRoutingModule,
    SharedModule
  ],
  exports: [PlatformComponent]
})
export class ActivationModule { }
