import { ForgotpasswordService } from './../_services/forgotpassword.service';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';;

@Component({ templateUrl: 'forgotpassword.component.html' })
export class ForgotpasswordComponent implements OnInit {
  emailForm: FormGroup;
  submitted = false;
  error;

  constructor(private formBuilder: FormBuilder,  private forgotpasswordser: ForgotpasswordService) { }

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
      this.forgotpasswordser.forgotPassword({"eamil": this.f.email.value}).subscribe(res => {
        console.log("test ...");
        });

    //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.emailForm.value))
  }
}
