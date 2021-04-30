import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { TopheaderRoutingModule } from './topheader-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TopheaderRoutingModule,
     NgMultiSelectDropDownModule,
    Ng2TelInputModule

  ]
})
export class TopheaderModule { }
