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
  @Input() userData: any[] = [];
  @Output() valueChange = new EventEmitter();
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
  pswdmodel: any = {};
  public eyeshow: boolean = true;
  public neweyeshow: boolean = true;
  public confeyeshow: boolean = true;
  show: boolean = false;
  phnCountry: any;
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
  minDate: Date;
  data: any;
  datepickerPlacement = 'top';
  datePickerConfig: Partial<BsDatepickerConfig>;
  tenantDetails: any;
  departments:any
 
  constructor(
    private formBuilder: FormBuilder,
    private service: FirstloginService,
    private cryptoService: CryptoService,
    private spinner: NgxSpinnerService,
    private tenant_api: ProfileService,
 
  ) {
    this.tenantForm = this.formBuilder.group({
      userId: ["", [Validators.required, Validators.email]],
      firstName: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
      lastName: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
      jobTitle: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
      company: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],     
      country: ['', Validators.required],
      departmemt: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      phnCountry: [''],
      expiryDate: ['', Validators.required],
    });
    this.datePickerConfig = {
      dateInputFormat: 'YYYY-MM-DD',
      minDate: new Date() // Disables all dates before today
    };
  }

  ngOnInit() {
    
    this.userDetails();
    this.getAllDepartments();
    // this.getOnboardTenantDetails(this.data);
}
  ngOnChanges(changes:SimpleChanges){
    console.log("testing",this.userData);
    this.tenantForm.get("userId").setValue(this.userData["userId"]);
    this.tenantForm.get("firstName").setValue(this.userData["firstName"]);
    this.tenantForm.get("lastName").setValue(this.userData["lastName"]);
    this.tenantForm.get("jobTitle").setValue(this.userData["designation"]);
    this.tenantForm.get("company").setValue(this.userData["company"]);
    this.tenantForm.get("phoneNumber").setValue(this.userData["phoneNumber"]);
    this.tenantForm.get("country").setValue(this.userData["country"]);
    this.tenantForm.get("state").setValue(this.userData["state"]);
    this.tenantForm.get("city").setValue(this.userData["city"]);
    this.onChangeCountry(this.userData["country"])
    this.onChangeState(this.userData["state"])
    this.onChangeCity(this.userData["city"])
  }

  // getOnboardTenantDetails(data:any) {
  //   this.tenant_api.getOnboardTenantDetails(data).subscribe((response:any)=>{
  //     this.tenantDetails = response;
  //     console.log("tenantDetails:", this.tenantDetails);
  //   });
  // }

  updateAccount() {
    console.log(this.tenantForm.value.expiryDate,"this.tenantForm.value.expiryDate")
    this.spinner.show();
    var payload = new FormData();
    var reqObj = {}
    reqObj = {
      userId : this.tenantForm.value.userId.toLowerCase(),
      firstName: this.tenantForm.value.firstName,
      lastName: this.tenantForm.value.lastName,
      designation : this.tenantForm.value.jobTitle,
      departmemt : this.tenantForm.value.departmemt,
      company : this.tenantForm.value.company,
      country : this.tenantForm.value.country,
      state : this.tenantForm.value.state,
      city : this.tenantForm.value.city,
      phoneNumber : this.tenantForm.value.phoneNumber,
      expiryDate : this.tenantForm.value.expiryDate,
  }
  console.log(this.tenantForm.value.expiryDate,"this.tenantForm.value.expiryDate")
  payload.append('firstname', this.cryptoService.encrypt(JSON.stringify(reqObj)));
  console.log(this.cryptoService.encrypt(JSON.stringify(reqObj)),"superadmin")

}

  userDetails() {
    this.getCountries();
    this.expiryDate();
    this.setMinDate();
  }

  getCountries() {
    this.countryInfo = Country.getAllCountries();
  }

  onChangeCountry(countryValue) {
    console.log(countryValue)
    this.isInput = !this.isInput;
    this.stateInfo = State.getAllStates();
    
    if (countryValue) {
      const matchingCountry = this.countryInfo.find((item: any) => item.name == countryValue);
      this.phnCountry = matchingCountry.isoCode;
      this.stateInfo = State.getStatesOfCountry(matchingCountry.isoCode);
      this.errorMessage = ""
    }
    if (this.stateInfo == null || this.stateInfo.length === 0) {
      this.tenantForm.get('state').disable();
      this.tenantForm.get('city').disable();
      this.tenantForm.get('state').clearValidators();
      this.tenantForm.get('state').updateValueAndValidity();
    }
    
    // Set the flag to true if there are states available, otherwise false
    this.fieldsEnabled = this.stateInfo && this.stateInfo.length > 0;
    
    if (this.fieldsEnabled) {
      this.tenantForm.get('state').enable();
      this.tenantForm.get('city').enable();
    } else {
      // Clear state and city values if there are no states available
      this.tenantForm.get('state').setValue('');
      this.tenantForm.get('city').setValue('');
    }
  }
  
  onChangeState(stateValue) {
    console.log(stateValue)
    this.cityInfo = City.getAllCities();
    if (stateValue) {
      const matchingState = this.stateInfo.find((item: any) => item.name == stateValue);
      this.cityInfo = this.cityInfo.filter((city: any) => city.countryCode === matchingState.countryCode && city.stateCode === matchingState.isoCode);
      this.errorMessage1 = ""
      this.tenantForm.get('state').setValue(stateValue);
      if (this.cityInfo.length === 0) {
        this.cityInfo = [{ name: 'NA' }];
      }
    }

    this.cityInfo.some((cityItem: any) =>{
      if(cityItem.name === this.userData["city"]){
        this.tenantForm.get('city').setValue(cityItem.name);
        this.tenantForm.get('city').setValue(this.userData["city"]);

      }

    } );
  }

  onChangeCity(cityValue) {
    console.log(cityValue)
    if (cityValue) {
      this.tenantForm.get('city').setValue(cityValue);
      this.errorMessage2 = ''
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

  OnFlagChange(event, phonecode) {
    var code = event.iso2;
    var testcode = code.toString().toUpperCase();
    if (testcode != phonecode) {
      this.errorMessage = "Please Select Appropriate Country *";
      this.errorMessage1 = "Please Select Appropriate State *";
      this.errorMessage2 = "Please Select Appropriate City *"
      this.tenantForm.get('state').enable();
      this.tenantForm.get('city').enable();
    }
    const selectedCountry = this.countryInfo.find((item: any) => item.isoCode == code);
    this.fieldsEnabled = State.getStatesOfCountry(selectedCountry.isoCode).length > 0;
  }
  
  get f() {
    return this.tenantForm.controls;
  }
  
  expiryDate() {
    this.expiryForm = this.formBuilder.group({
    expiryDate: [null]
    });
  }

  setMinDate() {
    const today = new Date();
    this.minDate = today;
  }

  resetForm() {
    this.tenantForm.reset();
    this.errorMessage = "";
    this.errorMessage1 = "";
    this.errorMessage2 = "";
  }

  getAllDepartments(){
    this.service.getAllDepartments().subscribe(response=> {
      this.departments = response;      
    })
  }
  loopTrackBy(index, term){
    return index;
  }
}

