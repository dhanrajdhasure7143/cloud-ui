import { User } from '../../_models/user';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable({ providedIn: 'root' })
export class ForgotpasswordService {
    constructor(private http: HttpClient) { }

    forgotPassword(data: any): Observable<any> {
      let isAiAgents= environment.product =='AiAgents' ? true : false;
      return this.http.get<any>('/api/user/passwordResetMail?aiAgent='+isAiAgents+'&emailId='+ data.email);
    }
}
