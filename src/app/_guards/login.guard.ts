import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthenticationService, AppService } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthenticationService, 
              private appService: AppService, 
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.appService.loggedIn.next(true);
    } else {
      this.appService.loggedIn.next(false);
    }
    return this.authService.isLoggedIn
      .pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (isLoggedIn) {
            //this.router.navigate(['/activation']);
            return false;
          } else {
            return true;
          }
        })
      );
  }
}
