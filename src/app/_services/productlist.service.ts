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
  getProductPlanes(productId,tenantID): Observable<any[]> {
    return this.http.get<any[]>('/subscriptionservice/v1/products/'+productId +'/plans');
  }
  subscribePlan(token,planData){
    return this.http.post<any>('/subscriptionservice/v1/orders?paymentToken='+token,planData)
  }
  getPaymentToken(cardData){
    return this.http.post('/subscriptionservice/v1/paymentmethods/cardToken',cardData,{responseType:'text'})
  }
  getNewAccessToken(): Observable<any[]>
  {
    return this.http.get<any[]>('/api/login/beta/newAccessToken',httpOptions);
  }
  activateFreeTire(freePlanData){
    return this.http.post('/subscriptionservice/v1/freetrials',freePlanData)

  }
  contactUs(userdata) : Observable<any>{
    return this.http.post<any>('/api/user/contact-us',userdata)
    }
    getFreeTierInfo(productId) : Observable<any>{
      return this.http.get<any>('/subscriptionservice/v1/freetrials/'+productId+'/freetierExpiry')
      }

}
