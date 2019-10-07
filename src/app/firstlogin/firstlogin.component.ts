import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../_models/user';
import { APP_CONFIG } from './../app.config';
import { FirstloginService } from './@providers/firstlogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.component.html',
  styleUrls: ['./firstlogin.component.scss']
})
export class FirstloginComponent implements OnInit {
  model: User;
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  departments = [];
  itemsShowLimit = 1;

  constructor(@Inject(APP_CONFIG) private config, private router: Router, private service: FirstloginService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      var token=params['token']
     this.service.verifyToken(token).subscribe(response=>{this.onSuccessOfVerifyToken(response),err=>{
       this.router.navigate['/user']
     }})
    });
    this.model = new User();
    this.departments = ['India', 'Canada', 'U.S.A'];
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
    userDetails.department = this.model.department[0];
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
