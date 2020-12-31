import { APP_CONFIG } from './../app.config';
import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// };

@Injectable()
export class BackendURLInterceptor implements HttpInterceptor {

    constructor(@Inject(APP_CONFIG) private config) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let apiendpoint = this.config.apiendpoint;
      let tokenendpoint = this.config.tokenendpoint;
      let socialAndWorkLogin = this.config.socialAndWorkLogin;
      let authorizationendpoint = this.config.authorizationendpoint;
      let notificationsendpoint = this.config.notificationsendpoint;
      let Subscriptionendpoint=this.config.Subscriptionendpoint;
      let rpaendpoint=this.config.rpaendpoint;
      let piendpoint=this.config.piendpoint;
      let isSecurityManagerEnabled = this.config.isSecurityManagerEnabled;
      let proxyTokenendpoint = this.config.proxyTokenendpoint;

      if (!localStorage.getItem('userName')) {
        //localStorage.setItem('userName', req.body.username);
      }

      if (req.url && req.url.charAt(0) !== '/') {
        apiendpoint = apiendpoint + '/';
        tokenendpoint = tokenendpoint + '/';
        authorizationendpoint = authorizationendpoint + '/';
        socialAndWorkLogin = socialAndWorkLogin + '/';
        notificationsendpoint = notificationsendpoint + '/';
        Subscriptionendpoint=Subscriptionendpoint+'/';
        rpaendpoint=rpaendpoint+'/';
        piendpoint=piendpoint+'/';
      }

      if (((isSecurityManagerEnabled == true && req.url !== '/Idm/accessToken') || (isSecurityManagerEnabled == false && req.url !== '/api/login/beta/accessToken')) && ((isSecurityManagerEnabled == true && req.url !== '/Idm/token') || (isSecurityManagerEnabled == false && req.url !== '/api/login/beta/token')) && req.url !== '/api/login/beta/newAccessToken' && req.url.indexOf('authorizationservice') < 0 && req.url.indexOf('generateOTP') < 0 && req.url.indexOf('validateOTP') < 0 && req.url.indexOf('CrudService') < 0 && req.url.indexOf('ezBotStudio') < 0 && req.url.indexOf('subscriptionservice') < 0 && req.url.indexOf('notificationservice') < 0 && req.url.indexOf('mailService') < 0 && req.url.indexOf('rpa-service') < 0 && req.url.indexOf('processintelligence') < 0 && req.url.indexOf('alertConfigurationService') < 0 && req.url.indexOf('http://api.ipify.org') < 0 ) {
        req = req.clone({
         url: apiendpoint + req.url,
          body: req.body,
          headers: req.headers
        });
      } else if (req.url.indexOf('http://api.ipify.org') > -1) {
        req = req.clone({
          url: req.url,
          body: req.body,
          headers: req.headers
        });
      } else if (req.url.indexOf('CrudService') > -1 || req.url.indexOf('ezBotStudio') > -1 ) {
        req = req.clone({
          //url : url + req.url,
          url: socialAndWorkLogin + req.url,
          body: req.body,
          headers: req.headers
        });
      } else if(req.url.indexOf('authorizationservice') > -1 ){
        req = req.clone({
          //url : url + req.url,
          url: authorizationendpoint + req.url,
          body: req.body,
          headers: req.headers
        });
      }else if( req.url.indexOf('subscriptionservice') > -1){
        req = req.clone({
          //url : url + req.url,
          url:Subscriptionendpoint + req.url,
          body: req.body,
          headers: req.headers
        });
      }
      //** */
      else if(req.url.indexOf('notificationservice') > -1){
        req = req.clone({
          //url : url + req.url,
          url: notificationsendpoint + req.url,
          body: req.body,
          headers: req.headers
        });
      }
      else if(req.url.indexOf('mailService') > -1){  
        req = req.clone({
          //url : url + req.url,
          url: notificationsendpoint + req.url,
          body: req.body,
          headers: req.headers
        });
      }
      else if(req.url.indexOf('rpa-service') > -1){  
      req = req.clone({
      //url : url + req.url,
      url: rpaendpoint + req.url,
      body: req.body,
       headers: req.headers
        });
        }
        else if(req.url.indexOf('processintelligence') > -1){  
          req = req.clone({
          //url : url + req.url,
          url: piendpoint + req.url,
          body: req.body,
           headers: req.headers
            });
            }
        else if(req.url.indexOf('alertConfigurationService') > -1){  
         req = req.clone({
        //url : url + req.url,
        url: notificationsendpoint + req.url,
        body: req.body,
        headers: req.headers
         });
        }
      else {
      if(isSecurityManagerEnabled &&  req.url == '/Idm/accessToken') || (isSecurityManagerEnabled &&  req.url == '/Idm/token'){
         tokenendpoint = proxyTokenendpoint;
      }
        req = req.clone({
          url: tokenendpoint + req.url,
          body: req.body,
          headers: req.headers
        });
      }
     

      return next.handle(req);
    }
}

export let BackendURLProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: BackendURLInterceptor,
    multi: true
};
