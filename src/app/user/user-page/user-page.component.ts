// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { CryptoService } from 'src/app/_services/crypto.service';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnInit {
  userForm: FormGroup;
  departments = ['Engineering', 'HR', 'Finance', 'Infra', 'Admin'];
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
  state: any;
  city: any;
  user: any;
  userEmail : any;

  clearFormValues = {
    jobTitle: '',
    organization: '',
    department: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    phoneNumber: ''
  };

  constructor(private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private service: FirstloginService,
              private crypto:CryptoService,
              private router: Router
              ) {
    this.route.queryParams.subscribe((data)=>{
      this.user = data.name,
      this.userEmail = data.email
    })
   }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      jobTitle: ['', [Validators.required, Validators.minLength(2)]],
      organization: ['', [Validators.required, Validators.minLength(2)]],
      department: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNumber: ['', Validators.required]

    });
    this.getCountries();

    this.userForm.get('country').valueChanges.subscribe((selectedCountry) => {
      if (selectedCountry) {
        this.userForm.get('state').setValue('');
        this.userForm.get('city').setValue('');
      }
    });

    this.userForm.get('state').valueChanges.subscribe((selectedState) => {
      if (selectedState) {
        this.userForm.get('city').setValue('');
      }
    });
  }

  clearAllFields() {
    this.userForm.reset(this.clearFormValues);
  }

  getCountries() {
    this.countryInfo = Country.getAllCountries();
  }

  onChangeCountry(countryValue) {
    this.isInput = !this.isInput;
    this.stateInfo = State.getAllStates();

    if (countryValue) {
      const matchingCountry = this.countryInfo.find((item: any) => item.name == countryValue);
      this.phnCountry = matchingCountry.isoCode;
      this.stateInfo = State.getStatesOfCountry(matchingCountry.isoCode)
      this.errorMessage = ""
    }
  }

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
  }

  onChangeCity(cityValue) {
    if (cityValue) {
      this.errorMessage2 = ''
    }
  }

  hasError(event: any): void {
    // Handle hasError event
  }

  getNumber(event: any): void {
    // Handle getNumber event
  }

  telInputObject(event: any): void {
    // Handle telInputObject event
  }

  onPhnCountryChange(event: any): void {
    // Handle phnCountryChange event
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

  onKeydown(event) {

    let numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"]
    let temp = numArray.includes(event.key); //gives true or false
    if (!temp) {
      event.preventDefault();
    }
  }

  OnFlagChange(event) {
      if(event.name != this.country){
      this.errorMessage="Please Select Appropriate Country *";
      this.errorMessage1="Please Select Appropriate State *";
      this.errorMessage2="Please Select Appropriate City *"
    }
  }
  
  get f() {
    return this.userForm.controls;
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
        return "Only Alphabets and Numbers are allowed";
      }
    }

    return '';
  }

  registrationSave(){
    console.log(this.userForm.value,"hello")
    var payload = new FormData();
    var reqObj = {}
    reqObj = {
      userId : this.userEmail,
      jobTitle : this.userForm.value.jobTitle,
      department : this.userForm.value.department,
      organization : this.userForm.value.organization,
      country : this.userForm.value.country,
      zipCode : this.userForm.value.zipCode,
      phoneNumber : this.userForm.value.phoneNumber
}
payload.append('firstName', this.crypto.encrypt(JSON.stringify(reqObj)));
this.service.registrationContinue(payload).subscribe((res : any) => {
  if(res.body.code == 200) {
    Swal.fire({
      title: 'Success!',
      text: res.message,
      icon: 'success',
      showCancelButton: false,
      allowOutsideClick: true
    })
    this.router.navigate(['/']);
  } else {
    Swal.fire("Error",res.errorMessage,"error")
  }
  })
}

}