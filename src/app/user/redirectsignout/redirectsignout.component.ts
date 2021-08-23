import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/_services';

@Component({
    selector: 'app-redirectsignout',
    templateUrl: './redirectsignout.component.html'
})
export class RedirectsignoutComponent{
  constructor(private route:Router,private appser: AppService,private spinner:NgxSpinnerService) { 
    this.spinner.show()
    localStorage.clear();
    sessionStorage.clear();
    this.appser.logout();
    this.route.navigate(['/user']);
  }
  ngOnInit() {
    
  }

  ngDestroy(){
    this.spinner.hide();
  }
}