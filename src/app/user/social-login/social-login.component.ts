import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticationService } from 'src/app/_services';
import { SharedDataService } from 'src/app/_services/shared-data.service';

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
              private sharedData: SharedDataService) { }

  ngOnInit() {
     localStorage.clear();
     this.route.queryParams.subscribe(params => {
      this.email = params['email']
      
    });

   

    
    this.authenticationService.userDetails(this.email).subscribe(data => this.checkSuccessCallback(data));
    this.authenticate();
    
   
}
checkSuccessCallback(data:any){
  this.sharedData.setLoggedinUserData(data.firstName);
  console.log("social login data-----", data);
  localStorage.setItem('firstName',data.firstName);
  localStorage.setItem('lastName',data.lastName);
  localStorage.setItem('userName',data.userId);
  localStorage.setItem('tenantName',data.tenantId.name);
  localStorage.setItem('phoneNumber',data.phoneNumber);
 localStorage.setItem('company', data.company);
  localStorage.setItem('designation',data.designation);
  localStorage.setItem('country',data.country);
//   this.authenticate();
}
// }
 authenticate() {
  
  localStorage.setItem('currentUser',JSON.stringify({"token":"hiiiiiiiiiii"}))
  this.router.navigate(['/activation']);
}

}

