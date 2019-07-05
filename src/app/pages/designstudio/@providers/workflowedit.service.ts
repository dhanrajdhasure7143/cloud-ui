import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowEditService {

  constructor(private http: HttpClient) { }

  getAllRobotsByPrjId(data: any): Observable<any> {
    return this.http.get<any>(`/api/DesktopService.svc/Get?input=${JSON.stringify(data)}`);
  }
}
