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

    getUserApplications() {
      return this.http.get<User[]>('/authorizationservice/api/v1/tenants/users/applications');
  }

    fetchalluserNames (): Observable<any[]> {
      return this.http.get<any[]>('/rest/users/fetchalluserNames');
    }
  //   getRole(tenantId,userId) {
      
  //     return this.http.get<any[]>('/authorizationservice/api/v1/tenants/'+tenantId +'/users/'+userId+'/roles');
  //  }
   getSelectedRole(appId): Observable<any[]>{
    return this.http.get<any[]>('/authorizationservice/api/v1/application/'+appId+'/roles');
   }
   getUserRoleForSelectedProduct(appId): Observable<any[]>{
    return this.http.get<any[]>('/authorizationservice/api/v1/users/roles/applications'+appId);
   }

   inviteUsersLimit(product): Observable<any[]>{
    return this.http.get<any[]>('subscriptionservice/v1/subscriptions/product/'+product+'/noOfAllowedUsers');
   }
   countOfUsersForTenantForProduct(productId): Observable<any[]>{
    return this.http.get<any[]>('/authorizationservice/api/v1/tenants/applications/'+productId);
   }
}
