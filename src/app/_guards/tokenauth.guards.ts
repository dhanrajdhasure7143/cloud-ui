import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      // Access token exists, allow navigation
      return true;
    } else {
      // Access token does not exist, redirect to login page
      this.router.navigate(['/user']);
      return false;
    }
  }
}
