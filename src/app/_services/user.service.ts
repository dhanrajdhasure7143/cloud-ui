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

    fetchalluserNames (): Observable<any[]> {
      return this.http.get<any[]>('/rest/users/fetchalluserNames');
    }
    getRole(tenantId,userId) {
      return this.http.get<any[]>('/api/v1/auth/tenants/'+tenantId +'/users/'+userId+'/roles');
   }
}
