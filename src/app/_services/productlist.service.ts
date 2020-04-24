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
  public card_details =new BehaviorSubject<any>({});
  public productId=new BehaviorSubject<any>({})

  constructor(public http:HttpClient) { }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('/subscriptionservice/v1/products');
  }
  getProductPlanes(productId:any): Observable<any[]> {
    return this.http.get<any[]>('/subscriptionservice/v1/products/'+productId +'/plans');
  }
  subscribePlan(token,planData){
    return this.http.post<any>('/subscriptionservice/v1/orders?paymentToken='+token,planData,httpOptions)
  }
}
