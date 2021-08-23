import { User } from '../../_models/user';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';



const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable({ providedIn: 'root' })
export class ForgotpasswordService {
    constructor(private http: HttpClient) { }

    forgotPassword(data: any): Observable<any> {
      return this.http.get<any>('/api/user/passwordResetMail?emailId='+ data.email);
    }
}
