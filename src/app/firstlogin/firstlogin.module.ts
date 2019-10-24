import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstloginRoutingModule } from './firstlogin-routing.module';
import { FirstloginComponent } from './firstlogin.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {Ng2TelInputModule} from 'ng2-tel-input';

@NgModule({
  declarations: [FirstloginComponent],
  imports: [
    CommonModule,
    FirstloginRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    Ng2TelInputModule

  ]
})
export class FirstloginModule { }
