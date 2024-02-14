import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule,
  ],
  exports: [
    ToastModule
  ],
  providers: [ConfirmationService, MessageService]

})
export class PrimengCustomModule { }
