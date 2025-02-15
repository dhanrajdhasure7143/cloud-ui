import { NewpasswordService } from './../_services/newpassword.service';
import { FormBuilder, FormGroup, Validators, FormsModule, AbstractControl } from '@angular/forms';
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
  formGroup: FormGroup;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private newpasswordServ: NewpasswordService,
              private spinner:NgxSpinnerService,
              private cryptoService: CryptoService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
     
      let token = params['token']

      this.newpasswordServ.resetPassword({token}).subscribe(res => {
        this.onSuccessOfVerifyToken(res)
      },err=>{
        this.router.navigate(['/user']);
          });
    });
   
    this.formGroup = this.fb.group({
      password: ['', [
        Validators.required, 
        Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%]).{8,20})')
      ]],
      pwConfirm: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
    
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('pwConfirm');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
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
      if (this.formGroup.invalid) {
          return;
      }
  
      this.spinner.show();
  
      this.route.queryParams.subscribe(params => {
          const resetToken = params['token'];
          const password = this.formGroup.get('password').value;
  
          this.userData = {
              tkn: resetToken,
              pwd: this.cryptoService.encrypt(password)
          };
          
          this.newpasswordServ.newPassword({ user: this.userData }).subscribe(
              res => {
                  this.onSuccessOfResetPassword(res);
                  this.spinner.hide();
              },
              err => {
                 this.formGroup.reset()
                  this.router.navigate(['/user']);
                  this.spinner.hide();
              }
          );
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
         this.formGroup.reset()
        this.router.navigate(['/user']);
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




