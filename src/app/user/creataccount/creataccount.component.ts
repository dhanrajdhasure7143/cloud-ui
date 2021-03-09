import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Particles } from '../../_models/particlesjs';
import { LoginService } from '../_services/login.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  public ispublicMail:boolean=false;
  modalRef: BsModalRef;
    constructor(private particles :Particles,
                private loginservice:LoginService,
                private modalService: BsModalService) { }

  ngOnInit() {
    this.particles.getParticles();
  }
  onchangechekbox(){
    this.isdisable=!this.isagree;
  }
  creat_account(){
   this.userId=this.emailId
  //  this.isresend=true;
   if(this.userId.endsWith('@gmail.com') || this.userId.endsWith('@yahoo.com') || 
   this.userId.endsWith('@hotmail.com') || this.userId.endsWith('@rediffmail.com')){
     this.ispublicMail=true;
     return

   }
    this.loginservice.sentVerificationMail(this.userId).subscribe(res=>{
       this.isresend=true;
    },error=>{
      this.error='User Already Exists'
    }
      );
  }
  resendVerificationMail(){
    this.loginservice.resendVerificationMail(this.userId).subscribe(res=>{
      Swal.fire({
        title: 'Success',
        text: `Account activation email resent successfully !!`,
        type: 'success',
        showCancelButton: false,
        allowOutsideClick: true
      }) 
    });
    this.count++
    if(this.count== 2){
      this.isresenddisable=true;
    }
  }
  termsConditionsOpen(template){
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg' }));
  }
  privacyOpen(template){
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg' }));
  }
}
