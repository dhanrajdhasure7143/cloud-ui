import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { idLocale } from 'ngx-bootstrap';
import { InputResponse } from '../@models/workflowRobot';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WorkflowcreateService {
  public projectId;

  constructor(private http: HttpClient) { }

  createApi(data: any): Observable<any>  {
    return this.http.post<any>(`/api/ezBotStudio/Create/Project?input=${JSON.stringify(data)}`, httpOptions);
  }

  createRobot(data: any): Observable<any>  {
    return this.http.post<any>(`/api/ezBotStudio/Create/Project?input=${JSON.stringify(data)}`, httpOptions);
  }

  getAllRobots(): Observable<any> {
    return this.http.get<any>(`/api/ezBotStudio/getStudio?roleId=1&userId=admin`);
  }

  loadDropDown(): Observable<any> {
    return this.http.get<any>(`/api/CrudService/getTableData?tablename=LOB`);
  }

  getAllRobotsData(): Observable<any> {
    return this.http.get<any>('/api/CrudService/?tablename=ROBOT');
  }

  getAllRobotsByProjectId(data): Observable<any[]> {
    return this.http.get<any[]>(`/api/ezBotStudio/Get?input=${JSON.stringify(data)}`);
  }
}
