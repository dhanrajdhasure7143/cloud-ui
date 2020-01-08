import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${currentUser.token}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  fetchallusers(data): Observable<any[]> {
    return this.http.get<any[]>('/api/user/usersByTenant?tenantId=' + data, httpOptions);
  }

  fetchallroles(): Observable<any[]> {
    return this.http.get<any[]>('/api/user/roles', httpOptions);
  }
  usersDetails(tenantId,userId): Observable<any[]> {
    return this.http.get<any[]>('/api/user//tenants/'+tenantId +'/'+userId+'/users', httpOptions);
  }

  updateRole(data): Observable<any[]> {
    return this.http.post<any[]>('/api/user/updateRole', data, httpOptions);
  }
}

