import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../_models/user';
import { APP_CONFIG } from './../app.config';
import { FirstloginService } from './@providers/firstlogin.service';
import Swal from 'sweetalert2';
import { Base64 } from 'js-base64';
import  countries  from './../../assets/jsons/countries.json';
import 'particles.js/particles';
import * as particlesJS from 'particlesjs';

declare var particlesJS :any;
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
  submitflag:boolean=false;
  public show:boolean=true;
 
  constructor(@Inject(APP_CONFIG) private config, private router: Router, private service: FirstloginService,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if(params['token'] != undefined){
      
      var token=params['token']
      this.decodedToken = Base64.decode(token)
      console.log("decoded token = "+this.decodedToken);
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
    this.particles()
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
    this.model.country = this.countryInfo[countryValue].CountryName;
    
    this.stateInfo=this.countryInfo[countryValue].States;
    console.log("country name======", this.countryInfo[countryValue].CountryName)
    //this.cityInfo=this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }

  onChangeState(stateValue) {
    this.cityInfo=this.stateInfo[stateValue].Cities;
    console.log(this.stateInfo[stateValue].Cities);
  }
  onSuccessOfVerifyToken(response: any) {
    if(response){
      if(response.message==='Token Invalid' || response.message==='Token Expired'){
        this.router.navigate(['/user']);
      }else {
        //TODO:success data handle
      }
    }
     
    }
    onSuccessOfConfirmToken(response: any){
     if(response.message === 'Invalid User Invite' || response.message === 'User Invitation  Already Confirmed'){
      this.router.navigate(['/user']);
     }
     

    }

    ondepartment(event){
      console.log("event------>",event)

    }
  
  onSubmit() {
    this.submitflag=true;
    const userDetails = JSON.parse(JSON.stringify(this.model));
    
    //localStorage.setItem('phoneNumber',userDetails.phoneNumber);
    //localStorage.setItem('company',userDetails.company);
   // userDetails.country = this.model.country[;
    userDetails.userId = this.decodedToken;
    //userDetails.department = this.model.department[0];
    console.log("User register details------- ", userDetails)
    this.service.registerUser(userDetails).subscribe(res => {
      sessionStorage.clear();
      localStorage.clear();
      Swal.fire({
        title: 'Success!',
        text: `Registration completed successfully.`,
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
    console.log(event.key);
    
    let numArray= ["0","1","2","3","4","5","6","7","8","9","Backspace"]
    let temp =numArray.includes(event.key); //gives true or false
   if(!temp){
    event.preventDefault();
   } 
  }
  toggle() {
    this.show = !this.show;
  }
  particles(){
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 200,
          "density": {
            "enable": true,
            "value_area": 650
          }
        },
        "color": {
          "value": "#d3dbd4"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 1,
            "color": "#d3dbd4"
          },
          "polygon": {
            "nb_sides": 5
          },

        },
        "opacity": {
            "value": 1,
            "random": false,
            "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
            "value": 7,
            "random": true,
            "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.3,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#d3dbd4",
          "opacity": 0.6,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 600
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
        },
        "modes": {
          "grab": {
            "distance": 120,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 80,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
  resetForm() {
    this.model = new User();
  }
}
