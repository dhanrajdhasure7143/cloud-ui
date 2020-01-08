import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/_services';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  name: any;
  email: any;
  phone: any;
  role: any;
  hide: boolean = false;
  show: boolean = false ;
  iemail: any;
  constructor(private route: Router, private appSer: AppService) { }

  ngOnInit() {
    this.name= localStorage.getItem("firstName");
    this.email = localStorage.getItem("userName");
    this.phone = localStorage.getItem("phoneNumber");
     this.role = localStorage.getItem("designation");
    
    
    if(this.role=="null"){
      this.role="-- --"
      }
    
  }

  invit(){
    let inviterMailId=localStorage.getItem("userName");
    let inviteeMailId = this.iemail;
    this.appSer.invitefriends(inviterMailId, inviteeMailId).subscribe((data:any)=>{
    console.log(data);
    Swal.fire({
      title: 'Success',
      text: `Invitation email sent successfully!!`,
      type: 'success',
      showCancelButton: false,
      allowOutsideClick: false
    }).then((result) => {
      // if (result.value) {
        
      // }
    });
  }, err => {
      Swal.fire({
        title: 'Error!',
        type: 'error',
        text: `User already exist`,
        allowOutsideClick: false
      });
    });
    
  
    this.iemail="";
    // console.log(obj)
    }

  toggle(){
    this.show =!this.show
    }
    invitetoggle(){
    
      this.hide =!this.hide
    }
  logout(event) {
    this.appSer.logout();
    this.route.navigate(['/']);
  }
}
