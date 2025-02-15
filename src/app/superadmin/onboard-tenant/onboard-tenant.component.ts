import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation, Output, EventEmitter, Input, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { Ng2TelInput } from 'ng2-tel-input';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services';
import { CryptoService } from 'src/app/_services/crypto.service';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { APP_CONFIG } from 'src/app/app.config';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-onboard-tenant',
  templateUrl: './onboard-tenant.component.html',
  styleUrls: ['./onboard-tenant.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class OnboardTenantComponent implements OnInit {
  @Input() userData: any;
  @Output() close_overlay = new EventEmitter();
  @Output() callEnterPriceRequest: EventEmitter<void> = new EventEmitter<void>();
  tenantForm: FormGroup;
  private spacialSymbolEncryption: string = "->^<-";
  public useremail: any;
  user: any;
  isRefresh: boolean = false;
  isInput: boolean;
  updateUser: any;
  phnCountryCode: any;
  countryInfo: any[] = [];
  stateInfo: any[] = [];
  cityInfo: any[] = [];
  country: any[];
  state: any[];
  city:any[];
  show: boolean = false;
  phnCountry: any='ux';
  fieldsEnabled: boolean = true;
  isFormOverlay: boolean = false;
  phoneNumber: any;
  jobTitle: any;
  errorMessage: any;
  errorMessage1: any;
  errorMessage2: any;
  firstName: any;
  lastName: any;
  company: any;
  expiryForm: any;
  minDate: string;
  data: any;
  datepickerPlacement = 'top';
  datePickerConfig: Partial<BsDatepickerConfig>;
  tenantDetails: any;
  departments:any;
  showErrorMessage : boolean = false;
  ispublicMail:boolean = false;
  isCreateAccount:boolean = false;
  orgExsist:boolean;
  productInfo: any[]=["EZFlow","AiAgents"];
  // productInfo: any[]=["EZFlow"];

  constructor(
    private formBuilder: FormBuilder,
    private service: FirstloginService,
    private cryptoService: CryptoService,
    private spinner: NgxSpinnerService,
    private tenant_api: ProfileService,
    private datePipe: DatePipe,
    private rest_api: UsermanagementService
 
  ) {
    this.tenantForm = this.formBuilder.group({
      userId: ["", [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$%])[a-zA-Z0-9@$%]{8,20}$")])],
      firstName: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
      lastName: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
      jobTitle: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
      company: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],     
      country: ["", Validators.required],
      department: ["", Validators.required],
      state: ["", Validators.required],
      city: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      expiryDate: ["", Validators.required],
      zipCode: ["", Validators.required],
      product: ["", Validators.required]
    });
    // this.datePickerConfig = {
    //   dateInputFormat: 'YYYY-MM-DD',
    //   minDate: new Date() // Disables all dates before today
    // };
    const today = new Date();
    this.minDate = this.formatDate(today);
  }

  ngOnInit() {
    this.getCountries();
    this.getAllDepartments();
}
  ngOnChanges(changes:SimpleChanges){
    if(this.userData){
    // this.getCountries();
    // this.getAllDepartments();
    const includePasswordControl = this.tenantForm.get('password');
    includePasswordControl.clearValidators();
    // includePasswordControl.setValidators([Validators.required])
    includePasswordControl.updateValueAndValidity();

        this.isCreateAccount = false;
        this.tenantForm.get("userId").setValue(this.userData["userId"]);
        this.tenantForm.get("firstName").setValue(this.userData["firstName"]);
        this.tenantForm.get("lastName").setValue(this.userData["lastName"]);
        this.tenantForm.get("jobTitle").setValue(this.userData["designation"]);
        this.tenantForm.get("company").setValue(this.userData["company"]);
        this.tenantForm.get("zipCode").setValue(this.userData["zipcode"]);
        this.tenantForm.get("phoneNumber").setValue(this.userData["phoneNumber"]);
        const matchingCountry = this.countryInfo.find((item: any) => item.name === this.userData["country"]);
        this.tenantForm.get("country").setValue(this.userData["country"]);
        this.tenantForm.get("product").setValue(this.userData["userProduct"]);
        this.onChangeCountry(this.userData["country"],"update");
      }else{
        this.isCreateAccount = true;
        const includePasswordControl = this.tenantForm.get('password');
        // includePasswordControl.clearValidators();
        includePasswordControl.setValidators([Validators.required])
        includePasswordControl.updateValueAndValidity();
      }

        // const matchingState = this.stateInfo.find((item: any) => item.name === this.userData["state"]);
        // this.cityInfo = this.cityInfo.filter((city: any) => city.countryCode === matchingState.countryCode && city.stateCode === matchingState.isoCode);
        // if (this.stateInfo.length === 0) {
        //   this.tenantForm.get("state").setValue('NA');
        //   this.tenantForm.get("city").setValue('NA');
        // }
        // if (this.cityInfo.length === 0) {
        //   this.tenantForm.get("city").setValue('NA');
        // }
  }

  updateAccount(type) {
    this.spinner.show();
    var payload = new FormData();
    var reqObj = {}
    const originalDate = new Date(this.tenantForm.value.expiryDate);
    let expiryDate = this.datePipe.transform(originalDate, 'EEE MMM dd yyyy')
    reqObj = {
      userId : this.tenantForm.value.userId.toLowerCase(),
      firstName: this.tenantForm.value.firstName,
      lastName: this.tenantForm.value.lastName,
      designation : this.tenantForm.value.jobTitle,
      departmemt : this.tenantForm.value.department,
      company : this.tenantForm.value.company,
      country : this.tenantForm.value.country,
      state : this.tenantForm.value.state,
      city : this.tenantForm.value.city,
      phoneNumber : this.tenantForm.value.phoneNumber,
      'zipcode': this.tenantForm.value.zipCode,
      'profile_image':null,
      'otp': "",
      'isSubscriptionEnabled': false,
      // password:"Welcome@123"
      // expiryDate : this.datePipe.transform(originalDate, 'EEE MMM dd yyyy'),
  }

  if(type == "create"){
    reqObj["password"] = this.tenantForm.value.password;
    reqObj["expiresAt"] = expiryDate;
    reqObj["userProduct"] = this.tenantForm.value.product;
  }
  console.log(reqObj)
  // console.log(this.tenantForm.value,"this.tenantForm.value.expiryDate")
  payload.append('firstName', this.cryptoService.encrypt(JSON.stringify(reqObj)));
  // payload.append('expairyData', this.cryptoService.encrypt(JSON.stringify(reqObj)));
  // console.log(this.cryptoService.encrypt(JSON.stringify(reqObj)),"superadmin")
  if(type != "create"){
    this.onBoardEnterPriseTenant(payload,this.tenantForm.value.userId.toLowerCase())
  }else{
    this.createEnterPriseTenant(payload);
  }

  }

  createEnterPriseTenant(payload){
    this.close_overlay.emit(false);

    this.service.createEnterPriseUser(payload).subscribe((res : any) => {
      if(res.errorCode == 5019){
          Swal.fire({title: 'Error!',text: res.errorMessage,icon: 'error',showCancelButton: false,allowOutsideClick: true})
      this.spinner.hide();
      } else {
        this.close_overlay.emit(true);
        Swal.fire({
          title: 'Success!',
          text: `Successfully Created Tenant!`,
          icon: 'success',
          showCancelButton: false,
          allowOutsideClick: true
        })
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      Swal.fire("Error", "Error Occured", "error");
    })
  }

  onBoardEnterPriseTenant(payload,userId){
    this.close_overlay.emit(false);
    const originalDate = new Date(this.tenantForm.value.expiryDate);
    let expiryDate = this.datePipe.transform(originalDate, 'EEE MMM dd yyyy')
    this.service.onboardUserUpdate(payload).subscribe((res : any) => {
      if(res.errorCode == 5019){
          Swal.fire({
          title: 'Error!',
          text: res.errorMessage,
          icon: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })
      this.spinner.hide();
      } else {
        var reqData  = {
          userId : this.tenantForm.value.userId.toLowerCase(),
          expiresAt : new Date(expiryDate)
        }
        this.rest_api.onBoardTenant(reqData).subscribe((response: any) => {
          this.spinner.hide();
          this.rest_api.convertUserToEnterPrise(userId).subscribe(res=>{});
          this.close_overlay.emit(true);
          this.callEnterPriceRequest.emit();
          Swal.fire({
            title: 'Success!',
            text: `Successfully Created Tenant!`,
            icon: 'success',
            showCancelButton: false,
            allowOutsideClick: true
          })
          this.spinner.hide();
        })
      }
    }, err => {
      this.spinner.hide();
      Swal.fire("Error", "Error Occured", "error");
    })
  }

  getCountries() {
    this.countryInfo = Country.getAllCountries();
  }


  onChangeCountry(countryValue,type) {
    this.isInput = !this.isInput;
    this.countryInfo = Country.getAllCountries();
    this.stateInfo = State.getAllStates();
    if(countryValue){
        const matchingCountry = this.countryInfo.find((item: any) => item.name == countryValue);
        this.phnCountry = matchingCountry.isoCode.toLowerCase();
        this.stateInfo = this.stateInfo.filter((state: any) => state.countryCode === matchingCountry.isoCode)
        this.errorMessage=""
        if (this.stateInfo.length === 0) {
          this.stateInfo = [{ name: 'NA' }]
          this.cityInfo = [{ name: 'NA' }];
        }
        if(type=="update"){
          setTimeout(() => {
            this.onChangeState(this.userData["state"],"update");
            this.tenantForm.get("state").setValue(this.userData["state"]);
          }, 100);
        }
    }

  }
  
  onChangeState(stateValue, type) {
    this.cityInfo = City.getAllCities();
    if(stateValue){
      const matchingState = this.stateInfo.find((item: any) => item.name == stateValue);
        this.cityInfo = this.cityInfo.filter((city: any) => city.countryCode === matchingState.countryCode && city.stateCode === matchingState.isoCode);
        this.errorMessage1=""
      if (this.cityInfo.length === 0) {
        this.cityInfo = [{ name: 'NA' }];
      }
      if(type =="update"){
        this.tenantForm.get("city").setValue(this.userData["city"]);
      }
    }

  }
  
  onChangeCity(cityValue){
    if(cityValue){
      this.errorMessage2 =''
    }
  }
  
  OnFlagChange(event : any, phonecode : any) {
    if(event.name != this.tenantForm.value.country.name){
      this.showErrorMessage = true;
      this.errorMessage = "Please Select Appropriate Country";
      this.errorMessage1 = "Please Select Appropriate State";
      this.errorMessage2 = "Please Select Appropriate City"
    }
  }

  lettersOnly(event): boolean {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
    if ((event.target.selectionStart === 0 && event.code === 'Space')) {
      event.preventDefault();
    }
  }

  numbersOnly(event): boolean {
    var regex = new RegExp("^[0-9]+$"); 
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  }

  // OnFlagChange(event, phonecode) {
  //   var code = event.iso2;
  //   var testcode = code.toString().toUpperCase();
  //   if (testcode != phonecode) {
  //     this.showErrorMessage = true;
  //     this.errorMessage = "Please Select Appropriate Country *";
  //     this.errorMessage1 = "Please Select Appropriate State *";
  //     this.errorMessage2 = "Please Select Appropriate City *"
  //     this.tenantForm.get('state').enable();
  //     this.tenantForm.get('city').enable();
  //   }
  //   const selectedCountry = this.countryInfo.find((item: any) => item.isoCode == code);
  //   this.fieldsEnabled = State.getStatesOfCountry(selectedCountry.isoCode).length > 0;
  // }
  
  get f() {
    return this.tenantForm.controls;
  }
  
  // expiryDate() {
  //   this.expiryForm = this.formBuilder.group({
  //   expiryDate: [null]
  //   });
  // }

  // setMinDate() {
  //   const today = new Date();
  //   this.minDate = today;
  // }

  resetForm() {
    this.tenantForm.reset();
    this.errorMessage = "";
    this.errorMessage1 = "";
    this.errorMessage2 = "";
  }

  getAllDepartments(){
    this.service.getAllDepartments().subscribe(response=> {
      this.departments = response;  
        this.tenantForm.get("department").setValue(this.userData["department"]);
    })
  }
  loopTrackBy(index, term){
    return index;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getErrorMessage(controlName: string): string {
    const control = this.tenantForm.get(controlName);
  
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
        return "Minimum 5 characters required";
      }
      if (control.errors.pattern) {
        return "Space between words are allowed";
      }
    }
  
    return '';
  }

  onKeydown(event){ 
    let numArray= ["0","1","2","3","4","5","6","7","8","9","Backspace","Tab","ArrowLeft","ArrowRight","Delete"]
       let temp =numArray.includes(event.key); //gives true or false
      if(!temp){
       event.preventDefault();
      } 
  }

  closeOverlay(){
    this.close_overlay.emit(true)
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
}

