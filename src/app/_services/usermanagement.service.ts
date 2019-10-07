import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  fetchallusers(data): Observable<any[]> {
    return this.http.get<any[]>('/api/user/usersByTenant?tenantId=' + data );
  }

  fetchallroles(): Observable<any[]> {
    return this.http.get<any[]>('/api/user/roles');
  }

  updateRole(data): Observable<any[]> {
    return this.http.post<any[]>('/api/user/updateRole', data);
  }
}

