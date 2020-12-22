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
    private profileService:ProfileService
    
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
    console.log("OTP method");
    
    this.isOTP = true;

    this.authenticationService.generateOTP(this.f.username.value).subscribe(data => {

      //swwet alert
      Swal.fire({
        title: 'Success!',
        text: `OTP has been sent to your registred Email and Mobile number.`,
        type: 'success',
        showCancelButton: false,
        allowOutsideClick: true
      })
          },error => {

          
      this.error = "Failed to generate One Time Password.";
      this.loading = false;
    },
    
  
    );

  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log("otp data", this.f.otpNum);
    
    localStorage.clear();
    this.submitted = true;
    this.session.stopWatching();

 

    if (this.loginForm.invalid) {
      return;
    }

 

    this.loading = true;
    //if two factor authentication is enabled 
    if(!this.twoFactorAuthConButton){
      
      this.authenticationService.validateOTP(this.f.username.value, this.f.otpNum.value).subscribe(data => {

        this.authenticationMeothod();
  
      },error => {
  
            
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

 authenticationMeothod(){
  this.authenticationService
  .login(this.f.username.value, this.f.password.value)
  .pipe(first())
  .subscribe(
    
    data => {
      if(data.errorDetails == "You completed your maximum attempts. Your account is temporarily locked for 3 hours."){

        this.error = "You completed your maximum attempts. Your account is temporarily locked for 3 hours."
        // Swal.fire({
        //   type: 'error',
        //   title:"Error!",
        //   text: "Your account is temporarily locked for 3 hours."
        // });
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


      this.authenticate();
    },
    error => {

      
      this.error = "Email or Password is invalid.";
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
    this.profileService.getUserRole(2).subscribe(res=>{
      this.userRole=res.message;
      console.log("user role is",this.userRole)
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
    // this.router.navigate(['/activation']);
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
    console.log("keyDown-Event", this.f.username.value);
    var str = true;
    if(str){
      

      
      
    }
    
  
    

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
