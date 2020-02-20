import { Component, OnInit } from '@angular/core';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import { Router,ActivatedRoute,NavigationEnd} from '@angular/router';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import  countries  from 'src/app/../assets/jsons/countries.json'
import Swal from 'sweetalert2';
import { SharedDataService } from 'src/app/_services/shared-data.service';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  
  submitted=false;
  name:any;
  lname:any;
  departments:any;
  use:any;
  form : any;
  userDetails : any = [];
  countries : any = [];
  countryInfo :any = [];
  stateInfo:any=[];
  cityInfo:any=[];
  addDepartment: boolean =false;
  firstName:any;
  designation:any;
  phoneNumber:any;
  formTest: FormGroup;
  company:any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private service: FirstloginService,
    private sharedData: SharedDataService    )  {
     }
  ngOnInit() {
    // this.getCountries();
    this.countryInfo = countries.Countries;
    
    // console.log('data', this.countryInfo)
    
    this.form = new FormGroup({
      firstName : new FormControl(localStorage.getItem("firstName"), Validators.required),
      lastName : new FormControl(localStorage.getItem("lastName"), Validators.required),
      designation :new FormControl(localStorage.getItem("designation"), Validators.required),
      userId : new FormControl(localStorage.getItem("userName"), Validators.required),
      company:new FormControl( localStorage.getItem('company'), Validators.required),
      department:new FormControl( localStorage.getItem('department'), Validators.required),
      country : new FormControl(localStorage.getItem("country"), Validators.required),
      phoneNumber:new FormControl(localStorage.getItem("phoneNumber"), Validators.required),
    });
    this.formTest=this.formBuilder.group({
      firstName : new FormControl(localStorage.getItem("firstName"), Validators.required),
      lastName : new FormControl(localStorage.getItem("lastName"), Validators.required),
      designation :new FormControl(localStorage.getItem("designation"), Validators.required),
      userId : new FormControl(localStorage.getItem("userName"), Validators.required),
      company:new FormControl( localStorage.getItem('company'), Validators.required),
      department:new FormControl( localStorage.getItem('department'), Validators.required),
      country : new FormControl(localStorage.getItem("country"), Validators.required),
      phoneNumber:new FormControl(localStorage.getItem("phoneNumber"), Validators.required),
    })
    console.log("editdata",this.form);
    
    // var orginalData=[];
    // this.form.forEach(function (value){
    //     if(value.phoneNumber===null){
    //         value.phoneNumber="-- --"
    //         orginalData.push(value);
    //     }
    //     if(value.company===null){
    //         value.company="-- --"
    //         orginalData.push(value);
    //     }
    //     if(value.department===undefined){
    //         value.department="-- --"
    //         orginalData.push(value);
    //     }
    //     })
  }
  onSubmit(form) {
    this.userDetails=[];   
    // since field is disabled, we need to use 'getRawValue'
    let index = form.getRawValue().index
    if(index != null) {
      this.userDetails[index] = form.value
    } else {
      this.userDetails.push(form.value)      
    }
    
    // this.form.reset() // reset form to empty
    console.log('form------', this.userDetails[0]);
    this.service.updateUser(this.userDetails[0]).subscribe(data => {this.checkSuccessCallback(data)
      // console.log('dat',res)
      // sessionStorage.clear();
      // localStorage.clear();
      Swal.fire({
        title: 'Success',
        text: `Update completed successfully!!`,
        type: 'success',
        showCancelButton: false,
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/home/userdetails']);
        }
      });
    }, err => {
      console.log('error', err)
      // Swal.fire({
      //   title: 'Error !!',
      //   type: 'error',
      //   text: `${err.error.message} ! Please check your user name`,
      //   allowOutsideClick: false
      // });
    });
    // this.form.reset();
   
  }
  checkSuccessCallback(data:any){
    this.sharedData.setLoggedinUserData(this.userDetails[0].firstName);
    
    console.log("checkSuccessCallback--------login component", this.userDetails[0]);
    localStorage.setItem('firstName',this.userDetails[0].firstName);
    localStorage.setItem('lastName',this.userDetails[0].lastName);
    localStorage.setItem('userName',this.userDetails[0].userId);
    localStorage.setItem('phoneNumber',this.userDetails[0].phoneNumber);
    localStorage.setItem('company', this.userDetails[0].company);
    localStorage.setItem('designation',this.userDetails[0].designation);
    localStorage.setItem('country',this.userDetails[0].country);
    localStorage.setItem('department', this.userDetails[0].department);
  }
  
  
  getCountries(){
    this.countryInfo = countries.Countries
  }
    
  onChangeCountry(selection) {
    let countryValue = parseInt(selection.split(":")[0])-1;
    this.form.country = this.countryInfo[countryValue].CountryName;
    
    this.stateInfo=this.countryInfo[countryValue].States;
    console.log("country name======", this.countryInfo[countryValue].CountryName)
    //this.cityInfo=this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }
  onChangeState(stateValue) {
    this.cityInfo=this.stateInfo[stateValue].Cities;
    console.log(this.stateInfo[stateValue].Cities);
  }
  onKeydown(event){
    console.log(event.key);
    
    let numArray= ["0","1","2","3","4","5","6","7","8","9","Backspace","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"]
    let temp =numArray.includes(event.key); //gives true or false
   if(!temp){
    event.preventDefault();
   }
}
onChangeDepartment(selectedvalue) {
  this.addDepartment = false
  this.service.getAllDepartments().subscribe(response=> {
    console.log(response);
    this.departments = response;
  })
  if(selectedvalue == "others"){
    this.addDepartment = true
  }
}
}
