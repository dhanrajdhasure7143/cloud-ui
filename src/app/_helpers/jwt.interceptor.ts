import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Base64 } from 'js-base64';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.accessToken && request.url !== '/api/beta/accessToken') {
            console.log(localStorage.getItem('userName'));
            // console.log(Crypto.charenc.UTF8.bytesToString(Crypto.util.base64ToBytes(currentUser.token)););
            
            request = request.clone({
                headers: request.headers,
                setHeaders: {
                    // userName: localStorage.getItem('userName'),
                    Authorization: `Bearer ${currentUser.accessToken}`,
                    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Credentials': 'true',
                    // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
                }
            });
        } else {
            request = request.clone({
                headers: request.headers,
                body: request.body,
                setHeaders: {
                  //  Authorization: `Bearer ${currentUser.access_token}`,
                    // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Credentials': 'true',
                    // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
                }
            });
        }

        return next.handle(request);
    }
}
