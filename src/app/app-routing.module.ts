import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuard, LoginGuard } from './_guards';
import { ValidateComponent } from './validate/validate.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BadgatewayPageComponent } from './badgateway-page/badgateway-page.component';
import { SessionoutComponent } from './sessionout/sessionout.component';
import { ApprovalsComponent } from './approvals/approvals.component';

const routes: Routes = [{
  path: 'activation',
  loadChildren: './activation/activation.module#ActivationModule',
  canActivate: [AuthGuard]
},
{
  path: 'shared',
  loadChildren: './shared/shared.module#SharedModule',
}, 
{
  path: 'home',
  loadChildren: './home/home.module#HomeModule'
}, 
{
  path: 'user',
  loadChildren: './user/user.module#UserModule',
  canActivate: [LoginGuard]
}, 
{
  path:'superadmin',
  loadChildren:'./superadmin/superadmin.module#SuperadminModule',
},{
  path: '404',
  component: ErrorPageComponent
},
{
  path: 'badgateway',
  component: BadgatewayPageComponent
},{
  path:'timeout',
  component:SessionoutComponent
},
{path:'approvals',component:ApprovalsComponent},
// {
//   path: 'pages',
//   loadChildren: './pages/pages.module#PagesModule',
//   canActivate: [AuthGuard]
// },
{
  path: 'validate/:token',
  component: ValidateComponent
},
{
  path: '',
  redirectTo: 'user',
  pathMatch: 'full'
},
// {
//   path: '**',
//   component: ErrorPageComponent
// }
];

const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
