import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { CompareValidatorDirective } from './shared/compare-validator.directive';
import { SocialLoginComponent } from './social-login/social-login.component';
import { Particles } from '../_models/particlesjs';
import { CreataccountComponent } from './creataccount/creataccount.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotpasswordComponent, NewpasswordComponent, CompareValidatorDirective, SocialLoginComponent,CreataccountComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  entryComponents: [NewpasswordComponent],
  exports: [LoginComponent],
  providers:[Particles]
})
export class UserModule { }
