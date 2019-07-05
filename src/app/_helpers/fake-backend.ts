import { APP_CONFIG } from './../app.config';
import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, config} from 'rxjs';

@Injectable()
export class BackendURLInterceptor implements HttpInterceptor {

    constructor(@Inject(APP_CONFIG) private config) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const url = this.config.apiHost;
      let cloneUrl = '/';
      if (req.url && req.url.indexOf('/api/') > -1) {
        cloneUrl = url + req.url.replace('/api/', '/');
      } else {
        cloneUrl = url + req.url;
      }

      req = req.clone({
        url: cloneUrl,
        body: req.body,
        headers: req.headers
      });

      return next.handle(req);
    }
}

export let BackendURLProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: BackendURLInterceptor,
    multi: true
};
