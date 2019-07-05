import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const loggedData = JSON.parse(JSON.parse(localStorage.getItem('currentUser')));

@Injectable({
  providedIn: 'root'
})
export class WorkflowcreateService {

  constructor(private http: HttpClient) { }

  createApi(data: any): Observable<any>  {
    return this.http.get<any>(`/api/DesktopService.svc/Create?input=${JSON.stringify(data)}`);
  }

  createRobot(data: any): Observable<any>  {
    return this.http.get<any>(`/api/DesktopService.svc/Create?input=${JSON.stringify(data)}`);
  }

  getAllRobots() {
    return this.http.get<any>(`/api/CrudService.svc/getStudio?roleId=${loggedData['User'][0].Role_ID}&userId=${loggedData['User'][0].UserName}`);
  }
}
