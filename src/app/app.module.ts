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
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule, LoginOpt } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { Subject } from 'rxjs';
import { BotGridModule } from 'bot-grid';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ContentfulModule.forRoot(contentfulConfig),
    DashboardModule,
    UserModule,
    HttpClientModule,
    SocialLoginModule,
    PopoverModule.forRoot(),
    BotGridModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: APP_CONFIG, useValue: AppConfig },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    BackendURLProvider,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
