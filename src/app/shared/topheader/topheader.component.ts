import { ContentfulConfig } from './../../contentful/models/contentful-config';
import { ContentfulConfigService } from './../../contentful/services/contentful-config.service';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject, AfterViewInit, HostListener } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_services';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { subscribeOn } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SELECT_VALUE_ACCESSOR } from '@angular/forms/src/directives/select_control_value_accessor';
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { ProfileService } from 'src/app/_services/profile.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ProfileComponent } from '../profile/profile.component';
import { APP_CONFIG } from 'src/app/app.config';

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
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  public profilePicture:boolean=false;
  tenantId: string;
  role: string;
  public notificationList: any;
  notificationscount: any;
  public stopnotificationsapicall:any

  @ViewChild("toogleBtn") toogleBtn;
  logintype: string;
  constructor(@Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig, 
                                               private route: Router,
                                               private router: ActivatedRoute, 
                                               private profileService:ProfileService,
                                               @Inject(APP_CONFIG) private config,
                                               private appser: AppService, private sharedService :  SharedDataService,
                                               private spinner:NgxSpinnerService) { 

                                                this.router.queryParams.subscribe(params => {
                                                  if(params['input'] != undefined){
                                                    var input=params['input']
                                                 
                                                   
                                                    this.decodedInput = atob(input);
                                                    
                                                   
                                                    
                                                }
                                               });
                                              }
public myname:any[]
@HostListener('document:click', ['$event.target']) // spinner overlay hide on out side click
 public onClick(targetElement) {
   
   
 const clickedInside = this.toogleBtn.nativeElement.contains(targetElement);

 
 if (!clickedInside) {
  document.getElementById("myDropdown").classList.remove("show");
 
 }else{

 }
 }
  ngOnInit() {
    if(this.decodedInput == 'myAccount'){
      console.log("entered into myAccount", this.decodedInput);
      
      
      this.accountSlideup()

    }else if(this.decodedInput == 'Signout'){
                                                            
      this.logout()
    }else if(this.decodedInput == 'invite'){
    this.inviteSlideup()

  }else if(this.decodedInput == 'userManagement'){
    this.usermanagementslideUp()
  }else if(this.decodedInput == 'alertsConfig'){
    this.alertsSlideup()
  }
    this.profileService.getUserRole(2).subscribe(role=>{
      this.userRole=role.message;
     
    })   
   
    
    

    // this.sharedService.getLoggedinUserData().subscribe(data=>{this.mydata=data
    
    // });
    setTimeout(() => {
      this.getAllNotifications();
    }, 500);

    this.spinner.show();
    setTimeout(() => {
      this.getImage();
        },500);
        
        setTimeout(() => {
          this.spinner.hide();
        }, 700);
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
    this.logintype = localStorage.getItem('loginType');
    clearTimeout(this.stopnotificationsapicall)
    localStorage.clear();
    sessionStorage.clear();
    
    console.log('came to logout', this.logintype)

    if(this.logintype == 'Azure'){
      
      window.location.href = 'https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri='+this.config.socialLoginRedirectURL

    }else{
      this.route.navigate(['/']);
 }

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
    console.log("came to profile icon");
    
    this.firstname=localStorage.getItem('firstName');
      this.lastname=localStorage.getItem('lastName');
      var firstnameFirstLetter=this.firstname.charAt(0)
      var lastnameFirstLetter=this.lastname.charAt(0)
      this.firstletter=firstnameFirstLetter+lastnameFirstLetter
      
  }

  getImage() {
    console.log("inside image")
      const userid=localStorage.getItem('ProfileuserId');
          this.profileService.getUserDetails(userid).subscribe(res => {
                this.retrieveResonse = res;
                if(this.retrieveResonse.image==null||this.retrieveResonse.image==""){
                 this.profileName();
                  this.profilePicture=false;
                }
                else{
                  this.profilePicture=true;
                }
                this.base64Data= this.retrieveResonse.image;
               // console.log("image",this.base64Data);
               // localStorage.setItem('image', this.base64Data);
                this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
               // console.log(this.retrievedImage);
              }
            );
        }

        getCount(){
          let userId =  localStorage.getItem("userName")
          this.stopnotificationsapicall=setTimeout(() => {
            if(this.role!=null&&userId!=null){
            this.getAllNotifications();
            }
          }, 20000);
        }
        getAllNotifications() {
          let userId =  localStorage.getItem("userName")
          this.tenantId=localStorage.getItem('tenantName');
          this.role=localStorage.getItem('userRole')
        let notificationbody ={
            "tenantId":this.tenantId
         }
          this.profileService.getNotifications(this.role,userId,notificationbody).subscribe(data => {
            this.notificationList = data
            this.notificationscount=this.notificationList.length
            if(this.notificationscount==undefined||this.notificationscount==null)
            {
              this.notificationscount=0;
            }
           // console.log("count",this.notificationList.length)
          })
          this.getCount();
        }
}
