import { ContentfulService } from './../contentful/services/contentful.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionService } from './session/';
import { CookieStore } from './cookie.store';
import { APP_CONFIG } from './../app.config';
import { Inject } from '@angular/core';
import { IpServiceService } from './ip-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  public triggered = new BehaviorSubject<boolean>(true);
  public homeRef = new BehaviorSubject<String>('');
  public _userActionOccured: Subject<void> = new Subject(); 
  public ipAddress:string; 
  public deviceInfo = null;

  constructor(private http: HttpClient, private router: Router, private content: ContentfulService, @Inject(APP_CONFIG) private config, private ip:IpServiceService, private deviceService: DeviceDetectorService) {
   this.getIP();
  }

  getIP()
  {
    this.ip.getIPAddress().then(res => { 

        var obj = JSON.parse(JSON.stringify(res));
        this.ipAddress = obj.ip;
      });
     
   }
  

  login(username: string, password: string) {

  let headers = {};
  let url = `/api/login/beta/accessToken`;
  let isSecurityManagerEnabled = this.config.isSecurityManagerEnabled;

  if(isSecurityManagerEnabled){
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if(this.ipAddress == undefined)
     this.ipAddress = '192.168.0.1';
    headers = { 'device-info': this.deviceInfo.userAgent, 'ip-address': this.ipAddress, 'device-type' : 'W' }
   }
  
  if(isSecurityManagerEnabled){url = `/Idm/accessToken`;}

    return this.http.post<any>(url, { 'userId' : username, 'password' : password }, {headers})
        .pipe(map(user => {

            if(isSecurityManagerEnabled){
              localStorage.setItem('currentUser', JSON.stringify(user.resp_data));
              CookieStore.set('token', user.resp_data.accessToken, {});
            }
            else{
              localStorage.setItem('currentUser', JSON.stringify(user));
              CookieStore.set('token', user.accessToken, {});
            }
            this.setProperties();
            return user;
        }));
  }

  logout() {
    this.loggedIn.next(false);
    this.triggered.next(true);
    this.homeRef.next('');
    localStorage.clear();
    sessionStorage.clear();
  }

  loadUserSharedData(): Observable<any> {
    return this.content.getUserSharedData();
  }

  get isLoggedIn(): Observable<Boolean> {
    return this.loggedIn.asObservable();
  }

  get isTriggered(): Observable<Boolean> {
    return this.triggered.asObservable();
  }

  get getHomeRef(): Observable<String> {
    return this.homeRef.asObservable();
  }

  get userActionOccured(): Observable<void> {
    return this._userActionOccured.asObservable();
  }

  setProperties() {
    this.loggedIn.next(true);
    this.triggered.next(false);
    this.homeRef.next('/pages');
  }

  notifyUserAction() {
    this._userActionOccured.next();
  }

  loginRoute() {
    this.router.navigate(['/']);
  }

  clearToken(): Observable<any> {
    return this.http.get<any>(`/rest/api/logout`);
  }
  getTokenForSocial(): Observable<any> {
    return this.http.get<any>(`/rest/api/logout`);
  }
  invitefriends(inviterMailId, inviteeMailId,data){
    console.log('data', inviterMailId, inviteeMailId);
    let url = '/api/user/inviteUsers?inviterMailId='+inviterMailId+'&inviteeMailId='+inviteeMailId;
    return this.http.post<any>(url,data)
    }
  
}
