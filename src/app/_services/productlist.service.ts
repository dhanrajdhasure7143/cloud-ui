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
  getAllProducts(tenantID): Observable<any[]> {
    return this.http.get<any[]>('/subscriptionservice/v1/products?tenantID='+tenantID);
  }
  getProductPlanes(productId,tenantID): Observable<any[]> {
    return this.http.get<any[]>('/subscriptionservice/v1/products/'+productId +'/'+tenantID+'/plans');
  }
  subscribePlan(token,planData){
    return this.http.post<any>('/subscriptionservice/v1/orders?paymentToken='+token,planData)
  }
  getPaymentToken(cardData){
    return this.http.post('/subscriptionservice/v1/paymentmethods/cardToken',cardData,{responseType:'text'})
  }

}
