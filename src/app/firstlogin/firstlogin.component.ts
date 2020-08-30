import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../_models/user';
import { APP_CONFIG } from './../app.config';
import { FirstloginService } from './@providers/firstlogin.service';
import Swal from 'sweetalert2';
import { Base64 } from 'js-base64';
import  countries  from './../../assets/jsons/countries.json';
import { Particles } from '../_models/particlesjs';
import { Logger } from 'ag-grid-community';

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
  departments:any;
  phnCountry: any;
  itemsShowLimit = 1;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  selectedvalue: string = '';
  college: boolean = false;
  submitflag:boolean=false;
  public show:boolean=true;
  public otherDepartment:any;
  isCompanydisabled:boolean=false;
 
  constructor(@Inject(APP_CONFIG) private config, private router: Router, 
              private service: FirstloginService,
              private route: ActivatedRoute,
              private particles :Particles,) {
    this.route.queryParams.subscribe(params => {
      if(params['token'] != undefined){
      
      var token=params['token']
      this.decodedToken = Base64.decode(token)
      // console.log("decoded token = "+this.decodedToken);
     this.service.verifyToken(token).subscribe(response=>{this.onSuccessOfVerifyToken(response),err=>{
      
       
      this.router.navigate['/user']
       
     }})
    }else{
      var inviteId = params['inviteId']
      var userId = params['userId']
      this.decodedToken = Base64.decode(userId)
      this.service.verifyInvitee(inviteId).subscribe(response =>{this.onSuccessOfConfirmToken(response),err=>{
        this.router.navigate['/user']
      }})
      
    }
    });
     }

  ngOnInit() {
  
    
    
    this.particles.getParticles();
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
  }
  getCountries(){
    this.countryInfo = countries.Countries
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
    // this.model.country = this.countryInfo[countryValue].CountryName;
    // this.stateInfo=this.countryInfo["India"].States;
    console.log('CountryName',countryValue);
    if(countryValue == 'India'){
      this.phnCountry = 'in'
    }else if(countryValue == 'United States'){
      this.phnCountry = 'us'
    }
    
    for(var i=0; i< this.countryInfo.length; i++){
      if(this.countryInfo[i].CountryName == countryValue ){
        this.stateInfo=this.countryInfo[i].States; 
      }
    }
  
   
  }

  onChangeState(stateValue) {
    // this.model.state =this.stateInfo[stateValue].StateName
    // console.log("state : " + this.model.state);
    // this.cityInfo=this.stateInfo[stateValue].Cities;
    for(var i=0; i< this.stateInfo.length; i++){
      if(this.stateInfo[i].StateName == stateValue ){
        this.cityInfo=this.stateInfo[i].Cities; 
      }
    }
  }
  
  // onChangeCity(cityValue){
  //   console.log('cityValue',cityValue);
    
  //   // this.model.city = this.cityInfo[cityValue]
  // }
  onSuccessOfVerifyToken(response: any) {
    if(response){
      if(response.errorMessage==='Token invalid'){
        Swal.fire({
          title: 'Error',
          text: `This email has been already registered with us. Please register with different email.`,
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/user']);
          }
        });
        // this.router.navigate(['/user']);
      }else {
        //TODO:success data handle
      }
    }
     
    }
    onSuccessOfConfirmToken(response: any){
      this.isCompanydisabled = true;
      this.model.company = response.company;
     if(response.message === 'Invalid User Invite' || response.message === 'User Invitation  Already Confirmed'){
      this.router.navigate(['/user']);
     }
     

    }
  onSubmit() {
    this.submitflag=true;
    if(this.model.department=="others"){
      this.model.department=this.otherDepartment;
          }
    const userDetails = JSON.parse(JSON.stringify(this.model));
    //localStorage.setItem('phoneNumber',userDetails.phoneNumber);
    //localStorage.setItem('company',userDetails.company);
   // userDetails.country = this.model.country[;
    userDetails.userId = this.decodedToken;
    //userDetails.department = this.model.department[0];
    this.service.registerUser(userDetails).subscribe(res => {
      sessionStorage.clear();
      localStorage.clear();
      Swal.fire({
        title: 'Success',
        text: `Registration completed successfully!`,
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
        title: 'Error!',
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
  onKeydown(event){
    
    let numArray= ["0","1","2","3","4","5","6","7","8","9","Backspace","Tab"]
    let temp =numArray.includes(event.key); //gives true or false
   if(!temp){
    event.preventDefault();
   } 
  }
  toggle() {
    this.show = !this.show;
  }
  resetForm() {
    this.model = new User();
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
    }
}
