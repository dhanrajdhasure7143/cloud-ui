import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';

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

  setCarddetails(cardDetails:any){
  this.card_details.next(cardDetails);
  }
  getCarddetails():Observable<any>{
    return this.card_details.asObservable();
  }
}
