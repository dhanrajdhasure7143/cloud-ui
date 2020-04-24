import { Component, OnInit } from '@angular/core';
import { Particles } from '../../_models/particlesjs'
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-creataccount',
  templateUrl: './creataccount.component.html',
  styleUrls: ['./creataccount.component.scss']
})
export class CreataccountComponent implements OnInit {
  public  emailId:any;
  public isresend:boolean;
  public isagree:boolean;
  public isdisable:boolean=true;
  public userId:any;
  public error='';
  public isresenddisable:boolean;
  public count:number=0;
    constructor(private particles :Particles,
                private loginservice:LoginService) { }

  ngOnInit() {
    this.particles.getParticles();
  }
  onchangechekbox(){
    this.isdisable=!this.isagree;
  }
  creat_account(){
   this.userId=this.emailId
    this.loginservice.sentVerificationMail(this.userId).subscribe(res=>{
       this.isresend=true;
    },error=>{
      this.error='User Already Exists'
    }
      );
  }
  resendVerificationMail(){
    this.loginservice.resendVerificationMail(this.userId).subscribe(res=>{
    });
    this.count++
    if(this.count== 2){
      this.isresenddisable=true;
    }
  }
}
