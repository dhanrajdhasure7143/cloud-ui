import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticationService, AppService } from 'src/app/_services';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { CookieStore } from 'src/app/_services/cookie.store';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {
  email: any;
  authProvider: any;
  userRole: any = [];
  error = '';
  loading = false;
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              // private acsnapshot: ActivatedRouteSnapshot,
              private authenticationService: AuthenticationService, 
              private appService: AppService, 
              private profileService: ProfileService,
              private sharedData: SharedDataService) { }

  ngOnInit() {
     localStorage.clear();
     this.route.queryParams.subscribe(params => {
      this.email = params['email']
      this.authProvider = params['authProvider']

    });

   
    this.authenticate(this.email);
    localStorage.setItem('ProfileuserId',this.email)
     localStorage.setItem('loginType', this.authProvider)
 
   
}
 
// }
 authenticate(userId) {
   let userName = {
     "userId" : userId
   }
  this.appService.socialLogin(userId).subscribe(user => {
    
    
    //localStorage.setItem('currentUser',JSON.stringify({"token":data}))
    //localStorage.setItem('currentUser', JSON.stringify(user.resp_data));
      //        CookieStore.set('token', user.resp_data.accessToken, {});
 // this.router.navigate(['/activation']);
 this.authenticationService.userDetails(this.email).subscribe(data => this.checkSuccessCallback(data));
 this.authorize();

  });
  //localStorage.setItem('currentUser',JSON.stringify({"token":"hiiiiiiiiiii"}))
  //this.router.navigate(['/activation']);
}
 
checkSuccessCallback(data:any){
  
  this.sharedData.setLoggedinUserData(data);
 // this.sharedData.setLoggedinUserFirstLetter(data.firstName.split("")[0])

  localStorage.setItem('firstName',data.firstName);
  localStorage.setItem('lastName',data.lastName);
  localStorage.setItem('userName',data.userId);
  localStorage.setItem('tenantName',data.tenantID);
  localStorage.setItem('phoneNumber',data.phoneNumber);
 localStorage.setItem('company', data.company);
  localStorage.setItem('designation',data.designation);
  localStorage.setItem('country',data.country);
 
//   this.authenticate();
}
authorize() {
  this.profileService.getUserRole(2).subscribe(res=>{
    this.userRole=res.message;
     localStorage.setItem('userRole',this.userRole);
   if(this.userRole.includes('SuperAdmin')){
    this.router.navigate(['/superadmin']);
    
   }else{
    this.router.navigate(['/activation']);
   }
  },error => {
    this.error = "Please complete your registration process";
    this.loading = false;
  })
}

}

