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
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotpasswordComponent, NewpasswordComponent, CompareValidatorDirective, SocialLoginComponent,CreataccountComponent,ChangepasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule, ReactiveFormsModule,ModalModule,
    SharedModule
  ],
  entryComponents: [NewpasswordComponent],
  exports: [LoginComponent],
  providers:[Particles]
})
export class UserModule { }
