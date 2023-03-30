import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
// const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// console.log( `Bearer ${currentUser.accessToken}`);

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${currentUser.accessToken}`
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
    return this.http.get<any[]>('/api/user/tenants/'+tenantId +'/'+userId+'/users', httpOptions);
  }

  updateRole(data): Observable<any[]> {
    return this.http.post<any[]>('/api/user/updateRole', data, httpOptions);
  }
  userProducts(tenantId,userId){
    return this.http.get<any[]>('/authorizationservice/api/v1/tenants/'+tenantId +'/users/'+userId+'/applications', httpOptions);
    //api/v1/auth/tenants/epsoft123/users/rmule@aiotal.com/applications
  }
  userRole(selected_row_userid,appId){
  return this.http.get<any[]>('/authorizationservice/api/v1/applications/'+appId+'/users/'+selected_row_userid+'/roles', httpOptions);
  

//http://localhost:9095/api/v1/auth/users/siva@aiotal.com/application/10/roles


  }
  customPlan(userId,data): Observable<any[]> {
    return this.http.post<any[]>(`/subscriptionservice/v1/billingContact/createCustomPlan/${userId}`, data);
  }

  }


