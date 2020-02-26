import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
        })
};
@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  public id:any = [];
  constructor(private http: HttpClient) { }

  alertsConfig(): Observable<any> {
    this.id = 1
    return this.http.get<any>(`/rest/api/v1/notification/`+this.id);
}
saveConfig(data:any): Observable<any>{
  return this.http.post<any>(`/rest/api/v1/createnotification/`+this.id, data, httpOptions);
}
}

// http:localhost:9090/api/v1/notification/{application_id}/role/{role_id}