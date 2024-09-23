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

  uploadFile(body){
    return this.http.post("/platform-service/document/uploadStaticAIAgentFiles",body)
  }
  getAllInstructionsDocuments(body){
    return this.http.post("/platform-service/document/getStaticAIAgentFiles",body)
  }
  deleteDocument(body){
    return this.http.post("/platform-service/document/deleteStaticAIAgentFiles",body)
  }

  downloadFiles(body){
    return this.http.post(`/platform-service/document/downloadFile`,body)
  }

  increaseExecutionLimit(body){
    return this.http.put(`/rpa-service/predefined/update-agent-quantity/${body.subAgentId}?quantity=${body.quantity}&tenantId=${body.tenantId}`,'')
  }

  getCutomerDetails(){
    return this.http.get('/subscriptionservice/v1/subscriptions/subscribed-customers-main-details')
  }
}
