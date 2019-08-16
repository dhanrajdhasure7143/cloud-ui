import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token && request.url !== '/api/beta/accessToken') {
            request = request.clone({
                headers: request.headers,
                setHeaders: {
                    userName: localStorage.getItem('userName'),
                    Authorization: `Bearer ${currentUser.access_token}`,
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        return next.handle(request);
    }
}
