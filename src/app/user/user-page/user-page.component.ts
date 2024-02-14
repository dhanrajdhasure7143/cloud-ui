import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, State, City } from 'country-state-city';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
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
  fieldsEnabled: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private service: FirstloginService) {
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
  }

  ngOnInit(): void {
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

  // For Phone number to accept numbers
  onKeydown(event) {
    let numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"]
    let temp = numArray.includes(event.key); //gives true or false
    if (!temp) {
      event.preventDefault();
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

  // To reset the error messages generated for country state and city
  resetForm() {
    this.userForm.reset();
    this.errorMessage = "";
    this.errorMessage1 = "";
    this.errorMessage2 = ""
  }
}