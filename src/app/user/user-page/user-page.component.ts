import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { NgxSpinnerService } from 'ngx-spinner';
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
  userEmail : any;
  fieldsEnabled: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private service: FirstloginService,
              private crypto:CryptoService,
              private router: Router,
              private spinner: NgxSpinnerService
              ) {
    this.route.queryParams.subscribe((data)=>{
      this.user = data.name,
      this.userEmail = data.email
    })
   }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      jobTitle: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
      organization: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
      zipCode: ["", Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(6)])],
      department: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      phnCountry: [''],
    });
    this.getCountries();
    this.getAllDepartments();
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
      this.userForm.get('state').disable();
      this.userForm.get('city').disable();
      this.userForm.get('state').clearValidators();
      this.userForm.get('state').updateValueAndValidity();
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

  // Accepting only letters in the Job title, organization fields
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
      this.errorMessage = "Please Select Appropriate Country *";
      this.errorMessage1 = "Please Select Appropriate State *";
      this.errorMessage2 = "Please Select Appropriate City *"
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
  this.spinner.hide();
  if(res.body.code == 200) {
    Swal.fire({
      title: 'Success!',
      text: res.body.message,
      icon: 'success',
      showCancelButton: false,
      allowOutsideClick: true
  }).then((result) => {
    if (result.value) {
      this.router.navigate(['/subscription'],{
        queryParams: { email : this.userEmail },
      });
    }
  });
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
        return "Only Alphabets and Numbers are allowed";
      }
    }

    return '';
  }
}
