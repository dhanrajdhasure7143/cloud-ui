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
      let registrationendpoint=this.config.registrationendpoint;

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
        registrationendpoint=registrationendpoint+'/';
      }

     
      if (req.url !== '/api/login/beta/accessToken' && req.url.indexOf('authorizationservice') < 0 && req.url.indexOf('CrudService') < 0 && req.url.indexOf('ezBotStudio') < 0 && req.url.indexOf('subscriptionservice') < 0 && req.url.indexOf('notificationservice') < 0 && req.url.indexOf('registration') < 0  && req.url.indexOf('resendVerificationMail') < 0) {
        req = req.clone({
         url: apiendpoint + req.url,
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
      else if(req.url.indexOf('registration') > -1 || req.url.indexOf('resendVerificationMail') > -1){
        req = req.clone({
          //url : url + req.url,
          url: registrationendpoint + req.url,
          body: req.body,
          headers: req.headers
        });
      }
      else {
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
