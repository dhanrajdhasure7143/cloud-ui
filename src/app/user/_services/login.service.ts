import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public httpclient: HttpClient) {
  }

  googleLogin(): Observable<any> {
    return this.httpclient.get<any>('/api/oauthRedirect?authProvider=google&redirectPath=http://localhost:4200/#/activation');
  }

  azureLogin(): Observable<any> {
    return this.httpclient.get<any>('/api/oauthRedirect?authProvider=azure&redirectPath=http://localhost:4200/#/activation');
  }

}
