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
import Swal from 'sweetalert2';
import { CryptoService } from 'src/app/_services/crypto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import { MessageService } from 'primeng/api';
import { Country, State, City } from 'country-state-city';
import { Location} from '@angular/common'
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
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
  planDetails: any[]=[];
  planName: any[]=[];
  features: any;
  featuresList: any[] =[];
  description: any[]=[];
  userForm : FormGroup;
  showUserScreen : boolean = false;
  departments: any[] = [];
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  isInput: boolean;
  phnCountry: any;
  errorMessage: any;
  errorMessage1: any;
  errorMessage2: any;
  country: any;
  jobTitle: any;
  organization: any;
  department: any;
  state: any;
  city: any;
  zipCode: any;
  phoneNumber: any;
  user: any;
  fieldsEnabled: boolean = true;
  isPasswordDisable : boolean = true;
  orgExsist : boolean = false;
  userDetails : any = {};
  isTimeOutshow : boolean = false;
  isStateNull : boolean = false;
  userId:any;
  userPsw:any;
  isErrorMessage : boolean = false;
  isValidateOTP : boolean = false;

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
    private rest_api:UsermanagementService,
    private crypto:CryptoService,
    private spinner:NgxSpinnerService,
    private service: FirstloginService,
    public messageService:MessageService,
    private location : Location
    //private cookieService:CookieService,
  ) {
    this.route.queryParams.subscribe((res)=>{
      if(res){
        if(res.token){
        let parms = JSON.parse(atob(res.token))
        console.log("testing",parms)
        if(parms.screen == 2){
          this.showUserScreen = true;
          this.userId= parms.usermail
          this.userPsw = parms.userpassword
        }else{
          this.showUserScreen = false;
        }
      }
      }
    }
    )
  }

  ngOnInit() {

    this.getPlanDetails();
    this.spinner.show();
    this.messages = this.messages.map((message, index) => ({
      id: index+1,
      content: message
    }));
  this.signupForm = this.formBuilder.group({
    firstName: [ '', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z_]+(\\s[a-zA-Z]+)*$")])],
    lastName: [ '', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z_]+(\\s[a-zA-Z]+)*$")])],
    email: [ '', [Validators.required,Validators.email]],
    otp:[''],
    password: ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$%])[a-zA-Z0-9@$%]{8,20}$")])],
    });

    this.userForm = this.formBuilder.group({
      jobTitle: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
      organization: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
      zipCode: ["", Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(6)])],
      department: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    this.getCountries();
    this.getAllDepartments();

    this.googleLoginURL = this.config.tokenendpoint+"/api/socialLogin?authProvider=google&redirectPath="+this.config.socialLoginRedirectURL
    this.officeLoginURL = this.config.tokenendpoint+"/api/socialLogin?authProvider=azure&redirectPath="+this.config.socialLoginRedirectURL
  }

  getPlanDetails() {
    setTimeout(() => {
      this.spinner.hide();      
    }, 1000);
    this.service.getPlanDetails().subscribe((response: any) => {
      this.planDetails = response.data;
      this.planDetails.forEach(plan => {
        plan.featuresList = plan.features.split(',').map(feature => feature.trim());
      });
    })
  }

  showOtp(event){
    this.isGenerate = false;
    if(event.target.value.includes('@') && this.signupForm.get('email').valid){
       if(event.target.value.endsWith('@gmail.com') || event.target.value.endsWith('@yahoo.com') || 
       event.target.value.endsWith('@hotmail.com') || event.target.value.endsWith('@rediffmail.com')){
         this.ispublicMail=true;
         this.error='Only Business Email is allowed';
         this.isGenerate = false;
       } else {
        this.error = '';
        this.isGenerate = true;
        this.ispublicMail=false;
       }
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
        clearInterval(timer);
      }
    }, 1000);
  }
  generateOTP(isResend){
    this.spinner.show()
    // this.ispublicMail=false;
    // let userId=this.signupForm.value.email.toLowerCase();
    // //  this.isresend=true;
    //  if(userId.endsWith('@gmail.com') || userId.endsWith('@yahoo.com') || 
    //  userId.endsWith('@hotmail.com') || userId.endsWith('@rediffmail.com')){
    //    this.ispublicMail=true;
    //    this.error='Only Business Email is allowed';
    //    this.spinner.hide()
    //    setTimeout(() => {
    //     this.error='';
    //   }, 3000);
    //    return
    //  } else {
    //    this.ispublicMail=false;
    //  }
     this.spinner.show();
    this.authenticationService.generateOTPSignUp(this.signupForm.value.email.toLowerCase(),isResend).subscribe((data : any) => {
     if(data.message == "OTP Sent Successfully"){
      Swal.fire({
        title: 'Success!',
        text: `OTP has been sent to your registered Email!`,
        icon: 'success',
        showCancelButton: false,
        allowOutsideClick: true
      })
      this.isTimeOutshow = true;
      this.timer(2)
      this.isGenerate = false;
      this.isEmailDisable = true;
      this.isOtpSent = true;
      this.isShowOtp = true;
      this.isValidateOTP = true;
      this.resendEnable = true;
      setTimeout(() => {
        this.resendEnable = false;
        this.isTimeOutshow = false;
      }, 120000);
      this.spinner.hide()
     } else if (data.errorMessage == "User already registered"){
      this.spinner.show()
      this.rest_api.getDetailsUser(this.signupForm.value.email.toLowerCase()).subscribe((data : any) =>{
      this.spinner.hide()
        if(data.response)
        if(data.response.enterprisePlan){
          Swal.fire({
            title: 'Info',
            text: `This user already requested for Enterprise plan. Please use other email to signup!`,
            icon: 'info',
            showCancelButton: false,
            allowOutsideClick: true
          })
        }else{
        // if(data.response.registrationProcess == "basic_details_completed"){
          Swal.fire({
            title: 'Info',
            text: `User Already exist, please processed sign in!`,
            icon: 'info',
            showCancelButton: false,
            allowOutsideClick: true
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/user'],{
                queryParams: { email : this.userEmail },
              });
            }
          });
        // }
      }
      })
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
  onRegistrationStart() {
    // this.showUserScreen = true;
    this.spinner.show()
    var payload = new FormData();
    var reqObj = {}
    reqObj = {
      'firstName': this.signupForm.value.firstName,
      'lastName': this.signupForm.value.lastName,
      'userId' : this.signupForm.value.email.toLowerCase(),
      'password': this.signupForm.value.password,
    }
    this.userId = this.signupForm.value.email.toLowerCase();
    this.userPsw = this.signupForm.value.password
    payload.append('firstName', this.crypto.encrypt(JSON.stringify(reqObj)));
      this.service.registrationStart(payload).subscribe(res => {
        this.spinner.hide()
        this.showUserScreen = true;
        let url=this.router.url.split('?');
        let rplaceUrl = {"screen":"2",usermail:this.signupForm.value.email.toLowerCase(),userpassword:this.signupForm.value.password} 
        this.location.replaceState(url[0]+'?token='+btoa(JSON.stringify(rplaceUrl)));
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
   this.authenticationService.validateOTPSignUp(this.signupForm.value.email.toLowerCase(),this.signupForm.value.otp).subscribe((data:any)=>{ 
    if(data.message=="OTP Verified Successfully")
      {
        this.spinner.hide()
        this.isShowOtp = false;
        this.isValidateOTP = false;
        this.isValidate = false;
        this.isSuccess = true;
        this.isGenerate = false;
        this.isPasswordDisable = false
        Swal.fire({
          title: 'Success!',
          text: `OTP Verified Successfully!`,
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

backtoSignUp(){
  this.showUserScreen = false;
}

getCountries() {
  this.countryInfo = Country.getAllCountries();
}

getAllDepartments() {
  this.service.getAllDepartments().subscribe((response: any) => {
    this.departments = response;
  })
}

// If country changes, states and cities gets changed according to the country selected 
onChangeCountry(countryValue) {
  this.isInput = !this.isInput;
  this.stateInfo = State.getAllStates();

  if (countryValue) {
    const matchingCountry = this.countryInfo.find((item: any) => item.name == countryValue);
    this.phnCountry = matchingCountry.isoCode;
    this.stateInfo = State.getStatesOfCountry(matchingCountry.isoCode)
    this.errorMessage = ""
  }
  if (this.stateInfo == null || this.stateInfo.length === 0) {
    this.isStateNull = true

  } else {
    this.isStateNull = false
  }

  // Set the flag to true if there are states available, otherwise false
  this.fieldsEnabled = this.stateInfo && this.stateInfo.length > 0;

  if (this.fieldsEnabled) {
    this.userForm.get('state').enable();
    this.userForm.get('city').enable();
  } else {
    // Clear state and city values if there are no states available
    this.userForm.get('state').setValue('');
    this.userForm.get('city').setValue('');
  }

  this.userForm.get('country').valueChanges.subscribe((selectedCountry) => {
    if (selectedCountry) {
      this.userForm.get('state').setValue('');
      this.userForm.get('city').setValue('');
    }
  });
}

// If state changes, cities gets changed accordingly
onChangeState(stateValue) {
  this.cityInfo = City.getAllCities();
  if (stateValue) {
    const matchingState = this.stateInfo.find((item: any) => item.name == stateValue);
    this.cityInfo = this.cityInfo.filter((city: any) => city.countryCode === matchingState.countryCode && city.stateCode === matchingState.isoCode);
    this.errorMessage1 = ""
    if (this.cityInfo.length === 0) {
      this.cityInfo = [{ name: 'NA' }];
    }
  }
  this.userForm.get('state').valueChanges.subscribe((selectedState) => {
    if (selectedState) {
      this.userForm.get('city').setValue('');
    }
  });
}

onChangeCity(cityValue) {
  if (cityValue) {
    this.errorMessage2 = ''
  }
}

// Accepting only numbers for zip code field
numbersOnly(event): boolean {
  var regex = new RegExp("^[0-9]+$"); // Regex to allow only numbers
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
}

// If country and flag are different, it generates error message
OnFlagChange(event, phonecode) {
  var code = event.iso2;
  var testcode = code.toString().toUpperCase();
  if (testcode != phonecode) {
    this.isErrorMessage = true;
    this.errorMessage = "Please Select Appropriate Country";
    this.errorMessage1 = "Please Select Appropriate State";
    this.errorMessage2 = "Please Select Appropriate City"
    this.userForm.get('state').enable();
    this.userForm.get('city').enable();
  }
  const selectedCountry = this.countryInfo.find((item: any) => item.isoCode == code);
  this.fieldsEnabled = State.getStatesOfCountry(selectedCountry.isoCode).length > 0;
}

get f() {
  return this.userForm.controls;
}

// To enable continue button if all fields are valid and 2 fields of state and city are disabled
get userFormValid(): boolean {
  return this.jobTitle.trim() !== '' && this.organization.trim() !== '' && this.department.trim() !== '' && this.state.trim() !== '' && this.city.trim() !== '' && this.zipCode.trim() !== '' && this.phoneNumber.trim() !== '';
}

registrationSave(){
  this.spinner.show();
  // This payload is for Registration Continue API
  var payload = new FormData();
  var reqObj = {}
  reqObj = {
    // firstName: this.signupForm.value.firstName,
    // lastName: this.signupForm.value.lastName,
    // userId : this.signupForm.value.email.toLowerCase(),
    // password: this.signupForm.value.password,
    userId:this.userId,
    jobTitle : this.userForm.value.jobTitle,
    department : this.userForm.value.department,
    organization : this.userForm.value.organization,
    country : this.userForm.value.country,
    state : this.userForm.value.state,
    city : this.userForm.value.city,
    zipCode : this.userForm.value.zipCode,
    phoneNumber : this.userForm.value.phoneNumber,
    // isSubscriptionEnabled : true
}
console.log(reqObj,this.crypto.encrypt(JSON.stringify(reqObj)),"reqObj")
payload.append('firstName', this.crypto.encrypt(JSON.stringify(reqObj)));
this.service.registrationContinue(payload).subscribe((res : any) => {
this.spinner.hide();
if(res.body.message == "User Details Saved Successfully!!") {
  let obj = {email : this.userId, password : this.userPsw}
    this.router.navigate(['/subscription'],{
      queryParams: { token: this.crypto.encrypt(JSON.stringify(obj))},
    });
//   Swal.fire({
//     title: 'Success!',
//     text: 'User details saved successfully. Please processed with subscription!',
//     icon: 'success',
//     showCancelButton: false,
//     allowOutsideClick: true
// }).then((result) => {
//   if (result.value) {
//     let obj = {email : this.userId, password : this.userPsw}
//     this.router.navigate(['/subscription'],{
//       queryParams: { token: this.crypto.encrypt(JSON.stringify(obj))},
//     });
//   }
// });
} else {
  this.spinner.hide();
  Swal.fire("Error",res.errorMessage,"error")
}
})
}

// To reset the error messages generated for country state and city
resetForm() {
  this.userForm.reset();
  this.errorMessage = "";
  this.errorMessage1 = "";
  this.errorMessage2 = ""
}

getErrorMessage(controlName: string): string {
  const control = this.userForm.get(controlName);

  if (control.touched && control.errors) {
    if (control.errors.required) {
      if (controlName == "jobTitle") {
        return "Job Title required"
      }
      else if (controlName == "organization") {
        return "Organization required"
      }
      else if (controlName == "zipCode") {
        return "Zip Code required"
      }
      return `${controlName} required`;
    }
    if (control.errors.minlength) {
      return "Minimum 2 characters required";
    }
    if (control.errors.pattern) {
      return "Only Numbers are allowed";
    }
  }

  return '';
}

checkOrganizationName(event : any) {
  console.log(event.target.value)
  this.service.organizationCheck(event.target.value).subscribe(res => {
    if (res.message == "Organization Name already Exists") {
      this.orgExsist = true;
    } else {
      this.orgExsist = false;
    }
  })
}

onKeydown(event){ 
  let numArray= ["0","1","2","3","4","5","6","7","8","9","Backspace","Tab","ArrowLeft","ArrowRight","Delete"]
     let temp =numArray.includes(event.key); //gives true or false
    if(!temp){
     event.preventDefault();
    } 
   }

   showValidateButton(event ){
    console.log(event.target.value.length)
    if(event.target.value.length == 6)
    this.isValidate = true
    else
    this.isValidate = false
   } 
}
