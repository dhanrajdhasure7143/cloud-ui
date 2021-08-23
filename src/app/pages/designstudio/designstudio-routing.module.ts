import { BotcreateComponent } from './home/botcreate/botcreate.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoteditComponent } from './home/botedit/botedit.component';

const routes: Routes = [{
  // path: '',
  // component: HomeComponent,
  // children: [
  //   {
  //     path: 'botedit/:robot',
  //     component: BoteditComponent
  //   },
  //   {
  //     path: 'botcreate',
  //     component: BotcreateComponent
  //   }
  // ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignstudioRoutingModule { }
