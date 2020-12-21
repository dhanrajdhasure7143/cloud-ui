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
    return this.http.post<any>('/subscriptionservice/v1/subscriptions/' + data.id + '/cancel?isImmediateCancel='+true,{responseType:'json'});
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
    return this.http.get<any>('/processintelligence/v1/processgraph/categories')
  }
  getCategories():Observable<any>{
    return this.http.get<any>('processintelligence/v1/processgraph/categories', {responseType:"json"})
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

inviteUser(inviterMailId,payload) :Observable<any>{
  return this.http.post<any>('/api/user/inviteUsers?inviterMailId='+inviterMailId, payload,{ observe: 'response' })
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

modifyCoupon(modifycouponinput):Observable<any>{
  return this.http.post<any>('/subscriptionservice/v1/orders/updateCoupon',modifycouponinput,httpOptions)
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
 modifyAlert(alertmodifybody,useremail):Observable<any>{
  return this.http.post<any[]>('/notificationservice/api/v1/modifyalert?userId='+useremail,alertmodifybody,httpOptions)
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
getAllApplications(): Observable<any> {
  return this.http.get<any>('/authorizationservice/api/v1/user/getApplications');
}
getReadNotificaionCount(role,userId,id,notificationbody):Observable<any>{
  return this.http.post<any>('/notificationservice/api/v1/NotificationsCount?roles='+role+'&userId='+userId+'&id='+id,notificationbody,httpOptions);
}
getNotificationaInitialCount(role,userId,notificationbody):Observable<any>{
  return this.http.post<any>('/notificationservice/api/v1/NotificationsCountinitial?roles='+role+'&userId='+userId,notificationbody,httpOptions);
}
creatSecret( data,path) : Observable<any>{
  return this.http.post<any>('/api/vault/create-secret?secreteName='+path,data,httpOptions);
}
deleteSecret( data,path) : Observable<any>{
  return this.http.post<any>('/api/vault/delete-secrete?secreteName='+path,data,httpOptions);
}
getAllSecretKeys(): Observable<any> {
  return this.http.get<any>('/api/vault/get-all-secretekeys');
}
getEmailTemplates(): Observable<any> {
  return this.http.get<any>('/mailService/listmailTemplates');
}
saveTemplate(templateip:any): Observable<any>{
  return this.http.post<any>('/mailService/savemailtemplate', templateip,httpOptions)
}
deleteTemplate(temp:any): Observable<any>{
  return this.http.post<any>('/mailService/deleteTemplate',temp,httpOptions)
}
modifyTemplate(template:any): Observable<any>{
  return this.http.post<any>('/mailService/modifyTemplate', template,httpOptions)
}
getprocessnames(): Observable<any>{
  return this.http.get("/rpa-service/process-name");
  }
  getAllActiveBots(): Observable<any>{
     return this.http.get("/rpa-service/get-bots")
  }
  getCardsCount(): Observable<any>{
     return this.http.get("/subscriptionservice/v1/orders/getCardsCount")
  }
  getSubscribedProductsCount(): Observable<any>{
   return this.http.get("/subscriptionservice/v1/orders/getSubscribedProductsCount")
  }
  getUserRoleMetrics(tenantId): Observable<any>{
     return this.http.get("/api/user/getUserRoleMetrics/"+tenantId+"")
  }
  getVaultKeysCount(tenantId): Observable<any>{
       return this.http.get("/api/vault/get-keyscount/"+tenantId+"")
   }
  getAlertsActivityKPI(){
   return this.http.get("/alertConfigurationService/api/v1/AlertsActivityKPI")
  }
  getalertsCountBasedOnType(){
  return this.http.get("/alertConfigurationService/api/v1/alertsCountBasedOnType")
  }
  getUsersMetrics(tenantId){
    return this.http.get("/api/user/getUsersMetrics/"+tenantId+"")
  }
getVaultConfigurations(tenantId): Observable<any> {
  return this.http.get<any>('/api/vault/config/getInfo/'+tenantId);
}

updateVaultConfig( data) : Observable<any>{
  return this.http.post<any>('/api/vault/config/update',data,httpOptions);
}
 fetchAllProds(): Observable<any> {
  return this.http.get<any>('/api/vault/config/fetchAllProducts');
}

getmodulesbyProduct(prod): Observable<any> {
  return this.http.get<any>('/api/vault/config/fetchModulesBy/'+prod);
}

getpagesfromModule( data) : Observable<any>{
  return this.http.post<any>('/api/vault/config/fetchAllPages',data,httpOptions);
}
getFieldsfromPage( data) : Observable<any>{
  return this.http.post<any>('/api/vault/config/fetchAllFields',data,httpOptions);
}
saveVaultConfig( data) : Observable<any>{
  return this.http.post<any>('/api/vault/config/save',data,httpOptions);
}

deleteVaultConfig( data) : Observable<any>{
  return this.http.post<any>('/api/vault/config/delete',data,httpOptions);
}
getTenantCount(): Observable<any> {
  return this.http.get<any>('/api/tenant/tenants');
}
getTenantvsUser(): Observable<any> {
  return this.http.get<any>('/api/user/tenantAndUsers');
}
getvaultkeycount(): Observable<any> {
  return this.http.get<any>('/api/vault/get-keyscount');
}
getsubscriptionAndProducts(): Observable<any> {
  return this.http.get<any>('/subscriptionservice/v1/subscriptions/subscriptionAndProducts');
}
getSubscriptionsdetails(): Observable<any> {
  return this.http.get<any>('/subscriptionservice/v1/subscriptions/subscriptionPlans');
}
twoFactorConfig(twoFactorAuthBody:any, tenantId): Observable<any>{
  return this.http.post<any>('/api/user/twoFactorAuthConfig/'+tenantId, twoFactorAuthBody,httpOptions)
}
getTwoFactroConfig(userId:any): Observable<any>{
  return this.http.get<any>('/api/user/getTwoFactorAuthConfig/'+userId)
}
getCouponsCountKpi(): Observable<any>{
    return this.http.get<any>('/subscriptionservice/v1/orders/getKpiCouponsData?limit=0')
}
getRolesAndPermissionKpi(): Observable<any>{
  return this.http.get<any>('/api/user/roleAndPermission')
}
getalerttransactions(tenantid): Observable<any>{
  return this.http.get<any>('/alertConfigurationService/api/v1/allAlerts/'+tenantid)
}
createCategory(body:any): Observable<any>{
  return this.http.post<any>('/processintelligence/v1/processgraph/categories', body,httpOptions)
}
updateCategory(data:any): Observable<any>{
  return this.http.put<any>('/processintelligence/v1/processgraph/categories', data,httpOptions)
}
deleteCategory(data):Observable<any>{
  const httpOps = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
          }),
    body: data
  }
  return this.http.delete<any>('/processintelligence/v1/processgraph/categories',httpOps)
   
}
getSuperadminNotifications(): Observable<any>{
  return this.http.get<any>('/subscriptionservice/v1/subscriptions/listNotifications');
}
deletesuperadminNotifications(notificationid):Observable<any>{
  return this.http.delete<any>('/subscriptionservice/v1/subscriptions/deleteNotification?notificationId='+notificationid,{responseType:"json"})
}
}