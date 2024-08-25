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
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';
import { FailPaymentComponent } from './fail-payment/fail-payment.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AiAgentSignupComponent } from './ai-agent-signup/ai-agent-signup.component';
import { AiAgentSubscriptionComponent } from './ai-agent-subscription/ai-agent-subscription.component';
import { NewAiAgentSubscriptionComponent } from './new-ai-agent-subscription/new-ai-agent-subscription.component';
import { RecruitmentAiSalesPageComponent } from './agent-pages/recruitment-ai-sales-page';
import { RfpAiSalesPageComponent } from './agent-pages/rfp-ai-sales-page';
import { DevAiSalesPageComponent } from './agent-pages/dev-ai-sales-page';
import { TestingAiSalesPageComponent } from './agent-pages/testing-ai-sales-page';
import { CustomerBotAiSalesPageComponent } from './agent-pages/customer-bot-ai-sales-page';

const routes: Routes = [
  {
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
    path: 'user-page',
    component: UserPageComponent
  },
  {
    path:'userinfo',
    component:UserInfoComponent
  },
  {
    path:'active',
    component: ActiveComponent
  },
  {
    path:'subscription',
    // component: SubscriptionComponent
    // component: AiAgentSubscriptionComponent
    component: NewAiAgentSubscriptionComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'order',
    component: OrderPaymentComponent
  },
  {
    path: 'success',
    component: SuccessPaymentComponent
  },
  {
    path: 'fail',
    component: FailPaymentComponent
  },
  {path:'userDetails',
    component: UserDetailsComponent
  },
  {path:'ai-agents/signup',component: AiAgentSignupComponent},
  {path:'subscription/recruitment',component: RecruitmentAiSalesPageComponent},
  {path:'subscription/rfp',component: RfpAiSalesPageComponent},
  {path:'subscription/dev',component: DevAiSalesPageComponent},
  {path:'subscription/testing',component: TestingAiSalesPageComponent},
  {path:'subscription/chatbot',component: CustomerBotAiSalesPageComponent},
  {
    path:'agent-subscription',
    // component: SubscriptionComponent
    component: AiAgentSubscriptionComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'user' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
