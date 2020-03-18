import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductlistService {
  public product_plans = new BehaviorSubject<any[]>([]);
  constructor(public http:HttpClient) { }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('/subscriptionservice/v1/products');
  }
  setSelectedProductPlan(selected_plans:any[]){
    this.product_plans.next(selected_plans);
  }
  getSelectedProductPlan():Observable<any[]>{
    return this.product_plans.asObservable();
  }
}
