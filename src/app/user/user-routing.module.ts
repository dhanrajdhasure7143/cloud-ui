import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { CreataccountComponent } from './creataccount/creataccount.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { RedirectsignoutComponent } from './redirectsignout/redirectsignout.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ActiveComponent } from './active/active.component';
import { ApprovalsComponent } from './approvals/approvals.component';

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
  {
    path: 'changepassword',
    component: ChangepasswordComponent
  },
  {
    path: 'signout',
    component: RedirectsignoutComponent
  },
  {
    path:'userinfo',
    component:UserInfoComponent
  },{
    path:'active', component: ActiveComponent
  },
  {path:'approvals',component:ApprovalsComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: 'user' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
