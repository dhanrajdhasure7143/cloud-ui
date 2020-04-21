import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpEvent } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
          })
  };

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public http:HttpClient) { }
  getNotifications(userId):Observable<any>{
      return this.http.post<any>('/notificationservice/api/v1/listNotifications',userId,httpOptions);
  }
  listofsubscriptions() : Observable<any> {
    return this.http.get<any>('/subscriptionservice/v1/subscriptions');
  }
  listofinvoices() : Observable<any> {
    return this.http.get<any>('/subscriptionservice/v1/invoices')
  }


}
