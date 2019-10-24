import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../_models/user';
import { APP_CONFIG } from './../app.config';
import { FirstloginService } from './@providers/firstlogin.service';
import Swal from 'sweetalert2';
import { Base64 } from 'js-base64';
import  countries  from './../../assets/jsons/countries.json'


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
  departments = [];
  itemsShowLimit = 1;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  selectedvalue: string = '';
  college: boolean = true;
 
  constructor(@Inject(APP_CONFIG) private config, private router: Router, private service: FirstloginService,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      var token=params['token']
      this.decodedToken = Base64.decode(token)
      console.log("decoded token = "+this.decodedToken);
     this.service.verifyToken(token).subscribe(response=>{this.onSuccessOfVerifyToken(response),err=>{
       this.router.navigate['/user']
     }})
    });
     }

  ngOnInit() {
    this.getCountries();
    this.onChangeDepartment(this.departments);
    this.model = new User();
    //this.departments = ['India', 'Canada', 'U.S.A'];
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
  }
  getCountries(){
    this.countryInfo = countries.Countries
  }

  onChangeDepartment(selectedvalue) {
    this.college = false
    this.service.getAllDepartments().subscribe(response=> {
      console.log(response);
      this.departments = response;
    })
    if(selectedvalue == "others"){
      this.college = true
    }
  }
  onChangeCountry(countryValue) {
    this.stateInfo=this.countryInfo[countryValue].States;
    this.cityInfo=this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }

  onChangeState(stateValue) {
    this.cityInfo=this.stateInfo[stateValue].Cities;
    console.log(this.stateInfo[stateValue].Cities);
  }
  onSuccessOfVerifyToken(response: any) {
    if(response){
      if(response.message==='Token Invalid'){
        this.router.navigate(['/user']);
      }else {
        //TODO:success data handle
      }
    }
     
    }
  
  onSubmit() {
    const userDetails = JSON.parse(JSON.stringify(this.model));
    userDetails.country = this.model.country[0];
    userDetails.userId = this.decodedToken;
    //userDetails.department = this.model.department[0];
    this.service.registerUser(userDetails).subscribe(res => {
      sessionStorage.clear();
      localStorage.clear();
      Swal.fire({
        title: 'Success',
        text: `Registration completed successfully !! please click OK to continue`,
        type: 'success',
        showCancelButton: false,
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/']);
        }
      });
    }, err => {
      Swal.fire({
        title: 'Error !!',
        type: 'error',
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
}
