import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PrimengCustomModule } from '../primeng-custom/primeng-custom.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    PrimengCustomModule
  ]
})
export class PagesModule { }
