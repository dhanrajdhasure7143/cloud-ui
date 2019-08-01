import { InputResponse } from './../@models/workflowRobot';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class WorkflowEditService {
  projectId: string;
  robotId: number;
  inputResponse : InputResponse
  constructor(private http: HttpClient) { }

  getAllRobotsByPrjId(data: any): Observable<any> {

    return this.http.post<any>(`/api/ezBotStudio/Get?input=${JSON.stringify(data)}`,{});
  }

  getAllElements(): Observable<any> {
    return this.http.post<any>(`/api/ezBotStudio/Get?input=${JSON.stringify({'Type':'AllElements'})}`, {});
  }

  getAllActionProperties(): Observable<any> {
    return this.http.post<any>(`/api/ezBotStudio/Get?input=${JSON.stringify({'Type':'AllActionProperties'})}`, {});
  }

  getAllActionsByType(data): Observable<any> {
    return this.http.post('/api/ezBotStudio/Get?input=' + data, {});
  }

  submitrobot(data): Observable<any> {
    return this.http.post<any>(`/api/ezBotStudio/SaveWorkflow?input=${JSON.stringify(data)}`,{});
  }

  createRobot1(data): Observable<any> {
    return this.http.post<any>(`/api/ezBotStudio/Create/Project?input=${JSON.stringify(data)}`,httpOptions);
  }

  deleteRobot(deletedata): Observable<any> {
    return this.http.post<any>(`/api/ezBotStudio/DeleteRobot?input=${JSON.stringify(deletedata)}`,{}, httpOptions);
  }
  getVersionsofRobot(id): Observable<any>{
  return this.http.get<any>(`/api/CrudService/GetVersionsofRobot?id=${id}`);
  }
  getRobotLog(tablename,roleid): Observable<any>{
  return this.http.get<any>(`/api/CrudService/GetRobotLog?tablename=${tablename}&roleid=${roleid}`);
  }
  executeRobot(data): Observable<any>{
    return this.http.get<any>(`/api/ezBotStudio/ExecuteRobot?input=${JSON.stringify(data)}`);
  }
  debug_Order(data):Observable<any>{
    return this.http.get<any>(`/api/ezBotStudio/Debug_Order?input=${JSON.stringify(data)}`);
  }

}
