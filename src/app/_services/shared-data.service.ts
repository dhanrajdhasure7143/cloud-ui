import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
 loggedinUserData = new BehaviorSubject<any>(null);
 loggedinUserFirstLetter = new BehaviorSubject<any>(null);

  constructor() {
  }
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
}
