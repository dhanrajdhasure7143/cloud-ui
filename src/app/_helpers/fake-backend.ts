import { APP_CONFIG } from './../app.config';
import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, config, of, throwError} from 'rxjs';
import { mergeMap, materialize, dematerialize, delay, } from 'rxjs/operators';

@Injectable()
export class BackendURLInterceptor implements HttpInterceptor {

    constructor(@Inject(APP_CONFIG) private config) { }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //   const url = this.config.apiHost;
    //   let cloneUrl = '/';
    //   // if (req.url && req.url.indexOf('/api/') > -1) {
    //   //   cloneUrl = url + req.url.replace('/api/', '/');
    //   // } else {
    //   //   cloneUrl = url + req.url;
    //   // }

    //   cloneUrl = url + req.url;

    //   req = req.clone({
    //     url: cloneUrl,
    //     body: req.body,
    //     headers: req.headers
    //   });

    //   return next.handle(req);
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let testUser = { id: 1, username: 'admin', password: 'epsadmin@1', firstName: 'Test', lastName: 'User' };

      // wrap in delayed observable to simulate server api call
      return of(null).pipe(mergeMap(() => {

          // authenticate
          if (request.url.indexOf('api/CrudService.svc/LoginAuthenticationEX') > -1 && request.method === 'GET') {
              let body = {
                id: testUser.id,
                username: testUser.username,
                firstName: testUser.firstName,
                lastName: testUser.lastName,
                token: 'fake-jwt-token'
              };
              return of(new HttpResponse({ status: 200, body }));
          } else {
              // const url = this.config.apiHost;
                  
              // let cloneUrl = '/';

              // // if (request.url && request.url.indexOf('/api/') > -1) {
              // //   cloneUrl = url + request.url.replace('/api/', '/');
              // // } else {
              // //   cloneUrl = url + request.url;
              // // }
        
              // cloneUrl = url + request.url;
              // request = request.clone({
              //   url: cloneUrl,
              //   body: request.body,
              //   headers: request.headers
              // });
  
          }
        return next.handle(request);  
      }))

      // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let BackendURLProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: BackendURLInterceptor,
    multi: true
};
