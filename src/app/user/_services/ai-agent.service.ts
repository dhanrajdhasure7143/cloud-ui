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

  getAllPredefinedBotsList(){
    return this.http.get("/rpa-service/predefined/getAll-predefined-bots")
  }

  savePredefinedBots(body:any){
    return this.http.post("/rpa-service/predefined/save-predefined-bots-for-prodect-id",body)
  }
  deletePredefinedBots(id:any){
    return this.http.post("/rpa-service/predefined/delete-predefined-bot-product/"+id,null)
  }
}
