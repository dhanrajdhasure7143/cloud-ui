import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/_services';
import { APP_CONFIG } from 'src/app/app.config';

@Component({
  selector: 'app-redirectsignout',
  templateUrl: './redirectsignout.component.html'
})
export class RedirectsignoutComponent {
  logintype: string;
  constructor(private route: Router, private appser: AppService, @Inject(APP_CONFIG) private config, private spinner: NgxSpinnerService) {
    this.spinner.show()

  }
  ngOnInit() {

    
    //localStorage.clear();
    //sessionStorage.clear();
    // this.appser.logout();
    this.logout();
    this.spinner.hide();
    this.route.navigate(['/user']);
  }

  ngDestroy() {
    this.spinner.hide();
  }
  logout() {
  
    this.logintype = localStorage.getItem('loginType');


    if (this.logintype == 'Azure') {

      window.location.href = 'https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=' + this.config.socialLoginRedirectURL
      localStorage.clear();
      sessionStorage.clear();
      
    } else {
      localStorage.clear();
      sessionStorage.clear();
    
    }
    this.appser.logout();
    
  }
}