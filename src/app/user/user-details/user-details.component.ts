import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, State, City } from 'country-state-city';

import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { CryptoService } from 'src/app/_services/crypto.service';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import { AppService, AuthenticationService } from 'src/app/_services';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { SessionService } from 'src/app/_services/session';
import { APP_CONFIG } from 'src/app/app.config';
import { ProfileService } from 'src/app/_services/profile.service';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

    userForm: FormGroup;
    showUserScreen: boolean = true;
    orgExsist: boolean = false;
    isErrorMessage: boolean = false;
    isInput: boolean = false;
    phnCountry: string = 'US'; // Initial country for phone number input
    isSubscriptionEnabled: boolean = false
    errorMessage: any;
    errorMessage1: any;
    errorMessage2: any;
    countryInfo: any[] = [];
    stateInfo: any[] = [];
    cityInfo: any[] = [];
    departments: any[] = [];
    userId: any
    userPsw: any;

    userEmail: string;
    userData: any;
    http: any
    constructor(
        private formBuilder: FormBuilder,
        private rest_api: FirstloginService,
        private crypto: CryptoService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private authservice: AuthenticationService,
        private sharedData: SharedDataService,
        private session: SessionService,
        @Inject(APP_CONFIG) private config,
        private profileService: ProfileService,
        private httpBackend: HttpBackend

    ) {
        this.http = new HttpClient(this.httpBackend);
        this.route.queryParams.subscribe((data) => {
            if (data) {
                let params: any = JSON.parse(this.crypto.decrypt(data.token));
                console.log("PARAMS", params)
                this.userData = params
                this.userId = params.userEmail
                //   this.userEmail = params.email;
                //   this.password = params.password;
            }
        })
    }

    ngOnInit() {
        this.spinner.show();
        this.isSubscriptionEnabled = environment.isSubscrptionEnabled
        this.initForm();
        this.getAllDepartments();
        this.getCountries();
    }

    initForm() {
        this.userForm = this.formBuilder.group({
            jobTitle: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
            // organization: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'), Validators.minLength(2), Validators.maxLength(30)])],
            zipCode: ["", Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(5), Validators.maxLength(6)])],
            department: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            // phoneNumber: ['', [Validators.required, Validators.pattern(/^((\+91-?)|0)?[0-9]{10}$/)]],
        });
    }

    get f() { return this.userForm.controls; }

    getErrorMessage(controlName: string): string {
        const control = this.userForm.get(controlName);
        if (control.touched && control.errors) {
            if (control.errors.required) {
                if (controlName == "jobTitle") {
                    return "Job Title required"
                }
                // else if (controlName == "organization") {
                //     return "Organization required"
                // }
                else if (controlName == "zipCode") {
                    return "Zip Code required"
                }
                return `${controlName} required`;
            }
            if (controlName != "zipCode") {
                if (control.errors.minlength) {
                    return "Minimum 2 characters required";
                }
            }
            if (controlName == "zipCode") {
                if (control.errors.minlength) {
                    return "Zip Code must be 5 to 6 characters";
                }
                if (control.errors.maxlength) {
                    return "Zip Code cannot be more than 6 characters long";
                }
            }
            if (control.errors.pattern) {
                return "Space between words are allowed";
            }
        }

        return '';
    }

    // checkOrganizationName(event: any) {
    //     this.rest_api.organizationCheck(event.target.value).subscribe(res => {
    //         if (res.message == "Organization Name already Exists") {
    //             this.orgExsist = true;
    //         } else {
    //             this.orgExsist = false;
    //         }
    //     })
    // }
    
    getAllDepartments() {
        this.rest_api.getAllDepartments().subscribe((response: any) => {
            this.departments = response;
            this.spinner.hide()
        })
    }
    getCountries() {
        this.countryInfo = Country.getAllCountries();
    }
    onChangeCountry(countryValue: any) {
        this.isInput = !this.isInput;
        this.stateInfo = State.getAllStates();
        if (countryValue) {
            const matchingCountry = this.countryInfo.find((item) => item.name === countryValue.value);
            console.log("matchingCountry", matchingCountry);
            this.phnCountry = matchingCountry?.isoCode.toLowerCase();
            this.stateInfo = this.stateInfo.filter((state) => state.countryCode === matchingCountry?.isoCode);
            this.errorMessage = "";
            if (this.stateInfo.length === 0) {
                this.stateInfo = [{ name: 'NA' }];
                this.cityInfo = [{ name: 'NA' }];
            }
        }
    }

    onChangeState(stateValue: any) {
        this.cityInfo = City.getAllCities();
        if (stateValue) {
            const matchingState = this.stateInfo.find((item: any) => item.name == stateValue.value);
            console.log("matchingState", matchingState);
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

    onKeydown(event) {
        let numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"]
        let temp = numArray.includes(event.key); //gives true or false
        if (!temp) {
            event.preventDefault();
        }
    }

    OnFlagChange(event: any) {
        if (event.name != this.userForm.value.country.name) {
            this.isErrorMessage = true;
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

    resetForm() {
        this.userForm.reset();
        this.errorMessage = "";
        this.errorMessage1 = "";
        this.errorMessage2 = ""
    }

    saveUserDetails() {
        this.spinner.show();
        // This payload is for Registration Continue API
        var payload = new FormData();
        var reqObj = {}
        reqObj = {
            userId: this.userId,
            jobTitle: this.userForm.value.jobTitle,
            department: this.userForm.value.department,
            // organization: this.userForm.value.organization,
            country: this.userForm.value.country,
            state: this.userForm.value.state,
            city: this.userForm.value.city,
            zipCode: this.userForm.value.zipCode,
            phoneNumber: this.userForm.value.phoneNumber,
        }
        payload.append('firstName', this.crypto.encrypt(JSON.stringify(reqObj)));
        console.log("Req_Payload", reqObj);
        this.rest_api.registrationContinue(payload).subscribe((res: any) => {
            this.spinner.hide();
            if (res.body.message == "User Details Saved Successfully!!") {
                if (environment.isSubscrptionEnabled) {
                    Swal.fire({
                        title: 'Success!',
                        text: `User Details Saved Successfully!`,
                        icon: 'success',
                        showCancelButton: false,
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.value) {
                            this.loginUser(this.userData);
                        }
                    });
                }
            } else {
                this.spinner.hide();
                Swal.fire("Error", res.body.message, "error")
            }
        }, err => {
            this.spinner.hide();
            Swal.fire("Error", "Failed to save details", "error")
        })
    }

    loginUser(userData) {
        this.spinner.show()
        this.http.post(environment.tokenendpoint + "/api/login/beta/token", { userId: this.userData.userEmail }).subscribe((response: any) => {
            console.log(":accessToken Response", response)
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.getUserDetails(userData);
        }, err => {
            console.log("error", err)
            Swal.fire("Error", "Unable to get access token", "error");
        })
    }

    getUserDetails(userData) {
        this.appService.getIP();
        localStorage.setItem('ProfileuserId', userData.userEmail)
        this.authservice.userDetails(userData.userEmail).subscribe(data => {
            this.checkSuccessCallback(data)
            this.session.startWatching();
        }
        );
    }

    checkSuccessCallback(data: any) {
        this.sharedData.setLoggedinUserData(data);
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('lastName', data.lastName);
        localStorage.setItem('userName', data.userId);
        localStorage.setItem('tenantName', data.tenantID);
        localStorage.setItem('phoneNumber', data.phoneNumber);
        localStorage.setItem('company', data.company);
        localStorage.setItem('country', data.country);
        localStorage.setItem('enabled', data.enabled)
        this.authenticate();
    }

    authenticate() {
        console.log("rolesApi started")
        this.profileService.getUserRole(2).subscribe(res => {
            this.spinner.hide()
            const userRole = res.message;
            localStorage.setItem('userRole', userRole);
            //this.router.navigate(['/activation']);
            var token = JSON.parse(localStorage.getItem('currentUser'));
            var encryptToken = btoa(token.accessToken)
            var encryptrefreshToken = btoa(token.refreshToken);
            var firstName = localStorage.getItem('firstName');
            var lastName = localStorage.getItem('lastName');
            var ProfileuserId = localStorage.getItem('ProfileuserId');
            var tenantName = localStorage.getItem('tenantName');
            var userId = this.crypto.encrypt(JSON.stringify(localStorage.getItem('ProfileuserId')));
            var useridBase64 = btoa(userId);
            var userIp = btoa(localStorage.getItem('ipAddress'));
            console.log("Navigation.................")
            window.location.href = this.config.newproductendpoint + "/#/pages/home?accessToken=" + encryptToken + '&refreshToken=' + encryptrefreshToken + '&firstName=' + firstName + '&lastName=' + lastName + '&ProfileuserId=' + ProfileuserId + '&tenantName=' + tenantName + '&authKey=' + useridBase64 + '&userIp=' + userIp
        }, error => {
        })

    }
}
