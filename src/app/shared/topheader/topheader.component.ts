import { ContentfulConfig } from './../../contentful/models/contentful-config';
import { ContentfulConfigService } from './../../contentful/services/contentful-config.service';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject, AfterViewInit } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AppService } from 'src/app/_services';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { subscribeOn } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SELECT_VALUE_ACCESSOR } from '@angular/forms/src/directives/select_control_value_accessor';
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.scss']
})
export class TopheaderComponent implements OnInit {

   public isInvite=false;
   public isMyaccount:boolean=false;
   public isusers:boolean=false;
   public mydata:any[];
   public isnotification:boolean=false;
  userRole: any;
  isCoupon: boolean=false;

  constructor(@Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig, 
                                               private route: Router, 
                                               private profileService:ProfileService,
                                               private appser: AppService, private sharedService :  SharedDataService) { }
public myname:any[]
  ngOnInit() {
    this.profileService.getUserRole(2).subscribe(role=>{
      this.userRole=role.message;
     
    })   
    // this.sharedService.getLoggedinUserData().subscribe(data=>{this.mydata=data
    
    // });
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigate(['/']);
    this.appser.logout();
  }

  myFunction() {   
               
    document.getElementById("myDropdown").classList.toggle("show");
    // document.getElementById("notificationBar").classList.remove('notificationBarshow');
  }

  accountSlideup(){
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isInvite=false;
    this.isMyaccount=true;
    this.isusers=false;
    this.isCoupon=false;
    this.isnotification=false;
  }

  inviteSlideup(){
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isInvite=true;
    this.isMyaccount=false;
    this.isusers=false;
    this.isnotification=false;
    this.isCoupon=false;
  }

  inviteSlideDown(){
    document.getElementById("foot").classList.add("slide-down");
    document.getElementById("foot").classList.remove("slide-up");
  }

  usermanagementslideUp(){
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isusers=true;  
    this.isInvite=false;
    this.isMyaccount=false;
    this.isnotification=false;
    this.isCoupon=false;
  }
  couponSlideup(){
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isCoupon=true;
    this.isusers=false;  
    this.isInvite=false;
    this.isMyaccount=false;
    this.isnotification=false;
  }
  seeNotifications(){
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isnotification=true;
    this.isInvite=false;
    this.isMyaccount=false;
    this.isCoupon=false;
    this.isusers=false;
  }
}
