import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../_models/user';
import { APP_CONFIG } from './../app.config';
import { FirstloginService } from './@providers/firstlogin.service';
import Swal from 'sweetalert2';
import { Base64 } from 'js-base64';
// import  countries  from './../../assets/jsons/countries.json';
import { Country, State, City }  from 'country-state-city';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { mergeMapTo } from 'rxjs/operators';
import { CryptoService } from '../_services/crypto.service';
import { ProductlistService } from '../_services/productlist.service';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthenticationService } from '../_services';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.component.html',
  styleUrls: ['./firstlogin.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class FirstloginComponent implements OnInit {
  model: User;
  decodedToken: any = {};
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  departments:any[]=[];
  phnCountry: any;
  itemsShowLimit = 1;
  isdiable:boolean=false;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  selectedvalue: string = '';
  college: boolean = false;
  submitflag:boolean=false;
  public show:boolean=true;
  public otherDepartment:any;
  isCompanydisabled:boolean=false;
  selectedFile: any;
  data: any;
  domain: any;
  isInput: boolean = false;
  categories:any[] = [];
  userEmail:any;
  profileimage:any;
  showErr:any;
  base64textString:any;
  private spacialSymbolEncryption:string = '->^<-';
  public imgsrc:string = './../../assets/images/user-upload.png';
  public company_name:any='';
  allplans: string[]  = [
    'Free Tier',
    'Professional',
    'Enterprise'
  ];
  newAccessToken: any[];
  public ipAddress:string; 
  agent: string;
  public deviceInfo = null;
  orgExsist:boolean;
  otp:any="";
  public otpflag:boolean = false;
  public hide:boolean = false;
  otpBtn = "Send Code";
  errorMessage: any;
  errorMessage1: any;
  errorMessage2: any;

  constructor(@Inject(APP_CONFIG) private config, private router: Router, 
              private service: FirstloginService,
              private route: ActivatedRoute,
              private productservice: ProductlistService,
              private http: HttpClient,
              private deviceService: DeviceDetectorService,
              private cryptoService :CryptoService,
              private authenticationService:AuthenticationService,
              private firstloginservice: FirstloginService,
              private spinner:NgxSpinnerService
              ) {
    this.route.queryParams.subscribe(params => {
      if(params['token'] != undefined){
      
      var token=params['token']
      this.decodedToken = Base64.decode(token)
      this.userEmail = Base64.decode(token);
      // console.log("decoded token = "+this.decodedToken);
     this.service.verifyToken(token).subscribe(response=>{
      this.onSuccessOfVerifyToken(response)},err=>{
      
       
        this.router.navigate((['/user']));
         
       })
    }else{
      var inviteId = params['inviteId']
      var userId = params['userId']
      this.decodedToken = Base64.decode(userId);
      this.userEmail = Base64.decode(userId);
      this.service.verifyInvitee(inviteId).subscribe(response =>{
        this.onSuccessOfConfirmToken(response)
      } ,err=>{
          this.router.navigate(['/user']);
        })
      
    }
    });
     }

  ngOnInit() {
    document.cookie = "card_enabled="+environment.isSubscrptionEnabled;
    if(this.getCookie("card_enabled")!="false"){
      document.cookie = "card_enabled=true";
    }
    
    this.getCountries();
    this.getAllDepartments();

    this.model = new User();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'ID',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: this.itemsShowLimit,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.model.plans="Standard"
    
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
  getCountries(){
    this.countryInfo = Country.getAllCountries();
  }
  getAllDepartments(){
    this.service.getAllDepartments().subscribe(response=> {
      this.departments = response;      
    })
  }

  onChangeDepartment(selectedvalue) {
  
    if(selectedvalue == "others"){
      this.college = true
    }else{
      this.college = false;
    }
  }
  onChangeCountry(countryValue) {
    this.isInput = !this.isInput;
    this.stateInfo = State.getAllStates();
    if(countryValue){
        const matchingCountry = this.countryInfo.find((item: any) => item.name == countryValue);
        this.phnCountry = matchingCountry.isoCode;
        this.stateInfo = this.stateInfo.filter((state: any) => state.countryCode === matchingCountry.isoCode)
        this.errorMessage=""
    }
    // this.model.country = this.countryInfo[countryValue].CountryName;
    // this.stateInfo=this.countryInfo["India"].States;
 
  //   this.stateInfo=[];
  //   for(var i=0; i< this.countryInfo.length; i++){
  //     if(this.countryInfo[i].CountryName == countryValue ){
  //       this.phnCountry = this.countryInfo[i].CountryCode
  //       this.stateInfo=this.countryInfo[i].States; 
  //     }else{
  //       this.errorMessage =""
  //     }
  //   }
  // this.cityInfo=[];
  // this.model.state="1";
  // this.model.city="1";
  }

  onChangeState(stateValue) {
    this.cityInfo = City.getAllCities();
    if(stateValue){
      const matchingState = this.stateInfo.find((item: any) => item.name == stateValue);
        this.cityInfo = this.cityInfo.filter((city: any) => city.countryCode === matchingState.countryCode && city.stateCode === matchingState.isoCode);
        this.errorMessage1=""
      if (this.cityInfo.length === 0) {
        this.cityInfo = [{ name: 'NA' }];
      }
    }
  
    // this.cityInfo=[];
    // this.model.state =this.stateInfo[stateValue].StateName
    // console.log("state : " + this.model.state);
    // this.cityInfo=this.stateInfo[stateValue].Cities;
    // for(var i=0; i< this.stateInfo.length; i++){
    //   if(this.stateInfo[i].StateName == stateValue ){
    //     this.cityInfo=this.stateInfo[i].Cities; 
    //   }else{
    //     this.errorMessage1 =''
    //   }
    // }
    // this.model.city="1"
  }
  
  onChangeCity(cityValue){
    if(cityValue){
      this.errorMessage2 =''
    }
  }
  onSuccessOfVerifyToken(response: any) {
    if(response){
      if(response.errorMessage==='Token invalid'){
        Swal.fire({
          title: 'Error',
          text: `This email has been already registered with us. Please register with different email.`,
          icon: 'error',
          showCancelButton: false,
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/user']);
          }
        });
        // this.router.navigate(['/user']);
      }else if(response.company!=null){
        this.isCompanydisabled = true;
        this.model.company = response.company;
        this.company_name=response.company
        let x = this.decodedToken.split("@");
            this.domain = x[1];
        this.service.getAllCategories(this.domain).subscribe(response=> {
          this.departments = response.data;  
          this.departments.forEach(element => {
            this.categories.push(element)
            
          });  
         
        })
      }
    }
     
    }
    onSuccessOfConfirmToken(response: any){
      this.isCompanydisabled = true;
      this.model.company = response.company;
      let x = this.decodedToken.split("@");
      this.domain = x[1];
  this.service.getAllCategories(this.domain).subscribe(response=> {
    this.departments = response.data;  
    this.departments.forEach(element => {
      this.categories.push(element.categoryName)
      
    });  
    
  })
     if(response.message === 'Invalid User Invite' || response.message === 'User Invitation  Already Confirmed'){
      this.router.navigate(['/user']);
     }
     

    }


  onSubmit() {
    this.submitflag=true;
    // console.log(this.model);
    if(this.model.department=="others"){
      this.model.department=this.otherDepartment;
          }
    const userDetails = JSON.parse(JSON.stringify(this.model));
    //localStorage.setItem('phoneNumber',userDetails.phoneNumber);
    //localStorage.setItem('company',userDetails.company);
   // userDetails.country = this.model.country[;
    userDetails.userId = this.decodedToken;
    userDetails.department = this.model.department;
   var payload = new FormData();
  //  payload.append('userId', userDetails.userId);
  //  payload.append('firstName', userDetails.firstName);
  //  payload.append('lastName', userDetails.lastName);
  //  payload.append('password', userDetails.password);
  //  payload.append('phoneNumber', userDetails.phoneNumber);
  //  payload.append('country', userDetails.country);
  //  payload.append('designation', userDetails.designation);
  //  payload.append('company', userDetails.company);
  //  payload.append('state', userDetails.state);
  //  payload.append('city', userDetails.city);
  //  payload.append('zipcode', userDetails.zipcode);
  //  payload.append('department', userDetails.department);

  //  if(this.selectedFile!=undefined){
  //   var test=this.cryptoService.encrypt(JSON.stringify(this.selectedFile))
  //   console.log(test);
  //  payload.append('profilePic', test, this.selectedFile.name);
  // }
  var reqObj = {}
  reqObj = {
    'userId': userDetails.userId.toLowerCase(),
    'firstName': userDetails.firstName,
    'lastName': userDetails.lastName,
    'password': userDetails.password,
    'phoneNumber': userDetails.phoneNumber,
    'country': userDetails.country,
    'designation': userDetails.designation,
    'company': userDetails.company,
    'state': userDetails.state,
    'city': userDetails.city,
    'zipcode': userDetails.zipcode,
    'department': userDetails.department,
    'profile_image':this.base64textString
  }
  // if(this.selectedFile!=undefined){
  //   reqObj['profilePic'] = payload;
  //   reqObj['profilePicName'] = this.selectedFile.name;
  // }
  
  payload.append('firstName', this.cryptoService.encrypt(JSON.stringify(reqObj)));
  // for (var key in payload) {
  //   console.log(key, payload[key]);  
  // }

  // new Response(payload).text().then(console.log)

  
    this.service.registerUser(payload).subscribe(res => {
      this.data=res
      sessionStorage.clear();
      localStorage.clear();
      if(this.data.body.errorMessage==='Uploaded file is too large')
      {
        Swal.fire({
          title: 'Error!',
          text: "Uploaded file is too large",
          icon: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })
      }
     else if(this.data.body.errorMessage==='Uploaded file is not supported')
      {
        Swal.fire({
          title: 'Error!',
          text: "Please upload png or jpg image",
          icon: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })
      }
    else {
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

  onCancel() {
    localStorage.clear();
    sessionStorage.clear();
    location.href = this.config.portfolioSite;
  }
  onKeydown(event){
    
    let numArray= ["0","1","2","3","4","5","6","7","8","9","Backspace","Tab","ArrowLeft","ArrowRight","Delete"]
       let temp =numArray.includes(event.key); //gives true or false
      if(!temp){
       event.preventDefault();
      } 
     }
  toggle() {
    this.show = !this.show;
  }
  resetForm(form:NgForm) {
    form.resetForm();
    var me = this;
    this.model = new User();
    setTimeout(() => {
      me.decodedToken = me.userEmail.toLowerCase();
        if(this.company_name){
          this.model.company=this.company_name
        }
    }, 100);
    this.otpBtn="Get OTP";
     this.isdiable=false;
    $("#image").val('')
    this.selectedFile=null;

  }
    loopTrackBy(index, term){
    return index;
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

    onFileSelected(event){
      if(event.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event:any)=>{
         
          this.imgsrc = event.target.result;
        
        }
      }
      
      this.selectedFile=<File>event.target.files[0]
      $("#image").val(this.selectedFile.name)
      this.getBase64pic(this.selectedFile)
    }
    getBase64pic(file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoadedpic.bind(this);
      reader.readAsBinaryString(file);
    }
    
    _handleReaderLoadedpic(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.base64textString = btoa(binaryString);
    }

    onClick(){
     
      if (this.getCookie("card_enabled")=="true") {
        var reqObj1 = {
          'userId': this.decodedToken,
          'firstName': this.model.firstName,
          'lastName': this.model.lastName,
          'password': this.model.password,
          'phoneNumber': this.model.phoneNumber,
          'country': this.model.country,
          'designation': this.model.designation,
          'company': this.model.company,
          'state': this.model.state,
          'city': this.model.city,
          'zipcode': this.model.zipcode,
          'department': this.model.department,
          'profile_image': this.base64textString
        }
        const userDetails = Base64.encode(JSON.stringify(reqObj1))
        localStorage.setItem('details', userDetails);

        localStorage.setItem("selectedplan", this.model.plans)
        var userId = this.cryptoService.encrypt(JSON.stringify(this.decodedToken));
        var useridBase64 = btoa(userId);
        var authkey = atob(useridBase64)
        console.log(authkey)
        localStorage.setItem("authkey", authkey)
        if (this.model.plans == 'Enterprise') {
          window.location.href = "https://www.epsoftinc.com/"
        }
        else {
          this.spinner.hide();
          this.router.navigate(['/home/add-card']);
        }

      }
      else {
      var payload = new FormData();
      var reqObj = {
          'userId': this.decodedToken,
          'firstName':this.model.firstName,
          'lastName': this.model.lastName,
          'password': this.model.password,
          'phoneNumber':this.model.phoneNumber,
          'country': this.model.country,
          'designation': this.model.designation,
          'company': this.model.company,
          'state': this.model.state,
          'city': this.model.city,
          'zipcode': this.model.zipcode,
          'department': this.model.department,
          'profile_image':this.base64textString,
          'otp':this.model.otp
        }

        //added for otp and registration directly
        payload.append('firstName', this.cryptoService.encrypt(JSON.stringify(reqObj)));
        this.spinner.show()
        this.firstloginservice.registerUser(payload).subscribe(res => {
          console.log(res);
          this.spinner.hide()
          Swal.fire("Success","Registered Successfully!","success")
          //this.router.navigate(['/home/add-card']);
          this.router.navigate(['/']);

        },err=>{
          this.spinner.hide()
            Swal.fire("Error","Registration failed","error");
        })
      }
        //added for otp and registration directly
      //-----------------commented temproryly----------------------
  
      // const userDetails = Base64.encode(JSON.stringify(reqObj))
      // localStorage.setItem('details',userDetails);
      
      //  localStorage.setItem("selectedplan",this.model.plans)
      //  var userId= this.cryptoService.encrypt(JSON.stringify(this.decodedToken));
      //  var useridBase64 = btoa(userId);
      //  var authkey=atob(useridBase64)
      
      //  localStorage.setItem("authkey",authkey)
      //------------------------------------------------------------------
      // if(this.model.plans=='Enterprise'){
      //   window.location.href = "https://www.epsoftinc.com/"
      // }
      // else{
      //   Swal.fire("Success","Registered Successfully","success")
      //   //this.router.navigate(['/home/add-card']);
      //  // this.router.navigate(['/']);
      // }
    }

  checkOrganizationName(value) {
    this.service.organizationCheck(value).subscribe(res => {
      if (res.message == "Organization Name already Exists") {
        this.orgExsist = true;
      } else {
        this.orgExsist = false;
      }
    })
  }



  getOTP()
  {
    
    this.spinner.show()
    //alert(this.userEmail)
    this.isdiable=true;
    this.call();
  
    this.authenticationService.generateOTP(this.userEmail.toLowerCase()).subscribe(data => {
      
      this.otpflag=true;
      this.spinner.hide()
      Swal.fire("Success","Code sent successfully to EMail !","success");
     this.otpBtn="Resend code";
    },err=>{
      console.log(err);
      this.spinner.hide()
      Swal.fire("Error","Unable to send Code","error")
    })
  }

  call(){
    setTimeout(()=>{                           // <<<---using ()=> syntax
   this.isdiable=false;
  }, 30000);
  }

  validateOTP()
  {
    this.spinner.show()
     this.authenticationService.validateOTP(this.userEmail.toLowerCase(),this.model.otp).subscribe((data:any)=>{ 
     
      if(data.message=="OTP Verified Successfully")
        {
         
          this.onClick()
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

  OnFlagChange(event){
    if(event.name !=this.model.country){
      this.errorMessage="Please Select Appropriate Country *";
      this.errorMessage1="Please Select Appropriate State *";
      this.errorMessage2="Please Select Appropriate City *"
    }
  }
}
