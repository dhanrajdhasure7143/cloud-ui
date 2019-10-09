import { APP_CONFIG } from './../app.config';
import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable()
export class BackendURLInterceptor implements HttpInterceptor {

    constructor(@Inject(APP_CONFIG) private config) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let apiendpoint = this.config.apiendpoint;
      let tokenendpoint = this.config.tokenendpoint;
      let socialAndWorkLogin = this.config.socialAndWorkLogin;

      if (!localStorage.getItem('userName')) {
        //localStorage.setItem('userName', req.body.username);
      }

      if (req.url && req.url.charAt(0) !== '/') {
        apiendpoint = apiendpoint + '/';
        tokenendpoint = tokenendpoint + '/';
        socialAndWorkLogin = socialAndWorkLogin + '/';
      }

      if ((req.url.indexOf('google') < 0 && req.url.indexOf('azure') < 0) && req.url !== '/api/login/beta/accessToken') {
        req = req.clone({
         url: apiendpoint + req.url,
          body: req.body,
          headers: req.headers
        });
      } else if (req.url.indexOf('google') > -1 || req.url.indexOf('azure') > -1 ) {
        req = req.clone({
          //url : url + req.url,
          url: socialAndWorkLogin + req.url,
          body: req.body,
          headers: req.headers
        });
      } else {
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
