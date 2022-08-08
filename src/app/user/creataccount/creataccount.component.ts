import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Particles } from '../../_models/particlesjs';
import { LoginService } from '../_services/login.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CryptoService } from 'src/app/_services/crypto.service';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-creataccount',
  templateUrl: './creataccount.component.html',
  styleUrls: ['./creataccount.component.scss']
})
export class CreataccountComponent implements OnInit {
  public  emailId:any;
  public firstname:any;
  public lastname:any;
  public phoneNumber:any;
  public isresend:boolean;
  public isagree:boolean;
  public isdisable:boolean=true;
  public userId:any;
  public error='';
  public isresenddisable:boolean;
  public count:number=0;
  public ispublicMail:boolean=false;
  private spacialSymbolEncryption:string = '->^<-';
  private user: User;
  modalRef: BsModalRef;
    constructor(private particles :Particles,
                private loginservice:LoginService,
                private modalService: BsModalService,
                private cryptoService: CryptoService
                ) { }

  ngOnInit() {
    this.particles.getParticles();
  }
  onchangechekbox(){
    this.isdisable=!this.isagree;
  }
  creat_account(){
    this.user = new User();
   this.userId=this.emailId.toLowerCase();
  //  this.isresend=true;
   if(this.userId.endsWith('@gmail.com') || this.userId.endsWith('@yahoo.com') || 
   this.userId.endsWith('@hotmail.com') || this.userId.endsWith('@rediffmail.com')){
     this.ispublicMail=true;
     this.error='Only Business Email is allowed';
     return

   }
   let encrypt = this.cryptoService.encrypt(this.userId);
   this.user.userId = encrypt;
  //  this.user.firstName = this.firstname;
  //  this.user.lastName = this.lastname
  //  this.user.phoneNumber = this.phoneNumber
 
    this.loginservice.sentVerificationMail(this.user.userId).subscribe(res=>{
       this.isresend=true;
    },error=>{
      this.error='User Already Exists'
    }
      );
  }
  resendVerificationMail(){
    let encrypt = this.cryptoService.encrypt(this.userId.toLowerCase());
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
  inputlettersEmail(event): boolean {
    var regex = new RegExp("^[a-zA-Z0-9.@_-]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
  }

  lettersOnly(event): boolean {
 
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
    event.preventDefault();
    return false;
    }
    }

    inputNumberOnly(event){
      let numArray= ["0","1","2","3","4","5","6","7","8","9","Backspace","Tab"]
      let temp =numArray.includes(event.key); //gives true or false
     if(!temp){
      event.preventDefault();
     } 
    }
}
