import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiAgentService {

  constructor(private http: HttpClient) { }

  loadPredefinedBots(): Observable<any>{
    return this.http.get<any>("/subscriptionservice/v1/stripe/load-predefined-bots")
  }
}
