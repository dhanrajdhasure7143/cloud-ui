import { take, map } from 'rxjs/operators';
import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private appService: AppService, private router: Router) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> {
      return this.authService.isLoggedIn
        .pipe(
          take(1),
          map((isLoggedIn: boolean) => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
              this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
              return false;
            } else {
              this.appService.setProperties();
            }
            return true;
          })
        );
    }
}
