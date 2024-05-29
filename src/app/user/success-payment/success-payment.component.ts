import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppService, AuthenticationService, UserService } from 'src/app/_services';
import { CryptoService } from 'src/app/_services/crypto.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { SessionService } from 'src/app/_services/session';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { APP_CONFIG } from 'src/app/app.config';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.scss']
})
export class SuccessPaymentComponent implements OnInit {
 public countdown: number = 15;
 userEmail:string;
 userData:any;
 http:any;

  constructor(
    private route: ActivatedRoute, 
    private rest_api: FirstloginService,
    private router: Router,
    private authservice: AuthenticationService,
    // private http : HttpClient,
    private session: SessionService,
    private sharedData: SharedDataService,
    public userService: UserService,
    private profileService:ProfileService,
    private crypto:CryptoService,
    @Inject(APP_CONFIG) private config,
    private appService: AppService,
    private httpBackend:HttpBackend
    ) {
    this.http=new HttpClient(this.httpBackend);

     }

  ngOnInit(): void {
    this.subscriptionComplete();
    this.startCountdown();
  }

  subscriptionComplete(){
    this.route.queryParams.subscribe(data => {
      console.log("queryParams-USER_EMAIL",data);
      this.userEmail = data.id
      if (this.userEmail) {
        this.rest_api.registrationComplete(this.userEmail).subscribe((response:any) => {
          console.log("registrationComplete-response", response)
        let userEmail = response.userEmail;
        let tenantId = response.tenantId;
        this.userData = response
          this.rest_api.insertCustomerSubscription(userEmail, tenantId).subscribe((subscriptionResponse:any) => {
            if(subscriptionResponse.messege == "Customer details and subscriptions are inserted In DB Successfully"){
              // Swal.fire({
              //   title: 'Success!',
              //   text: `Your subscription is successful, Please re-login!`,
              //   icon: 'success',
              //   showCancelButton: false,
              //   allowOutsideClick: false,
              // }).then((result) => {
              //   if (result.isConfirmed) {
              //     this.router.navigate((['/user']));
              //   }
              // });

              // this.startCountdown();
            }else{
              Swal.fire({
                title: 'Error!',
                text: "Something went wrong, Please contact sales@epsoftinc.com",
                icon: 'error',
                showCancelButton: false,
                allowOutsideClick: false,
              }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate((['/user']));
                  }
                });
            }
          }, subscriptionError => {
              Swal.fire("Error","Something went wrong, Please contact sales@epsoftinc.com","error")
          });
        }, error => {
            Swal.fire("Error","Something went wrong, Please contact sales@epsoftinc.com","error")
        });
      }
    });
  }

  startCountdown(){
    interval(1000).pipe(
      take(this.countdown)
    ).subscribe(() => {
      this.countdown--;
      if (this.countdown === 0) {
        // this.router.navigate(['/user']);
        console.log("countDownEnd")
        // this.router.navigate(['/userDetails'],{
        //   queryParams: { token: this.crypto.encrypt(JSON.stringify(this.userData))},
        // });
        this.loginUser(this.userData);
      }
    });
  }

  loginUser(userData){
    console.log("loginUserAPI started - userData", this.userData)
    this.http.post(environment.tokenendpoint+"/api/login/beta/token", {userId:this.userData.userEmail}).subscribe((response:any)=>{
    // this.authservice.getToken({userId:"ranjith.sigiri@epsoftinc.com"}).subscribe((response:any)=>{
      // this.getTenantBasedAccessToken(response, userData);
      console.log(":accessToken Response", response)
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.getUserDetails(userData);
    },err=>{
      console.log("error",err)
      Swal.fire("Error","Unable to get access token","error");
    })
  }

  getTenantBasedAccessToken(authToken:any, userData:any){
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken.accessToken}`)
    .set('Refresh-Token', authToken.refreshToken)
    .set('Timezone', timezone);
    this.http.get("/api/login/beta/newAccessToken?tenant_id="+userData.tenantId, {headers}).subscribe((authResponse:any)=>{
      console.log("testAuthToken-new",authResponse);
      // localStorage.setItem('currentUser', JSON.stringify(this.newAccessToken));
    },err=>{
      Swal.fire("Error","Unable to get access token", "error")
    })
  }

  getUserDetails(userData){
    this.appService.getIP(); 
      localStorage.setItem('ProfileuserId',userData.userEmail)
      this.authservice.userDetails(userData.userEmail).subscribe(data => {
        this.checkSuccessCallback(data)
        this.session.startWatching();
      }
    );
      
  }

  checkSuccessCallback(data:any){
    this.sharedData.setLoggedinUserData(data);
     localStorage.setItem('firstName',data.firstName);
     localStorage.setItem('lastName',data.lastName);
    localStorage.setItem('userName',data.userId);
   localStorage.setItem('tenantName',data.tenantID);
     localStorage.setItem('phoneNumber',data.phoneNumber);
     localStorage.setItem('company', data.company);
     localStorage.setItem('country',data.country);
    localStorage.setItem('enabled',data.enabled)
        this.authenticate();
  }

  authenticate() {
    console.log("rolesApi started")
    // this.saveEmailCredentials()
    this.profileService.getUserRole(2).subscribe(res=>{
      const userRole=res.message;
      localStorage.setItem('userRole',userRole);
      //this.router.navigate(['/activation']);
    var token=JSON.parse(localStorage.getItem('currentUser'));
    var encryptToken=btoa(token.accessToken)
    var encryptrefreshToken=btoa(token.refreshToken);
    var firstName=localStorage.getItem('firstName');
    var lastName=localStorage.getItem('lastName');
    var ProfileuserId=localStorage.getItem('ProfileuserId');
    var tenantName=localStorage.getItem('tenantName');
    var userId= this.crypto.encrypt(JSON.stringify(localStorage.getItem('ProfileuserId')));
    var useridBase64 = btoa(userId);
    var userIp=btoa(localStorage.getItem('ipAddress'));
    console.log("Navigation.................")
        window.location.href=this.config.newproductendpoint+"/#/pages/home?accessToken="+encryptToken+'&refreshToken='+encryptrefreshToken+'&firstName='+firstName+'&lastName='+lastName+'&ProfileuserId='+ProfileuserId+'&tenantName='+tenantName+'&authKey='+useridBase64+'&userIp='+userIp
    },error => {
    })
     
  }


  saveEmailCredentials() {
    this.http.saveEmailCredentials().subscribe((response:any)=>{
      console.log("implemented code" + response);
    })
   
}


}
