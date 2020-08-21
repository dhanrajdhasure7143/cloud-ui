import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'; 
import { BehaviorSubject, throwError, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpServiceService {

  constructor(private http:HttpClient) { }  
  getIPAddress(): Promise<Object>
  {  
    return this.http.get("http://api.ipify.org/?format=json").toPromise();  
  } 
}
