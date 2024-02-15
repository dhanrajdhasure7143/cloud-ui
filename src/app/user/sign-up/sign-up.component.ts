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
  styleUrls: ['./sign-up.component.scss'],
  providers: [MessageService]
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
  isGenerate : boolean = false;
  isValidate : boolean = false;
  isOtpSent : boolean = false;
  ispublicMail:boolean = false;
  isEmailDisable : boolean = false;
  isSuccess : boolean = false;
  display : any;
  resendEnable : boolean = false;

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
    public messageService:MessageService,
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
    if(event.target.value.includes('@') && this.signupForm.get('email').valid){
      this.isGenerate = true;
      // this.isShowOtp = true;
      // this.isOtpSent = false
    } else{
      this.isGenerate = false;
      // this.isShowOtp = false;
      // this.isOtpSent = false
    }
  }

  timer(minute) {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;
    const prefix = minute < 10 ? "0" : "";
    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;
      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;
      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
      }
    }, 1000);
  }
  
  generateOTP(isResend){
    this.spinner.show()
    this.ispublicMail=false;
    let userId=this.signupForm.value.email.toLowerCase();
    //  this.isresend=true;
     if(userId.endsWith('@gmail.com') || userId.endsWith('@yahoo.com') || 
     userId.endsWith('@hotmail.com') || userId.endsWith('@rediffmail.com')){
       this.ispublicMail=true;
       this.error='Only Business Email is allowed';
       this.spinner.hide()
       setTimeout(() => {
        this.error='';
      }, 3000);
       return
     } else {
       this.ispublicMail=false;
     }
     this.spinner.show();
    this.authenticationService.generateOTPSignUp(this.signupForm.value.email.toLowerCase(),isResend).subscribe((data : any) => {
     console.log(data.errorMessage)  
     if(data.message == "OTP Sent Successfully"){
      Swal.fire({
        title: 'Success!',
        text: `OTP has been sent to your registered Email.`,
        icon: 'success',
        showCancelButton: false,
        allowOutsideClick: true
      })
      this.timer(2)
      this.isGenerate = false;
      this.isEmailDisable = true;
      this.isOtpSent = true;
      this.isValidate = true;
      this.isShowOtp = true;
      this.resendEnable = true;
      setTimeout(() => {
        this.resendEnable = false;
      }, 120000);
      this.spinner.hide()
     } else {
      this.spinner.hide()
      Swal.fire("Error",data.errorMessage,"error")
     }
    },err=>{
      console.log(err)
      this.spinner.hide()
      Swal.fire("Error","Something Went Wrong","error")
    });

  }

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
        this.router.navigate(['user-page'], {
          queryParams: { name : this.signupForm.value.firstName, email : this.signupForm.value.email.toLowerCase() },
        });
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
        this.isValidate = false;
        this.isSuccess = true;
        this.isGenerate = false;
        Swal.fire({
          title: 'Success!',
          text: `OTP Verified Successfully.`,
          icon: 'success',
          showCancelButton: false,
          allowOutsideClick: true
        })
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'OTP Verified Successfully.' });
      }else
      {
        this.spinner.hide()
        Swal.fire("Error",data.message,"error")
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'data.message' });
      }
   }, err=>{
     console.log(err)
     this.spinner.hide()
     Swal.fire("Error","Unable to register data","error")
   })
}

lettersOnly(event): boolean {
    
  var regex = new RegExp("^[a-zA-Z ]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
    if ((event.target.selectionStart === 0 && event.code === 'Space')){
      event.preventDefault();
    }
}

}
