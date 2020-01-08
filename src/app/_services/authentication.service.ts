import { AppService } from './app.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
        })
};
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private apiData = new BehaviorSubject<any>(null);
   public apiData$ = this.apiData.asObservable();
   
    constructor(private http: HttpClient, private appService: AppService) { }

    login(username: string, password: string) {
      return this.appService.login(username, password);
    }

    logout() {
      return this.appService.logout();
    }

    loginExpired() {
      // swal(
      //   'Error!',
      //   'Your login session expired!',
      //   'error'
      // ).then((value) => {
      //   this.appService.loginRoute();
      //   location.reload();
      // });
      this.appService.loginRoute();
      location.reload();
    }

    backendServerDown() {
      // swal(
      //   'Application Error!',
      //   'Contact your adminstartor!',
      //   'error'
      // ).then((value) => {
      //   this.appService.loginRoute();
      //   location.reload();
      // });
      this.appService.loginRoute();
      location.reload();
    }

    forbiddenAccess() {
      // swal(
      //   'Authentication Error!',
      //   'Contact your adminstartor! Your account is temporarily locked!! ',
      //   'error'
      // ).then((value) => {
      //   this.appService.loginRoute();
      //   location.reload();
      // });

      this.appService.loginRoute();
      location.reload();
    }

    get isLoggedIn() {
      return this.appService.loggedIn;
    }

    get isTriggered() {
      return this.appService.triggered;
    }

    get getHomeRef() {
      return this.appService.homeRef;
    }
    userDetails(username: string): Observable<any[]> {
      
      return this.http.get<any[]>('/api/user/details?userId='+username, httpOptions);
     
    }
}
