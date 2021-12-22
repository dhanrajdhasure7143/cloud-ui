import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService, UserService } from 'src/app/_services';
import { SessionService } from './../../_services/session/session';
import { first } from 'rxjs/operators';
import { CookieStore } from 'src/app/_services/cookie.store';
import { APP_CONFIG } from './../../app.config';
import { LoginService } from '../_services/login.service';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { Particles } from '../../_models/particlesjs';
import { ProfileService } from 'src/app/_services/profile.service';
import Swal from 'sweetalert2';
import { CryptoService } from 'src/app/_services/crypto.service';
import { NgxSpinnerService } from 'ngx-spinner';
//import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @ViewChild('password') password: ElementRef;
  @ViewChild('rememberme') checkbox: ElementRef;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  public userRole:any = [];
  public show:boolean=true;
  public isOTP:boolean = false;
  public twoFactorAuthenticationEnabled:boolean = false;
  public twoFactorAuthConButton:boolean = true;
  public enteredOTP:boolean = false;
  public otp:any;
  public errormsg: any;
  public hide:any = true;

  constructor(
    @Inject(APP_CONFIG) private config,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private session: SessionService,
    private loginService: LoginService,
    private sharedData: SharedDataService,
    public userService: UserService,
    private particles :Particles,
    private profileService:ProfileService,
    private crypto:CryptoService,
    private spinner:NgxSpinnerService
    //private cookieService:CookieService,
    
  ) {
    this.session.stopWatching();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

  }

  ngOnInit() {

  document.cookie = "old_ux=false";
  if(this.getCookie("new_reg_flow")!="false" || this.getCookie("new_reg_flow")==undefined){
    document.cookie = "new_reg_flow=true";
  }

    //this.twoFactorAuthenticationEnabled = this.config.isTwoFactorAuthenticationEnabled;
  this.particles.getParticles();

    
// if(!this.twoFactorAuthConButton){
  
  this.loginForm = this.formBuilder.group({
    username: [this.get('username') ? this.get('username') : '', Validators.required],
    password: [this.get('password') ? this.get('password') : '', Validators.required],
    
    rememberme: [false]
  });

// }else{
    
    // this.loginForm = this.formBuilder.group({
    //   username: [this.get('username') ? this.get('username') : '', Validators.required],
    //   password: [this.get('password') ? this.get('password') : '', Validators.required],
    //  // otpNum: [this.get('otpNum') ? this.get('otpNum') : '', Validators.required, Validators.maxLength(5)],
    //   rememberme: [false]
    // });
  //}

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // this.checkbox.nativeElement.onchange = () => {
    //   if (this.checkbox.nativeElement.checked === true) {
    //     this.password.nativeElement.type = 'text';
    //   } else {
    //     this.password.nativeElement.type = 'password';
    //   }
    // };
    
  }
  generateOTP(){
 
    this.isOTP = true;

    this.authenticationService.generateOTP(this.f.username.value).subscribe(data => {

      this.profileService.getTwoFactroConfig(this.f.username.value).subscribe(res=>{

        //swwet alert
        if(res.emailEnabled == true){
          Swal.fire({
            title: 'Success!',
            text: `OTP has been sent to your registered Email.`,
            type: 'success',
            showCancelButton: false,
            allowOutsideClick: true
          })
             
        }
        if(res.smsEnabled == true){
          Swal.fire({
            title: 'Success!',
            text: `OTP has been sent to your registered Mobile Number.`,
            type: 'success',
            showCancelButton: false,
            allowOutsideClick: true
          })
        }
        if(res.emailEnabled == true && res.smsEnabled == true){
      Swal.fire({
        title: 'Success!',
        text: `OTP has been sent to your registered Email and Mobile number.`,
        type: 'success',
        showCancelButton: false,
        allowOutsideClick: true
      })
    }
          },error => {
            this.error = "Failed to generate One Time Password.";
            this.loading = false;
      });
      

          
      
    },
    
  
    );

  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
  
    
    localStorage.clear();
    this.submitted = true;
    this.session.stopWatching();

 

    if (this.loginForm.invalid) {
      return;
    }

 

    this.loading = true;
    //if two factor authentication is enabled 
    if(this.loginForm.valid){ 
      this.loginService.checkpasswordexpiry(this.f.username.value).subscribe(data=>{
        let res = data;
        if(data.isError == "true"){
       
          Swal.fire({
            width: '400px',
            text: data.message, 
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Okay'
          }).then((result) => {
            
            if (result.value) {
              localStorage.setItem('Passwordvalidite', this.f.username.value); 
              this.router.navigateByUrl("/changepassword"); 
            }
          });
        }
        else{
    if(!this.twoFactorAuthConButton){
      
      this.authenticationService.validateOTP(this.f.username.value, this.f.otpNum.value).subscribe(data => {

        this.authenticationMeothod();
  
      },error => {
        
        this.spinner.hide()
        this.error = "Invalid OTP. Please check and try again.";
        this.loading = false;
        return
        
      },
      
    
      );

    }else{
      this.authenticationMeothod();
    }
      // 
  }
  
});  
} 
}

 authenticationMeothod(){
   this.spinner.show();
  this.authenticationService
  .login(this.f.username.value, this.f.password.value)
  .pipe(first())
  .subscribe(data => {
     this.errormsg=data;
      if(data.errorDetails == "You completed your maximum attempts. Your account is temporarily locked for 3 hours."){

        this.error = "You completed your maximum attempts. Your account is temporarily locked for 3 hours."
        Swal.fire({
          type: 'error',
          title:"Error",
          text: "Your account is temporarily locked for 3 hours!!"
        });
         return
      }
      
      if (this.f.rememberme.value) {
        this.set('username', this.f.username.value, {});
        this.set('password', this.f.password.value, {});
        if(this.twoFactorAuthenticationEnabled){
        this.set('otpNum', this.f.otpNum.value, {});
        }

      }
      
      this.loading = false;
      this.session.startWatching(); 

      localStorage.setItem('ProfileuserId',this.f.username.value)

      // user details based on userId
      this.authenticationService.userDetails(this.f.username.value).subscribe(data => this.checkSuccessCallback(data));

     
      setTimeout(() => {
        
        this.spinner.hide();
        this.authenticate();
       },2000);
      
    },
    error => {
      
     this.spinner.hide();
      if(this.errormsg==undefined){
      this.error = "Invalid Credentials. Please try again !!";
      }
      if(error.error.status=='LOCKED'){
         this.error = "Account Locked !! Please try after 3 hrs.";
       }
      // if(error.error.status=='LOCKED'){
      //   this.error = "Account Locked !! Please try after 3 hrs.";
      // }
      // if(error.resp_data.statusCode=='UNAUTHORIZED'){
      //   this.error = "Invalid Credentials. Please try again !!";
      // }
      // else{
      //   this.error = "Email or Password is invalid.";
      // }
    
      this.loading = false;
    },
    
  );

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
    // localStorage.setItem('designation',data.designation);
     localStorage.setItem('country',data.country);
    // localStorage.setItem('department', data.department);

    //this.userService.getRole(data.company,data.userId).subscribe(data => this.getRoles(data));
  }

  // getRoles(data: any): void {
  //   let name:any = []
  //   console.log(data)
  //   data.forEach(element => {
  //     name.push(element.name)
  //     // if (name == "Admin") {
  //     //   localStorage.setItem("roleName", name)

  //     // }
  //   });
    
    
  // }

  get(key) {
    key = key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1');

    const regExp = new RegExp('(?:^|; )' + key + '=([^;]*)');
    const matches = document.cookie.match(regExp);

    return matches
      ? decodeURIComponent(matches[1])
      : undefined;
  }


  delete(name) {
    this.set(name, '', { expires: -1 });
  }

  deleteAll() {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
      const index = cookie.indexOf('=');
      const name = ~index ? cookie.substr(0, index) : cookie;
      const expireOn = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);
      document.cookie = name + '=; expires=' + expireOn.toLocaleString() + ';path=/';
    }
  }

  set(name, value, opts = {}) {
    CookieStore.set(name, value, opts);
  }

  // authenticate() {
  //   this.router.navigate(['/activation']);
  // }
  authenticate() {
    this.spinner.show();
    this.profileService.getUserRole(2).subscribe(res=>{
      this.userRole=res.message;
     
      localStorage.setItem('userRole',this.userRole);
     if(this.userRole.includes('Platform Admin')){
      this.router.navigate(['/superadmin']);
      
     }else{
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
    var productURL = this.config.productendpoint;
    if(this.config.isNewDesignEnabled && this.getCookie("old_ux")!=="true")
        productURL = this.config.newproductendpoint;
        this.spinner.hide();
        if(this.getCookie("new_reg_flow")=="true"){
        window.location.href=productURL+"/#/pages/home?accessToken="+encryptToken+'&refreshToken='+encryptrefreshToken+'&firstName='+firstName+'&lastName='+lastName+'&ProfileuserId='+ProfileuserId+'&tenantName='+tenantName+'&authKey='+useridBase64+'&userIp='+userIp
        }
        //window.location.href="http://localhost:4000"+"/#/pages/home?accessToken="+encryptToken+'&refreshToken='+encryptrefreshToken+'&firstName='+firstName+'&lastName='+lastName+'&ProfileuserId='+ProfileuserId+'&tenantName='+tenantName+'&authKey='+useridBase64+'&userIp='+userIp
     }
    },error => {
      //this.error = "Please complete your registration process";
      this.loading = false;
    })
     this.router.navigate(['/activation']);
  }

  requestDemo() {
    // location.href = this.config.portfolioSite;
this.router.navigate(['/createaccount'])
  }

  googleLogin() {
    this.loginService.googleLogin().subscribe();
  }

  azureLogin() {
    this.loginService.azureLogin().subscribe();
  }
  toggle() {
    this.show = !this.show;
  }
  toggleOTP(){
    this.show = !this.show;
  }
  onKeydown(event){
    var emailpattern= new RegExp("^\S*[@]\S*[.]\S*$");
  
    var str = true;
    if(str){
      

      
      
    }
    
  
    

  }

getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

onKeydownfeilds(event){
  this.error=""
}
  onEmailChange(){
    this.isOTP=false;
    this.twoFactorAuthConButton = true;
    
    if(this.f.username.valid){
    this.profileService.getTwoFactroConfig(this.f.username.value).subscribe(res=>{
      if(!res.message){
        if(res.twoFactorEnabled == true){
          this.loginForm.addControl('otpNum', this.formBuilder.control('',[Validators.required]))

          this.twoFactorAuthConButton = false;
        }else{
          this.twoFactorAuthConButton = true;
          this.loginForm.removeControl('otpNum')
          
        }
      } else{
        this.twoFactorAuthConButton = true;
        this.loginForm.removeControl('otpNum')
      }       
    });
  }
  }
      
}
