import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { PasswordValidation } from './common/password-validation';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotpasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [LoginComponent]
})
export class UserModule { }
