import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin':'https://accounts.google.com',
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS'
     
    
  })
};

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(public httpclient: HttpClient) {
  }

  googleLogin(): Observable<any> {
    return this.httpclient.get<any>('/api/socialLogin?authProvider=google&redirectPath=http://localhost:4200/#/activation',httpOptions);
  }

  azureLogin(): Observable<any> {
    return this.httpclient.get<any>('/api/socialLogin?authProvider=azure&redirectPath=http://localhost:4200/#/activation');
  }

}
