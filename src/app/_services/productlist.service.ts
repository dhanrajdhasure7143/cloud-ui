import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductlistService {

  constructor(public http:HttpClient) { }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('/subscriptionservice/v1/products');
  }
  getProductPlanes(productId:any): Observable<any[]> {
    return this.http.get<any[]>('/subscriptionservice/v1/products/'+productId +'/plans');
  }
  subscribePlan(token,planData){
    return this.http.post<any>('/subscriptionservice/v1/orders?paymentToken='+token,planData)
  }
}
