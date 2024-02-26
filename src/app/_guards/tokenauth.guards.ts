import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userRole = localStorage.getItem("userRole")

    if (currentUser) {
      // Access token exists, allow navigation
      if(userRole == "Platform Admin")
      return true;
    } else {
      // Access token does not exist, redirect to login page
      this.router.navigate(['/user']);
      return false;
    }
  }
}
