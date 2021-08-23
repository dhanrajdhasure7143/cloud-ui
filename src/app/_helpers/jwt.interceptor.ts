import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Base64 } from 'js-base64';
import { CryptoService } from '../_services/crypto.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private crypto:CryptoService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log("i cam to jwt", currentUser);
        
        if (currentUser && currentUser.accessToken && request.url !== '/api/beta/accessToken') {
            // console.log(localStorage.getItem('userName'));
            // console.log(Crypto.charenc.UTF8.bytesToString(Crypto.util.base64ToBytes(currentUser.token)););
            let ipAddress = '192.168.0.1';
            if(localStorage.getItem('ipAddress'))
             ipAddress = localStorage.getItem('ipAddress');
             var timezone=Intl.DateTimeFormat().resolvedOptions().timeZone;
             var userId= this.crypto.encrypt(JSON.stringify(localStorage.getItem('ProfileuserId')));             

            request = request.clone({
                headers: request.headers,
                setHeaders: {                    
                    Authorization: `Bearer ${currentUser.accessToken}`,
                    'ip-address': ipAddress,
                    'timezone':timezone,
                    'authKey':userId
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
