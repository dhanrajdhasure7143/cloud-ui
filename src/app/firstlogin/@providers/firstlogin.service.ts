
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ContentfulService } from './../../contentful/services/contentful.service';
import { User } from './../../_models/user';


@Injectable({
  providedIn: 'root'
})
export class FirstloginService {
 

  constructor(private http: HttpClient, private router: Router, private content: ContentfulService) { }

  registerUser(payload): Observable<any> { 
    let headers = new HttpHeaders({
      "repayment": 'true'
    });
    return this.http.post<any>(`/api/user/registrationcomplete`, payload,{ headers:headers,observe: 'response' });
  }
  verifyToken(token: any): Observable<any> {
    return this.http.get<any>(`/api/user/registrationConfirm?token=${token}`);
  }
  getAllDepartments(): Observable<any> {
    return this.http.get<any>(`/api/user/departments`);
  }
  getAllCategories(domain): Observable<any> {
    const httpOps = {
      headers: new HttpHeaders({
        'domain': domain
            })
          }
    return this.http.get<any>('/processintelligence/v1/processgraph/categories/domain',httpOps);
  }
  listofsubscriptions() : Observable<any> {
    return this.http.get<any>('/subscriptionservice/v1/subscriptions');
  }
  listofinvoices() : Observable<any> {
    return this.http.get<any>('/subscriptionservice/v1/invoices')
  }

  allCountries(): Observable<any>{
    return this.http.get<any>(`/cloud-ui/src/assets/jsons/countries.json`);  
  }
// test
  updateUser(user: any): Observable<any> {
    return this.http.post<any>(`/api/user/updateUserDetails`, user);

  }
  // readuser(){
  //   return this.http.get()
  // }
  verifyInvitee(inviteId: any): Observable<any> {
    return this.http.get<any>(`/api/user/invitationConfirm?inviteId=${inviteId}`);
  }
  getSuperAdminData():Observable<any>{
    return this.http.get<any>('/subscriptionservice/v1/subscriptions/allTenants')
  }

  organizationCheck(orgName: string): Observable<any> {
    return this.http.get<any>(`/api/user/checkOrganizationExists?orgName=`+orgName);
  }

  registrationContinue(payload){
    let headers = new HttpHeaders({});
    return this.http.post<any>('/api/user/registration-continue', payload,{ headers:headers,observe: 'response' })
  }

  loadPredefinedBots(): Observable<any>{
    return this.http.get<any>("/subscriptionservice/v1/stripe/load-predefined-bots")
  }

  registrationStart(payload){
    let headers = new HttpHeaders({});
    return this.http.post<any>('/api/user/registration-start', payload,{ headers:headers,observe: 'response' })
  }
  
  sendEmailEntrepricePlan(userId:string){
    let headers = new HttpHeaders({});
    return this.http.post<any>('/api/user/enterprisePlan/'+userId,{ headers:headers,observe: 'response' })
  }

  getPlanDetails(): Observable<any>{
    return this.http.get<any>(`/api/user/loadPredefinedBotPlans`);
  }

  getCheckoutScreen(body){
    return this.http.post("/subscriptionservice/v1/stripe/create-checkout-session",body)
  }

  registrationComplete(id:any){
    return this.http.post('/api/user/complete_user_registration/'+id,{});
  }

  insertCustomerSubscription(userEmail: string, tenantId: string) {
    return this.http.post(`/subscriptionservice/v1/stripe/insert-customer-subscriptions?userId=${userEmail}&tenantId=${tenantId}`, {});
  }
  
}
