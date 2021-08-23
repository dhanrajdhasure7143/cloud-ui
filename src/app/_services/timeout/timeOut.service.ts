import { UserIdleService } from 'angular-user-idle';
import { AppService, AuthenticationService } from '../';
import { Observable, Scheduler } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class TimeOutService implements OnInit {
    rx: Scheduler;
    isWatching = false;
    isTimer = false;
    _isLogedIn: Observable<boolean>;
    constructor(private userIdle: UserIdleService,
        private router: Router,
        private appservice: AppService,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
    }

    stopWatching() {
        this.userIdle.stopWatching();
    }

    startWatching() {
        this._isLogedIn = this.authService.isLoggedIn;
        if ((this._isLogedIn)) {
            this.userIdle.startWatching();
            this.userIdle.onTimerStart().subscribe(count => {});
            this.userIdle.onTimeout().subscribe(() => {
                this.onLogout();
                this.stopWatching();
            });
        }
    }
    onReset() {
        this.userIdle.resetTimer();
    }

    onLogout() {
        this.appservice.logout();
        this.stopWatching();
        this.isWatching = false;
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['home/user/login']);
    }
}
