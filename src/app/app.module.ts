import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { APP_CONFIG, AppConfig } from './app.config';
import { BackendURLProvider, JwtInterceptor, ErrorInterceptor } from './_helpers';
import { ContentfulModule } from './contentful/contentful.module';
import { ContentfulConfig } from './contentful';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverModule } from 'ngx-bootstrap/popover';
//import { BotGridModule } from 'bot-grid';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ValidateComponent } from './validate/validate.component';
import { BsModalService } from 'ngx-bootstrap';

import { SuperadminModule } from './superadmin/superadmin.module';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { UserIdleModule } from 'angular-user-idle';
import { BadgatewayPageComponent } from './badgateway-page/badgateway-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';

export const contentfulConfig: ContentfulConfig = {
  userSharedData: '',
  spaceId: '',
  accessToken: '',
  orgName: '',
  unitName: '',
  loggedUser: '',
  projectsAndPipelinePermissions: [],
  canvas: {
    id: '',
    class: '',
    isMenuClicked: false,
    defaultEle: null
  },
  events: {
    bsDropdown: null
  }
};


@NgModule({
  declarations: [
    AppComponent,
    ValidateComponent,
    BadgatewayPageComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ContentfulModule.forRoot(contentfulConfig),
    DashboardModule,
    UserModule,
    HttpClientModule,
    SuperadminModule,
    PopoverModule.forRoot(),
    //BotGridModule,
    Ng4LoadingSpinnerModule.forRoot(),
    DeviceDetectorModule,
    UserIdleModule.forRoot({idle: 1800, timeout: 1, ping: 1740}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot({timeOut: 5000,disableTimeOut : false,extendedTimeOut:3000,
      positionClass: 'toast-top-full-width',maxOpened:1,autoDismiss:true}), // ToastrModule added
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    BackendURLProvider,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    BsModalService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
