
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
  getAllDepartments(): Observable<any> {
    return this.http.get<any>(`/api/user/departments`);
  }
  listofsubscriptions() : Observable<any> {
    return this.http.get<any>('/subscriptionservice/v1/subscriptions');
  }
  listofinvoices() : Observable<any> {
    return this.http.get<any>('/subscriptionservice/v1/invoices')
  }

  allCountries(): Observable<any>{
    return this.http.get<any>(`/cloud-ui/src/assets/jsons/countries.json`);  
  }
// test
  updateUser(user: User): Observable<any> {
    return this.http.post<any>(`/api/user/updateUserDetails`, user);

  }
  // readuser(){
  //   return this.http.get()
  // }
  verifyInvitee(inviteId: any): Observable<any> {
    return this.http.get<any>(`/api/user/invitationConfirm?inviteId=${inviteId}`);
  }

}
