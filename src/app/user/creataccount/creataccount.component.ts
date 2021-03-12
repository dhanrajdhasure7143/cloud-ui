import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Particles } from '../../_models/particlesjs';
import { LoginService } from '../_services/login.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CryptoService } from 'src/app/_services/crypto.service';

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
  private spacialSymbolEncryption:string = '->^<-';
  modalRef: BsModalRef;
    constructor(private particles :Particles,
                private loginservice:LoginService,
                private modalService: BsModalService,
                private cryptoService: CryptoService) { }

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
   let encrypt = this.spacialSymbolEncryption + this.cryptoService.encrypt(this.userId);
    this.loginservice.sentVerificationMail(encrypt).subscribe(res=>{
       this.isresend=true;
    },error=>{
      this.error='User Already Exists'
    }
      );
  }
  resendVerificationMail(){
    let encrypt = this.spacialSymbolEncryption + this.cryptoService.encrypt(this.userId);
    this.loginservice.resendVerificationMail(encrypt).subscribe(res=>{
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
