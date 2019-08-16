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

      if (!localStorage.getItem('userName')) {
        //localStorage.setItem('userName', req.body.username);
      }

      if (req.url && req.url.charAt(0) !== '/') {
        apiendpoint = apiendpoint + '/';
        tokenendpoint = tokenendpoint + '/';
      }

      if (req.url !== '/api/login/beta/accessToken') {
        req = req.clone({
          url: apiendpoint + req.url,
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
