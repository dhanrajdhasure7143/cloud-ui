import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, throwError, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpServiceService {

  constructor(private http:HttpClient) { }  
  getIPAddress(): Promise<Object>
  {  
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('origin', 'local');
    return this.http.get("https://api.ipify.org/?format=json",  {headers}).toPromise();
  } 
}
