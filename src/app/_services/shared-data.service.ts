import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
 public loggedinUserData = new BehaviorSubject<any>(null);
 loggedinUserFirstLetter = new BehaviorSubject<any>(null);
  freetrialavailed=  new BehaviorSubject<any>(null);

  public getLoggedinUserData() {
    return this.loggedinUserData.asObservable();
  }
  setLoggedinUserData(data:any){
    this.loggedinUserData.next(data);
  }
  public getLoggedinUserFirstLetter() {
    return this.loggedinUserFirstLetter.asObservable();
  }
  setLoggedinUserFirstLetter(data:any){
    this.loggedinUserFirstLetter.next(data);
  }
  public getFreetieravailed() {
    return this.freetrialavailed.asObservable();
  }
  setFreetrialavailed(data:any){
    this.freetrialavailed.next(data);
  }
}
