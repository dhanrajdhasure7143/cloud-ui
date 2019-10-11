import { NewpasswordService } from './../_services/newpassword.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { APP_CONFIG } from './../../app.config';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {
  passwordForm: FormGroup;
 
  newPwd: any;
  userData: any = {};
  constructor(private router: Router, private route: ActivatedRoute, private newpasswordServ: NewpasswordService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
     
      let token = params['token']
      console.log(token);
      this.newpasswordServ.resetPassword({token}).subscribe(res => {this.onSuccessOfVerifyToken(res),err=>{
        this.router.navigate['/user']
        console.log('res ...', res);
        
      }});
    });
   
    
  }

  onSuccessOfVerifyToken(response: any) {
    if(response){
      if(response.message !== 'reset token found'){
        this.router.navigate(['/user']);
      }else {
        
      }
    }
     
    }
    
  onSubmit() {
    this.route.queryParams.subscribe(params => {
      let resetToken = params['token']
      this.userData = {
        tkn : resetToken,pwd: this.newPwd
      };
      
      this.newpasswordServ.newPassword({user: this.userData}).subscribe(res => {this.onSuccessOfResetPassword(res),err=>{
        this.router.navigate['/user']
        console.log('res ...', res);
        
   
        console.log('test ...');
        }});
    });
   
}
  onSuccessOfResetPassword(res: any) {
    if(res){
      if(res.message === 'Password reset is successful'){
        Swal.fire({
          type: 'success',
          title: 'Your password reset is successful',
          // showConfirmButton: true,
          
        }).then(()=>{
         this.router.navigate(['/user'])
        })
        
      }else {
        Swal.fire({
          type: 'error',
          title: res.message,
         });
        //this.router.navigate(['/user']);
      }
    }
  }
  onSignup() {
    localStorage.clear();
    sessionStorage.clear();
   
  }
  }




