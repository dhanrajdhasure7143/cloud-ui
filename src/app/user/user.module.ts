import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, LoginOpt, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { OpenIDAuthService } from '../_services/openID/auth/openIdauth.service';
import { O365SharedService } from '../_services/o365/shared/o365shared.service';
import { O365AuthService } from '../_services/o365/auth/o365auth.service';

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('480964809379-18nif431cjllrhf41bm1r4l47qlfnttl.apps.googleusercontent.com', googleLoginOptions)
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule, ReactiveFormsModule, SocialLoginModule
  ],
  providers: [{ provide: AuthServiceConfig, useFactory: provideConfig }, O365SharedService, O365AuthService],
  exports: [LoginComponent]
})
export class UserModule { }
