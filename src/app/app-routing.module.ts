import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuard, LoginGuard } from './_guards';
import { ValidateComponent } from './validate/validate.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BadgatewayPageComponent } from './badgateway-page/badgateway-page.component';
import { SessionoutComponent } from './sessionout/sessionout.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { TokenAuthGuard } from './_guards/tokenauth.guards';

const routes: Routes = [{
  path: 'activation',
  loadChildren: () => import('./activation/activation.module').then(m => m.ActivationModule),
  canActivate: [AuthGuard]
},
{
  path: 'shared',
  loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
}, 
{
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
}, 
{
  path: 'user',
  loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  canActivate: [LoginGuard]
}, 
{
  path:'superadmin',
  loadChildren:() => import('./superadmin/superadmin.module').then(m => m.SuperadminModule),
  // canActivate: [TokenAuthGuard]
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
