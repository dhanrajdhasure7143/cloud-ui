import { ContentfulConfig } from './../../contentful/models/contentful-config';
import { ContentfulConfigService } from './../../contentful/services/contentful-config.service';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject, AfterViewInit, HostListener } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_services';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { subscribeOn } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
   lastname: string='';
   firstname: string='';
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
  isvaultMangment: boolean;
  customUserRole: any;
  userManagementEnabled: boolean = false;
  inviteUserEnabled: boolean = false;
  configurationEnabled: boolean = false;

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
    this.profileService.getCustomUserRole(2).subscribe(role=>{

      this.customUserRole=role.message[0].permission;
      this.customUserRole.forEach(element => {
        if(element.permissionName.includes('UserManagement_Users_Full') || element.permissionName.includes('UserManagement_Roles_Full') || element.permissionName.includes('UserManagement_Departments_Full')){
          this.userManagementEnabled = true;
        }else if(element.permissionName.includes('InviteUser_Full')){
         this.inviteUserEnabled = true;
        }else if(element.permissionName.includes('Configuration_Alerts_Full') || element.permissionName.includes('Configuration_EmailTemplates_Full') || element.permissionName.includes('Configuration_SecureVault_Full') || element.permissionName.includes('Configuration_TwoFactor_Full')){
         this.configurationEnabled = true;
        }

      });
     
    })

   
    
    

    // this.sharedService.getLoggedinUserData().subscribe(data=>{this.mydata=data
    
    // });
 
    this.spinner.show();
    setTimeout(() => {
      this.getImage();
      // this.getAllNotifications();
    },500);
        
        setTimeout(() => {
          this.spinner.hide();
          this.profileName();
        }, 5000);
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
    
    if(this.logintype == 'Azure'){
      
      window.location.href = 'https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri='+this.config.socialLoginRedirectURL
      this.route.navigate(['/']);
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
    this.isvaultMangment=false;
    this.isCoupon=false;
    this.isnotification=false;
  }
  vaultManagement(){
    document.getElementById("foot").classList.remove("slide-down");
    document.getElementById("foot").classList.add("slide-up");
    this.isvaultMangment=true;
    this.isCoupon=false;
    this.isAlerts=false;
    this.isusers=false;  
    this.isInvite=false;
    this.isMyaccount=false;
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
    this.isvaultMangment=false;
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
    this.isvaultMangment=false;
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
    this.isvaultMangment=false;
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
    this.isvaultMangment=false;
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
    this.isvaultMangment=false;
  }

  profileName(){
    this.firstname=localStorage.getItem('firstName');
      this.lastname=localStorage.getItem('lastName');
      var firstnameFirstLetter=this.firstname.charAt(0)
      var lastnameFirstLetter=this.lastname.charAt(0)
      this.firstletter=firstnameFirstLetter+lastnameFirstLetter
      
  }

  getImage() {
    
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
            // this.getAllNotifications();
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
         
          this.profileService.getNotificationaInitialCount(this.role,userId,notificationbody).subscribe(data => {
            this.notificationList = data
            this.notificationscount=this.notificationList
          
            if(this.notificationscount==undefined||this.notificationscount==null)
            {
              this.notificationscount=0;
            }
           // console.log("count",this.notificationList.length)
          })
          this.getCount();
        
      }
}
