import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { CreataccountComponent } from './creataccount/creataccount.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent},
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: 'newpassword',
    component: NewpasswordComponent
  },
  {
    path: 'socialLogin',
    component: SocialLoginComponent
  },
  {
    path: 'createaccount',
    component: CreataccountComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'user' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
