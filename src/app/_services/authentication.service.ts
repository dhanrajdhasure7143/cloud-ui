import { AppService } from './app.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import Swal from 'sweetalert2'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
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
}
