import { UserIdleService, UserIdleConfig } from 'angular-user-idle';
import { AppService, AuthenticationService } from '../';
import { Observable, Scheduler, Subject, Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { takeUntil, take } from 'rxjs/operators';
import { TimeOutService } from '../timeout/timeOut.service';

@Injectable({
    providedIn: 'root'
})
export class SessionService implements OnInit {

  tokenExpireConfig: UserIdleConfig = new UserIdleConfig();

  unsubscribe$: Subject<void> = new Subject();
  timerSubscription: Subscription;

  constructor(private userIdle: UserIdleService, private authService: AuthenticationService, private timeOutService: TimeOutService) { }

  ngOnInit() {
    // this.authService.tokenActionOccured.pipe(
    //   takeUntil(this.unsubscribe$)
    // ).subscribe(() => {
    //   if (this.timerSubscription) {
    //     this.timerSubscription.unsubscribe();
    //   }
    // });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  startWatching() {
    this.tokenExpireConfig.idle = 0;
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.tokenExpireConfig.timeout = currentUser.expires_in;
    this.userIdle.setConfigValues(this.tokenExpireConfig);
    this.timeOutService.startWatching();
  }

  stopWatching() {
    this.timeOutService.stopWatching();
  }

}
