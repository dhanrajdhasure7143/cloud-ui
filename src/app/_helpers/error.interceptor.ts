import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.message.indexOf('oauth') < 0 && err.status === 401) {
                this.authenticationService.logout();
                this.authenticationService.loginExpired();
            } else if (err.status === 504)  {
              this.authenticationService.logout();
              this.authenticationService.backendServerDown();
            } else if (err.status === 403)  {
                this.authenticationService.logout();
                this.authenticationService.forbiddenAccess();
              }
            return throwError(err);
        }));
    }
}
