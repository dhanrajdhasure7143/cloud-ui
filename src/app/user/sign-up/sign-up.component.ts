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
import { ProfileService } from 'src/app/_services/profile.service';
import Swal from 'sweetalert2';
import { CryptoService } from 'src/app/_services/crypto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @ViewChild('password') password: ElementRef;
  @ViewChild('rememberme') checkbox: ElementRef;
  signupForm: FormGroup;
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
  inactive:any;
  googleLoginURL:any;
  officeLoginURL:any;
  isShowOtp : boolean = false;
  messages : any[] = ["Efficiency and Time Saving","Personalized for Better Engagement","Multi-Channel Integration","Compliance and Security Measures","Data-Driven Decision Making"]
  userEmail: any;

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
    private profileService:ProfileService,
    private crypto:CryptoService,
    private spinner:NgxSpinnerService,
    private service: FirstloginService,
    private messageService:MessageService
    //private cookieService:CookieService,
    
  ) {}

  ngOnInit() {
    this.messages = this.messages.map((message, index) => ({
      id: index+1,
      content: message
    }));
  
  this.signupForm = this.formBuilder.group({
    firstName: [ '', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z_]+(\\s[a-zA-Z]+)*$")])],
    lastName: [ '', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z_]+(\\s[a-zA-Z]+)*$")])],
    email: [ '', [Validators.required,Validators.email]],
    otp:[''],
    password: ['', Validators.required],
    });
    this.googleLoginURL = this.config.tokenendpoint+"/api/socialLogin?authProvider=google&redirectPath="+this.config.socialLoginRedirectURL
    this.officeLoginURL = this.config.tokenendpoint+"/api/socialLogin?authProvider=azure&redirectPath="+this.config.socialLoginRedirectURL
  }

  showOtp(event){
    if(event.target.value.includes('@') && this.signupForm.get('email').valid)
    this.isShowOtp = true;
    else
    this.isShowOtp = false;
  }
  
  generateOTP(){
    this.authenticationService.generateOTPSignUp(this.signupForm.value.email.toLowerCase()).subscribe(data => {
      this.profileService.getTwoFactroConfig(this.signupForm.value.email.toLowerCase()).subscribe(res=>{
        //swwet alert
        if(res.emailEnabled == true){
          // Swal.fire({
          //   title: 'Success!',
          //   text: `OTP has been sent to your registered Email.`,
          //   icon: 'success',
          //   showCancelButton: false,
          //   allowOutsideClick: true
          // })
          this.messageService.add({
            severity: 'success', summary: 'Success', detail: "OTP Generated Successfully"
          });
             
        }
        if(res.smsEnabled == true){
          Swal.fire({
            title: 'Success!',
            text: `OTP has been sent to your registered Mobile Number.`,
            icon: 'success',
            showCancelButton: false,
            allowOutsideClick: true
          })
        }
        if(res.emailEnabled == true && res.smsEnabled == true){
      Swal.fire({
        title: 'Success!',
        text: `OTP has been sent to your registered Email and Mobile number.`,
        icon: 'success',
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

// onSubmit(){
//   console.log(this.signupForm.value.email)
// }

onSubmit() {
var payload = new FormData();
var reqObj = {}
reqObj = {
  'firstName': this.signupForm.value.firstName,
  'lastName': this.signupForm.value.lastName,
  'userId' : this.signupForm.value.email.toLowerCase(),
  'password': this.signupForm.value.password,
}
payload.append('firstName', this.crypto.encrypt(JSON.stringify(reqObj)));
  this.service.registrationStart(payload).subscribe(res => {
  if(res.body) {
    Swal.fire({
      title: 'Success',
      text: `Registration completed successfully!`,
      icon: 'success',
      showCancelButton: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/']);
      }
    });
  }
}, err => {
    Swal.fire({
      title: 'Error!',
      icon: 'error',
      text: `${err.error.message} ! Please check your user name`,
      allowOutsideClick: false
    });
  });
}

validateOTP(){
  this.spinner.show()
   this.authenticationService.validateOTP(this.signupForm.value.email.toLowerCase(),this.signupForm.value.otp).subscribe((data:any)=>{ 
   
    if(data.message=="OTP Verified Successfully")
      {
        this.spinner.hide()
        this.isShowOtp = false;
      }else
      {
        this.spinner.hide()
        Swal.fire("Error",data.message,"error")
      }
   }, err=>{
     console.log(err)
     this.spinner.hide()
     Swal.fire("Error","Unable to register data","error")
   })
}

}
