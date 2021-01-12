import { User } from '../../_models/user';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NewpasswordService {
  constructor(private http: HttpClient) { }

  resetPassword(data: any): Observable<any> {
    return this.http.get<any>('/api/user/reset?token='+ data.token);
  }
  newPassword(userData: any = {}): Observable<any> {
       return this.http.post<any>('/api/user/passwordReset?token='+userData.user.tkn, {'password':userData.user.pwd}, httpOptions);
  }
  
}
