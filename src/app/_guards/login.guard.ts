import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthenticationService, AppService } from '../_services';
import { ProfileService } from '../_services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthenticationService, 
              private appService: AppService, 
              private router: Router,
              private service : ProfileService) { }

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
          this.service.getUserRole(2).subscribe(res => {
            if(res.message =="Platform Admin"){
              this.router.navigate(['/superadmin']);
            }else{
              this.router.navigate(['/active']);
            }
          },err=>{
            this.router.navigate(['/user']);
          });
            return false;
          } else {
            return true;
          }
        })
      );
  }
}
