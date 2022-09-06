import { ForgotpasswordService } from './../_services/forgotpassword.service';
import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from './../../app.config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Particles } from '../../_models/particlesjs'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({ templateUrl: 'forgotpassword.component.html',
styleUrls: ['forgotpassword.component.scss'],
})

export class ForgotpasswordComponent implements OnInit {
  emailForm: FormGroup;
  submitted = false;
  error;


  constructor(@Inject(APP_CONFIG) private config, 
                      private router: Router,
                      private formBuilder: FormBuilder,  
                      private forgotpasswordser: ForgotpasswordService,
                      private particles :Particles,
                      private spinner:NgxSpinnerService
                      ) { }

  ngOnInit() {
    //this.particles.getParticles();
      this.emailForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
      });
  }

  get f() { return this.emailForm.controls; }

  onSubmit() {
    this.spinner.show();
          this.submitted = true;
      if (this.emailForm.invalid) {
          return;
      }
      this.forgotpasswordser.forgotPassword({email: this.f.email.value.toLowerCase()}).subscribe(res => {
        this.spinner.hide();
        if(res.message ==='Password reset mail sent successfully'){
          Swal.fire({
            title: 'Success',
            text: `Reset password link has been sent to your email successfully!`,
            type: 'success',
            
           
            // showConfirmButton: true,
            
          }).then(()=>{
           this.router.navigate(['/user'])
          })
        } else {
          this.spinner.hide();
          Swal.fire({
            type: 'error',
            title:"Error",
            text: "User Not Found!!"
            
            
          });
        }

       
      
      //  alert('reset password link is sent to your mail  !')
       
        });

    //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.emailForm.value))
  }

  onSignup() {
    localStorage.clear();
    sessionStorage.clear();
    location.href = this.config.portfolioSite;
  }

}
