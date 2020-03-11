import { ContentfulService } from './../contentful/services/contentful.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionService } from './session/';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  public triggered = new BehaviorSubject<boolean>(true);
  public homeRef = new BehaviorSubject<String>('');
  public _userActionOccured: Subject<void> = new Subject();

  constructor(private http: HttpClient, private router: Router, private content: ContentfulService) { }

  login(username: string, password: string) {
    return this.http.post<any>(`/api/login/beta/accessToken`, { 'userId' : username, 'password' : password })
        .pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
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
