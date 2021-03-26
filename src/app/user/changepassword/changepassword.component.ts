import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/_services/profile.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { Particles } from '../../_models/particlesjs'
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/_services';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  passwordForm: FormGroup;
  public localstorageuserid: any;
  public passwordvalidatemsg: any;
  newPwd: any;
  curtPass:any;
  userData: any = {};
  public show:boolean=true;
  public confmshow:boolean=true;
  public eyeshow:boolean = true;
  public localstoragepassword: any;
  constructor(
    private router: Router, 
              private route: ActivatedRoute, 
              private profileservice: ProfileService,
              private appser: AppService, 
              private particles :Particles,
  ) { }

  ngOnInit() {
    this.particles.getParticles();
    this.localstorageuserid = localStorage.getItem("Passwordvalidite");  
  }

  onSubmit(form:NgForm){
    
    let pswdbody = {
      "confirmPassword": this.newPwd,
      "currentPassword": this.curtPass,
      "newPassword":this.newPwd,
      "userId": this.localstorageuserid
    }
    this.profileservice.changePassword(pswdbody).subscribe(res => {
      // this.pswdmodel = {};
        console.log(res.errorMessage);
   
        if(res.errorMessage == undefined){
          Swal.fire({
            width: "400px",
            position: 'center',
            type: "success",
            title: res.message,
            showConfirmButton: false,
            timer: 2000
          })
          //document.getElementById('changepassword1').style.display = "none";
          form.resetForm();
            localStorage.clear();
            sessionStorage.clear();
              this.router.navigate(['/']);      
            this.appser.logout();
          }else{
            Swal.fire({
              width:"400px",
              type: 'error',
              text: res.errorMessage,
             });
          }
      });
  }
  toggle() {
    this.show = !this.show;
  }
  confirmtoggle(){
    this.confmshow = !this.confmshow;
  }  
  currentoggle() {
    this.eyeshow = !this.eyeshow;
  }

}
