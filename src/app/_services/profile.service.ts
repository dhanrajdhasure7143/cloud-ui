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
  cancelSubscription( data) : Observable<any>{
    return this.http.post<any>('/subscriptionservice/v1/subscriptions/' + data.id + '/cancel?isImmediateCancel='+true,null);
  }
 
  listofsubscriptions() : Observable<any> {
    return this.http.get<any>('/subscriptionservice/v1/subscriptions');
  }
  listofinvoices() : Observable<any> {
    return this.http.get<any>('/subscriptionservice/v1/invoices')
  }
  invoicedownload(invoiceId): Observable<any>{
    return this.http.get<any>('/subscriptionservice/v1/invoices/'+invoiceId+'/pdf',{responseType: 'blob' as 'json'})
    }

  getUserDetails(username){
    return this.http.get('/api/user/details?userId='+username,{responseType:"json"})
  }
  getDepartments():Observable<any>{
    return this.http.get<any>('/api/user/departments')
  }
  listofPaymentModes():Observable<any>{
    return this.http.get<any>('/subscriptionservice/v1/paymentmethods')
  }

 deletePaymentMode(paymentMethodId):Observable<any>{
  return this.http.post<any>('/subscriptionservice/v1/paymentmethods/'+paymentMethodId,httpOptions);
}

getUserApplications():Observable<any>{
  return this.http.get<any>('/authorizationservice/api/v1/user/applications')
}
getUserRole(appID):Observable<any>{
  return this.http.get<any>('/authorizationservice/api/v1/user/role/applications/'+appID,httpOptions)
}
}
