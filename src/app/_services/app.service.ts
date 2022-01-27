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
import { CryptoService } from './crypto.service';

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
  private spacialSymbolEncryption:string = '->^<-';
  agent: string;

  constructor(private http: HttpClient, 
    private router: Router, 
    private content: ContentfulService, 
    @Inject(APP_CONFIG) private config, 
    private ip:IpServiceService, 
    private deviceService: DeviceDetectorService,
    private cryptoService: CryptoService) {
  //  this.getIP();
  }

  getIP()
  {
    this.ip.getIPAddress().then(res => { 

        var obj = JSON.parse(JSON.stringify(res));
        this.ipAddress = obj.ip;
        localStorage.setItem('ipAddress', this.ipAddress);
      });
     
   }
  

  login(username: string, password: string) {
    this.getIP();
  let headers = {};
  let url = `/api/login/beta/accessToken`;
  const browser=this.getBrowserName();
  let isSecurityManagerEnabled = this.config.isSecurityManagerEnabled;

  if(isSecurityManagerEnabled){
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if(this.ipAddress == undefined)
     this.ipAddress = '0.0.0.1';
    headers = { 'device-info': this.deviceInfo.userAgent, 'ip-address': this.ipAddress, 'device-type' : 'W',
  'browser': browser}
    // localStorage.setItem('ipAddress', this.ipAddress);
   }
  
  if(isSecurityManagerEnabled){url = `/Idm/accessToken`;}
  //headers = { 'content-type': 'application/json, text/plan'}
  let reqObj = { 'userId' : username, 'password' : password }
  let encrypt = this.spacialSymbolEncryption + this.cryptoService.encrypt(JSON.stringify(reqObj));
    return this.http.post<any>(url, {"enc":encrypt}, {headers})
        .pipe(map(user => {

            if(isSecurityManagerEnabled){
              if(user.resp_data.accessToken){
                              localStorage.setItem('currentUser', JSON.stringify(user.resp_data));
              CookieStore.set('token', user.resp_data.accessToken, {});
              }
            }
            else{
              if(user.accessToken){
              localStorage.setItem('currentUser', JSON.stringify(user));
              CookieStore.set('token', user.accessToken, {});
              }
            }
            this.setProperties();
            return user;
        }));
  }
  public getBrowserName() {
    this.agent = window.navigator.userAgent.toLowerCase()
  
    switch (true) {
      case this.agent.indexOf('edge') > -1:
                return 'edge';
      case this.agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case this.agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
          return 'chrome';
      case this.agent.indexOf('trident') > -1:
        return 'ie';
      case this.agent.indexOf('firefox') > -1:
        return 'firefox';
      case this.agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
    
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
  updateUser(user: any): Observable<any> {
    return this.http.post<any>(`/api/user/updateUserDetails`, user);

  }
  invitefriends(inviterMailId, inviteeMailId,data){
 
    let url = '/api/user/inviteUsers?inviterMailId='+inviterMailId+'&inviteeMailId='+inviteeMailId;
    return this.http.post<any>(url,data)
    }

    socialLogin(username: string) {

      let headers = {};
      let url = `/api/login/beta/token`;
      const browser=this.getBrowserName();
      let isSecurityManagerEnabled = this.config.isSecurityManagerEnabled;
    
      if(isSecurityManagerEnabled){
        this.deviceInfo = this.deviceService.getDeviceInfo();
        if(this.ipAddress == undefined)
         this.ipAddress = '192.168.0.1';
        headers = { 'device-info': this.deviceInfo.userAgent, 'ip-address': this.ipAddress, 'device-type' : 'W',
      'browser': browser}
        localStorage.setItem('ipAddress', this.ipAddress);
       }
      
      if(isSecurityManagerEnabled){url = `/Idm/token`;}
    
        return this.http.post<any>(url, { 'userId' : username}, {headers})
            .pipe(map(user => {
    
                if(isSecurityManagerEnabled){
                  if(user.resp_data.accessToken){
                                  localStorage.setItem('currentUser', JSON.stringify(user.resp_data));
                  CookieStore.set('token', user.resp_data.accessToken, {});
                  }
                }
                else{
                  if(user.accessToken){
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  CookieStore.set('token', user.accessToken, {});
                  }
                }
                this.setProperties();
                return user;
            }));
      }
      //validate token case for social login in node security
      socialLoginValidateToken(username: string) {

        let headers = {};
        let url = `/api/login/beta/token`;
        const browser=this.getBrowserName();
        let isSecurityManagerEnabled = this.config.isSecurityManagerEnabled;
      
        if(isSecurityManagerEnabled){
          this.deviceInfo = this.deviceService.getDeviceInfo();
          if(this.ipAddress == undefined)
           this.ipAddress = '192.168.0.1';
          headers = { 'device-info': this.deviceInfo.userAgent, 'ip-address': this.ipAddress, 'device-type' : 'W',
        'browser': browser}
          localStorage.setItem('ipAddress', this.ipAddress);
         }
        
        if(isSecurityManagerEnabled){url = `Idm/social_login_gen_token`;}
      
          return this.http.post<any>(url, { 'userId' : username}, {headers})
              .pipe(map(user => {
      
                  if(isSecurityManagerEnabled){
                    if(user.resp_data.accessToken){
                                    localStorage.setItem('currentUser', JSON.stringify(user.resp_data));
                    CookieStore.set('token', user.resp_data.accessToken, {});
                    }
                  }
                  else{
                    if(user.accessToken){
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    CookieStore.set('token', user.accessToken, {});
                    }
                  }
                  this.setProperties();
                  return user;
              }));
        }
  
}
