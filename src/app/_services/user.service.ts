import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    getUserApplications(tenantId, userId) {
      return this.http.get<User[]>('/authorizationservice/api/v1/tenants/'+tenantId+'/users/'+userId+'/applications');
  }

    fetchalluserNames (): Observable<any[]> {
      return this.http.get<any[]>('/rest/users/fetchalluserNames');
    }
  //   getRole(tenantId,userId) {
      
  //     return this.http.get<any[]>('/authorizationservice/api/v1/tenants/'+tenantId +'/users/'+userId+'/roles');
  //  }
   getSelectedRole(userId,appId): Observable<any[]>{
    return this.http.get<any[]>('/authorizationservice/api/v1/users/'+userId+'/application/'+appId+'/roles');
   }
   getUserRoleForSelectedProduct(userId,appId): Observable<any[]>{
    return this.http.get<any[]>('/authorizationservice/api/v1/applications/'+appId+'/users/'+userId+'/roles');
   }

   inviteUsersLimit(product): Observable<any[]>{
    return this.http.get<any[]>('subscriptionservice/v1/subscriptions/product/'+product+'/noOfAllowedUsers');
   }
   countOfUsersForTenantForProduct(tenantId, productId): Observable<any[]>{
    return this.http.get<any[]>('/authorizationservice/api/v1/tenants/'+tenantId+'/applications/'+productId);
   }
}
