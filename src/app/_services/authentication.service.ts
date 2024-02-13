import { AppService } from './app.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'timezone':'Asia/Calcutta'
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
    userDetails(username: string) {
         
      return this.http.get('/api/user/details?userId='+username,httpOptions);
    }
    generateOTP(username: string) {
         
      return this.http.get('/api/login/beta/generateOTP?userId='+username ,{responseType:'json'});
    }
    validateOTP(username: string, otp: string) {
         
      return this.http.get('/api/login/beta/validateOTP?userId='+username+"&otp="+otp,{responseType:'json'});
    }
    getToken(userName: any): Observable<any>{
      return this.http.post<any>('/api/login/beta/token', userName,httpOptions)

    }
    generateOTPSignUp(username: string) {
         
      return this.http.get('/api/login/beta/generateOTP?userId='+username+"&isNewRegistrationFlow="+true,{responseType:'json'});
    }
}
