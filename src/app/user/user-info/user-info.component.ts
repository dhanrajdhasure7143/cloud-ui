import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Particles } from '../../_models/particlesjs'
import { CookieStore } from 'src/app/_services/cookie.store';
import { APP_CONFIG } from './../../app.config';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptoService } from '../../_services/crypto.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { AppService, AuthenticationService } from '../../_services';
import { SharedDataService } from 'src/app/_services/shared-data.service';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  constructor( @Inject(APP_CONFIG) private config,private router: Router,
    private formBuilder: FormBuilder,private particles :Particles,private crypto:CryptoService,
    private spinner:NgxSpinnerService,private profileService:ProfileService, private api:AppService,
    private authenticationService:AuthenticationService,private sharedData: SharedDataService) { }

  userForm:FormGroup;
  submitted=false;
  public userRole:any = [];
  userId:any;
  error:boolean=false;
  private spacialSymbolEncryption:string = '->^<-';
  ngOnInit() {
    this.particles.getParticles();
    // document.cookie = "old_ux=false";
    // if(this.getCookie("new_reg_flow")!="false" || this.getCookie("new_reg_flow")==undefined){
    //   document.cookie = "new_reg_flow=true";

    // }
    this.userId=localStorage.getItem('userName')
  
    this.formGroup()
  }

  formGroup(){
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName:['',Validators.required],
      oldPassword:['',Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$%])[a-zA-Z0-9@$%]{8,20}$/)])],
      password:['',Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$%])[a-zA-Z0-9@$%]{8,20}$/)])],
      confirmPassword:['',Validators.required],
      userId:this.userId
  });
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
  get f() { return this.userForm.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.userForm.invalid){
      return;
    }
    else{
     this.updateAccount()
     // this.authenticate()
    }
  }
  updateAccount() {
   
    let encrypt =this.spacialSymbolEncryption +this.crypto.encrypt(JSON.stringify(this.userForm.value));
    let reqObj = {"enc": encrypt};
  
   
    this.api.updateUser(reqObj).subscribe(res => {
   
      if(res.message=='User has been updated successfully'){
        Swal.fire({
          title: "Success",
          text: "User Details Updated Successfully!!",
          type: 'success',
        }).then(()=>{
         // localStorage.setItem('ProfileuserId',this.userId)
          this.authenticationService.userDetails(this.userId).subscribe(data => this.checkSuccessCallback(data));

     
          setTimeout(() => {
            
            this.spinner.hide();
           // 
           },2000);
        });
        
      } else if(res.errorMessage == "Your current password was incorrect."){
        Swal.fire("Error","Your current password was incorrect.","error");
      } else if (res.errorMessage == "New Password and Confirm Password are not Matching "){
        Swal.fire("Error","New Password and Confirm Password are not Matching.","error");
      }
   
   
    
    }, err => {
      Swal.fire("Error","Please try again!","error");
     
    });

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
    this.authenticate();
    //this.userService.getRole(data.company,data.userId).subscribe(data => this.getRoles(data));
  }
  authenticate() {
    
    this.spinner.show();
   
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
  //  if(this.config.isNewDesignEnabled && this.getCookie("old_ux")!=="true")
  if(this.config.isNewDesignEnabled)
        productURL = this.config.newproductendpoint;
        this.spinner.hide();
       
        window.location.href=productURL+"/#/pages/home?accessToken="+encryptToken+'&refreshToken='+encryptrefreshToken+'&firstName='+firstName+'&lastName='+lastName+'&ProfileuserId='+this.userId+'&tenantName='+tenantName+'&authKey='+useridBase64+'&userIp='+userIp
        
        //window.location.href="http://localhost:4000"+"/#/pages/home?accessToken="+encryptToken+'&refreshToken='+encryptrefreshToken+'&firstName='+firstName+'&lastName='+lastName+'&ProfileuserId='+ProfileuserId+'&tenantName='+tenantName+'&authKey='+useridBase64+'&userIp='+userIp
     }
   
    
  
} 
