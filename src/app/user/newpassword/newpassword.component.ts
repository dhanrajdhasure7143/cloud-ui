import { NewpasswordService } from './../_services/newpassword.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { APP_CONFIG } from './../../app.config';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptoService } from '../../_services/crypto.service';


@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {
  passwordForm: FormGroup;
 
  newPwd: any;
  userData: any = {};
  public show:boolean=true;
  public confmshow:boolean=true;
  error:any;
  public hide:boolean = false;
  public hide1:boolean = false;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private newpasswordServ: NewpasswordService,
              private spinner:NgxSpinnerService,
              private cryptoService: CryptoService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
     
      let token = params['token']

      this.newpasswordServ.resetPassword({token}).subscribe(res => {
        this.onSuccessOfVerifyToken(res)
      },err=>{
        this.router.navigate(['/user']);
          });
    });
   
    
  }

  onSuccessOfVerifyToken(response: any) {
     if(response){
      if(response.message !== 'reset token found'){
        Swal.fire({
          title: 'Error',
            text: `Reset password token expired!!`,
            icon: 'error',
            
                  
        }).then(()=>{
         this.router.navigate(['/user'])
        })
        
      }else {
        
      }
    }
     
    }
    
  onSubmit() {
    this.spinner.show();
    this.route.queryParams.subscribe(params => {
      let resetToken = params['token']
      this.userData = {
        tkn: resetToken,
        pwd: this.cryptoService.encrypt(this.newPwd)
      };
      
      this.newpasswordServ.newPassword({user: this.userData}).subscribe(res => {
        this.onSuccessOfResetPassword(res)},err=>{
          this.router.navigate(['/user']);
        
          });
    });
   
}
  onSuccessOfResetPassword(res: any) {
    this.spinner.hide();
    if(res){
      if(res.message === 'Password reset is successful'){
        Swal.fire({
          title: 'Success',
            text: `Your password reset is successful !`,
            icon: 'success',
            
                  
        }).then(()=>{
         this.router.navigate(['/user'])
        })
        
      }else {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: "Error",
          text: res.errorMessage+' !',
         });
        //this.router.navigate(['/user']);
      }
    }
  }
  onSignup() {
    localStorage.clear();
    sessionStorage.clear();
   
  }
  toggle() {
    this.show = !this.show;
  }
  confirmtoggle(){
    this.confmshow = !this.confmshow;
  }
  }




