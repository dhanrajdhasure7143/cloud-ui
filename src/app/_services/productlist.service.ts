import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
        })
};

@Injectable({
  providedIn: 'root'
})
export class ProductlistService {

  constructor(public http:HttpClient) { }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('/subscriptionservice/v1/products');
  }
  getProductPlanes(productId,tenantID,accessToken): Observable<any[]> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    });
    return this.http.get<any[]>('/subscriptionservice/v1/products/'+productId +'/plans',{headers:  headers, responseType:'json'});
  }
  subscribePlan(token,planData,accessToken){
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    });
    return this.http.post<any>('/subscriptionservice/v1/orders?paymentToken='+token,planData,{headers:  headers, responseType:'json'})
  }
  getMyAccountPaymentToken(cardData){
    return this.http.post('/subscriptionservice/v1/paymentmethods/cardToken?tab=myaccount',cardData,{responseType:'json'})
  }
  getSubscriptionPaymentToken(cardData,accessToken){
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    });
    return this.http.post('/subscriptionservice/v1/paymentmethods/cardToken?tab=subs',cardData,{headers:  headers, responseType:'json'})
  }
  getNewAccessToken(): Observable<any[]>
  {
    return this.http.get<any[]>('/api/login/beta/newAccessToken',httpOptions);
  }
  activateFreeTire(freePlanData){
    return this.http.post('/subscriptionservice/v1/freetrials',freePlanData)

  }
  contactUs(userdata) : Observable<any>{
    return this.http.post<any>('/subscriptionservice/v1/orders/contact-us',userdata)
    }
    getFreeTierInfo(productId) : Observable<any>{
      return this.http.get<any>('/subscriptionservice/v1/freetrials/'+productId+'/freetierExpiry')
      }

}
