
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ContentfulService } from './../../contentful/services/contentful.service';
import { User } from './../../_models/user';

@Injectable({
  providedIn: 'root'
})
export class FirstloginService {

  constructor(private http: HttpClient, private router: Router, private content: ContentfulService) { }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`/api/user/registrationcomplete`, user);
  }
  verifyToken(token: any): Observable<any> {
    return this.http.get<any>(`/api/user/registrationConfirm?token=${token}`);
  }
}
