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
  public user:any = localStorage.getItem('userName')
  public tenantId:any = localStorage.getItem('company')

  alertsConfig(data:any): Observable<any> {
    console.log(data);
       return this.http.get<any>(`/api/v1/notificationservice/application/`+data,data);
}
saveConfig(data:any): Observable<any>{
  return this.http.post<any>(`/api/v1/notificationservice/scheduleActivity`,data, httpOptions);
}
applications(): Observable<any> {
  return this.http.get<any>(`/authorizationservice/api/v1/tenants/`+this.tenantId+`/users/`+this.user+'/applications');
}
}
