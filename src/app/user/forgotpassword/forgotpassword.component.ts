import { ForgotpasswordService } from './../_services/forgotpassword.service';
import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from './../../app.config';
import { Router } from '@angular/router';

@Component({ templateUrl: 'forgotpassword.component.html',
styleUrls: ['forgotpassword.component.scss'],
})

export class ForgotpasswordComponent implements OnInit {
  emailForm: FormGroup;
  submitted = false;
  error;

  constructor(@Inject(APP_CONFIG) private config, private router: Router, private formBuilder: FormBuilder,  private forgotpasswordser: ForgotpasswordService) { }

  ngOnInit() {
      this.emailForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
      });
  }

  get f() { return this.emailForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.emailForm.invalid) {
          return;
      }
      this.forgotpasswordser.forgotPassword({email: this.f.email.value}).subscribe(res => {
       alert('reset password link is sent to your mail  !')
        this.router.navigate['/user']
        });

    //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.emailForm.value))
  }

  onSignup() {
    localStorage.clear();
    sessionStorage.clear();
    location.href = this.config.portfolioSite;
  }
}
