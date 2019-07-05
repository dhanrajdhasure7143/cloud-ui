import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuard } from './_guards';

const routes: Routes = [{
  path: '',
  loadChildren: './user/user.module#UserModule'
}, {
  path: 'pages',
  loadChildren: './pages/pages.module#PagesModule',
  canActivate: [AuthGuard]
}, {
  path: '',
  redirectTo: '',
  pathMatch: 'full'
}];

const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
