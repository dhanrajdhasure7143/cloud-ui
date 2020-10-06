import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticationService, AppService } from 'src/app/_services';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { CookieStore } from 'src/app/_services/cookie.store';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {
  email: any;
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              // private acsnapshot: ActivatedRouteSnapshot,
              private authenticationService: AuthenticationService, 
              private appService: AppService, 
              private sharedData: SharedDataService) { }

  ngOnInit() {
     localStorage.clear();
     this.route.queryParams.subscribe(params => {
      this.email = params['email']
      console.log("email" , this.email)
    });

   

    
    this.authenticationService.userDetails(this.email).subscribe(data => this.checkSuccessCallback(data));
    
    
   
}
checkSuccessCallback(data:any){
  console.log("i cam to success call back");
  
  this.sharedData.setLoggedinUserData(data.firstName);
  this.sharedData.setLoggedinUserFirstLetter(data.firstName.split("")[0])
  console.log("social login data-----", data);
  localStorage.setItem('firstName',data.firstName);
  localStorage.setItem('lastName',data.lastName);
  localStorage.setItem('userName',data.userId);
  localStorage.setItem('tenantName',data.tenantID);
  localStorage.setItem('phoneNumber',data.phoneNumber);
 localStorage.setItem('company', data.company);
  localStorage.setItem('designation',data.designation);
  localStorage.setItem('country',data.country);
  this.authenticate(data);
//   this.authenticate();
}
// }
 authenticate(data) {
  this.appService.login(data.userId, "Welcome@123").subscribe(user => {
    //localStorage.setItem('currentUser',JSON.stringify({"token":data}))
    localStorage.setItem('currentUser', JSON.stringify(user.resp_data));
              CookieStore.set('token', user.resp_data.accessToken, {});
  this.router.navigate(['/activation']);
  });
  //localStorage.setItem('currentUser',JSON.stringify({"token":"hiiiiiiiiiii"}))
  //this.router.navigate(['/activation']);
}

}

