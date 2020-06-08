import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuard, LoginGuard } from './_guards';
import { ValidateComponent } from './validate/validate.component';

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
];

const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
