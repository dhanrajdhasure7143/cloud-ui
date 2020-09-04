import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpEvent } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
          })
  };

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public http:HttpClient) { }
  getNotifications(role,userId,notificationbody):Observable<any>{
      return this.http.post<any>('/notificationservice/api/v1/listNotifications?roles='+role+'&userId='+userId,notificationbody,httpOptions);
  }
  cancelSubscription( data) : Observable<any>{
    return this.http.post<any>('/subscriptionservice/v1/subscriptions/' + data.id + '/cancel?isImmediateCancel='+true,null);
  }
 
  listofsubscriptions() : Observable<any> {
    return this.http.get<any>('/subscriptionservice/v1/subscriptions');
  }
  listofinvoices() : Observable<any> {
    return this.http.get<any>('/subscriptionservice/v1/invoices')
  }
  invoicedownload(invoiceId): Observable<any>{
    return this.http.get<any>('/subscriptionservice/v1/invoices/'+invoiceId+'/pdf',{responseType: 'blob' as 'json'})
    }
    getTenantbasedusersDetails(tenantId): Observable<any[]> {
      return this.http.get<any[]>('/api/user/tenants/'+tenantId +'/users', httpOptions);
    }
  getUserDetails(username){
    return this.http.get('/api/user/details?userId='+username,{responseType:"json"})
  }
  getDepartments():Observable<any>{
    return this.http.get<any>('/api/user/departments')
  }
  getAllRoles(appId):Observable<any>{
    return this.http.get<any>('/authorizationservice/api/v1/application/'+appId+'/roles')

  }

  listofPaymentModes():Observable<any>{
    return this.http.get<any>('/subscriptionservice/v1/paymentmethods')
  }
 
  listofCuopons():Observable<any>{
    return this.http.get<any>('/subscriptionservice/v1/orders/listOfCoupons')
  }
 deletePaymentMode(paymentMethodId):Observable<any>{
  return this.http.post<any>('/subscriptionservice/v1/paymentmethods/'+paymentMethodId,httpOptions);
}

getUserApplications():Observable<any>{
  return this.http.get<any>('/authorizationservice/api/v1/user/applications')
}
getUserRole(appID):Observable<any>{
  return this.http.get<any>('/authorizationservice/api/v1/user/role/applications/'+appID,httpOptions)
}
addNewCard(token,isdefault) :Observable<any>{
  return this.http.post<any>('/subscriptionservice/v1/paymentmethods?paymentToken='+token+'&markAsDeafult='+isdefault,httpOptions)
}
setasDefaultCard(paymentModeId){
  return this.http.post('/subscriptionservice/v1/paymentmethods/set-default/'+paymentModeId,{responseType:'json'});
}

inviteUser(inviterID,inviteeID,body) :Observable<any>{
  return this.http.post<any[]>('/api/user/inviteUsers?inviterMailId='+inviterID+'&inviteeMailId='+inviteeID,body,httpOptions)
}

restrictUserInvite(product) : Observable<any>{
  return this.http.get<any>('/subscriptionservice/v1/subscriptions/product/'+product+'/validateUsersCount')
}

getAllRolesForSuperAdmin():Observable<any>{
 return this.http.get<any>('/authorizationservice/api/v1/user/ListOfRoles')
}
deleteRole(roleId):Observable<any>{
   return this.http.delete<any>('/authorizationservice/api/v1/user/DeleteSelectedRole?roleId='+roleId)
    
}
deleteSelectedUser(userId):Observable<any>{
   return this.http.delete<any>('/api/user/deleteSelectedUser?userId='+userId)
    
}

modifyCoupon(couponName,couponId):Observable<any>{
  return this.http.post<any>('/subscriptionservice/v1/orders/updateCoupon?name='+couponName+'&couponid='+couponId,httpOptions)
}
validateCoupon(promo,planAmount,quantity):Observable<any>{
return this.http.get<any>('/subscriptionservice/v1/orders/validateCoupon/'+promo+'?planamount='+planAmount+'&quantity='+quantity)
}

 deleteCoupon(couponId):Observable<any>{
  return this.http.delete<any>('/subscriptionservice/v1/orders/deleteCoupon?couponId='+couponId)
}
getAllPermissions(): Observable<any>{
  return this.http.get<any>('/authorizationservice/api/v1/user/fetchAllPermissions')
}
getPermissionsByAppID(appID:any):Observable<any>{
  return this.http.get<any>('/authorizationservice/api/v1/user/application/'+appID+'/permissions')
}
createPermission(permbody): Observable<any>{
  return this.http.post<any>('/authorizationservice/api/v1/user/createPermissions', permbody,httpOptions)
}
modifyPermission(permbody): Observable<any>{
  return this.http.post<any>('/authorizationservice/api/v1/user/permission/update', permbody,httpOptions)
}
deletePermission(permid):Observable<any>{
  return this.http.delete<any>('/authorizationservice/api/v1/user/permission/delete/'+permid)
}
modifyRole(modifyrolebody) :Observable<any>{
  return this.http.post<any[]>('/authorizationservice/api/v1/user/updateRoleDetails',modifyrolebody,httpOptions)
}
createRole(roleBody): Observable<any>{
  return this.http.post<any>('/authorizationservice/api/v1/user/createRole',roleBody,httpOptions)
}
createCoupon(input):Observable<any>{
  return this.http.post<any>('/subscriptionservice/v1/subscriptions/createCoupon',input,httpOptions);
}
applications(): Observable<any> {
  return this.http.get<any>('/authorizationservice/api/v1/user/applications');
}
alertsConfig(data:any)  {
  
     return this.http.get('/notificationservice/api/v1/application/'+data,{responseType:"json"});
}
saveConfig(data:any): Observable<any>{
  return this.http.post<any>('/notificationservice/api/v1/savealerts',data, httpOptions);
}
listofactivities(tenantId,userrole):Observable<any>{
   return this.http.get<any>('/notificationservice/api/v1/listalerts?roles='+userrole+'&tenantId='+tenantId ,httpOptions);  
 }
 modifyAlert(alertmodifybody,userId):Observable<any>{
  return this.http.post<any[]>('/notificationservice/api/v1/modifyalert?userId='+userId+'',alertmodifybody,httpOptions)
}
deleteAlert(alertId):Observable<any>{
  return this.http.delete<any>('/notificationservice/api/v1/deleteAlert?alertId='+alertId,{responseType:"json"})
}
changePassword(pswdbody:any): Observable<any>{
  return this.http.post<any>('/api/user/passwordChange', pswdbody,httpOptions)
}
modifyUserRole(data:any): Observable<any>{
  return this.http.put<any>('/authorizationservice/api/v1/user/role/applications/', data,httpOptions)
}
deleteNotification(notificationId):Observable<any>{
  return this.http.delete<any>('/notificationservice/api/v1/deleteNotification?notificationId='+notificationId,{responseType:"json"})
}

}
