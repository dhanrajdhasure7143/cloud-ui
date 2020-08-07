import { ContentfulConfig } from './../../contentful/models/contentful-config';
import { ContentfulConfigService } from './../../contentful/services/contentful-config.service';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject, AfterViewInit } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
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
   public isAlerts:boolean=false;
   public isMyaccount:boolean=false;
   public isusers:boolean=false;
   public mydata:any[];
   public isnotification:boolean=false;
   lastname: string;
   firstname: string;
  userRole: any = [];
  isCoupon: boolean=false;
  firstletter: string;
  decodedInput: any = {};

  constructor(@Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig, 
                                               private route: Router,
                                               private router: ActivatedRoute, 
                                               private profileService:ProfileService,
                                               private appser: AppService, private sharedService :  SharedDataService) { 

                                                this.router.queryParams.subscribe(params => {
                                                  if(params['input'] != undefined){
                                                    var input=params['input']
                                                 
                                                   
                                                    this.decodedInput = atob(input);
                                                   
                                                    
                                                }
                                               });
                                              }
public myname:any[]
  ngOnInit() {
    this.profileService.getUserRole(2).subscribe(role=>{
      this.userRole=role.message;
     
    })   
    if(this.decodedInput === 'myAccount'){
      console.log("entered into myAccount", this.decodedInput);
      
      this.accountSlideup()

    }else if(this.decodedInput === 'Signout'){
                                                            
      this.logout()
    }else if(this.decodedInput === 'invite'){
    this.inviteSlideup()

  }else if(this.decodedInput === 'userManagement'){
    this.usermanagementslideUp()
  }else if(this.decodedInput === 'alertsConfig'){
    this.alertsSlideup()
  }
    
    

    // this.sharedService.getLoggedinUserData().subscribe(data=>{this.mydata=data
    
    // });
    setTimeout(() => {
      this.profileName();
      }, 10);
  }

  accountSlideupTest(){
    
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isInvite=false;
    this.isAlerts=false;
    this.isMyaccount=true;
    this.isusers=false;
    this.isCoupon=false;
    this.isnotification=false;
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
    this.isAlerts=false;
    this.isMyaccount=true;
    this.isusers=false;
    this.isCoupon=false;
    this.isnotification=false;
  }

  inviteSlideup(){
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isInvite=true;
    this.isAlerts=false;
    this.isMyaccount=false;
    this.isusers=false;
    this.isnotification=false;
    this.isCoupon=false;
  }

  alertsSlideup()
    {
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isAlerts=true;
    this.isInvite=false;
    this.isMyaccount=false;
    this.isusers=false;
    this.isnotification=false;
   }

  inviteSlideDown(){
    document.getElementById("foot").classList.add("slide-down");
    document.getElementById("foot").classList.remove("slide-up");
  }

  usermanagementslideUp(){
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isusers=true;  
    this.isAlerts=false;
    this.isInvite=false;
    this.isMyaccount=false;
    this.isnotification=false;
    this.isCoupon=false;
  }
  couponSlideup(){
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isCoupon=true;
    this.isAlerts=false;
    this.isusers=false;  
    this.isInvite=false;
    this.isMyaccount=false;
    this.isnotification=false;
  }
  seeNotifications(){
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isnotification=true;
    this.isAlerts=false;
    this.isInvite=false;
    this.isMyaccount=false;
    this.isCoupon=false;
    this.isusers=false;
  }

  profileName(){
    this.firstname=localStorage.getItem('firstName');
      this.lastname=localStorage.getItem('lastName');
      var firstnameFirstLetter=this.firstname.charAt(0)
      var lastnameFirstLetter=this.lastname.charAt(0)
      this.firstletter=firstnameFirstLetter+lastnameFirstLetter
      
  }
}
