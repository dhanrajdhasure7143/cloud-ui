import { Component, OnInit } from '@angular/core';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';


@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {
  // model: user;
  name: any;
  lname:any;
  email: any;
  phone: any;
  role: any;
  lastName: any;
  company: any;
  department: string;
  country: string;
  first:string;
  model2:any={ }
  fname:any;
  constructor( private service:FirstloginService) { }

  public show:boolean = false;
  // public hide:boolean = false;
  // public buttonName:any = 'Show';
  // public butto:any = 'hide';

  ngOnInit() {
    this.name = localStorage.getItem("firstName");
    this.lname=localStorage.getItem("lastName");
    this.email = localStorage.getItem("userName");
    this.phone = localStorage.getItem("phoneNumber");
    this.role = localStorage.getItem("designation");
    this.lastName = localStorage.getItem("lastName");
    this.company = localStorage.getItem("company");
    this.country = localStorage.getItem("country");
    this.department = localStorage.getItem("department");


    // getFirstLetter(){
      
    //   const letter=name;
       this.name.split(" ")
       let first=this.name[0];
       console.log(first);
       if(this.role== "null"){
        this.role="NA"
        }
        if(this.phone== "null"){
        this.phone="NA"
        }
        if(this.company== "null"){
        this.company="NA"
        }
        if(this.country== "null"){
        this.country="NA"
        }
  
    }

    toggle() {
      this.show = !this.show;
      // this.hide=!this.hide;
  

    }

    // read(){
    //   // this.isdata=!this.isdata;
    //   this.service.readuser().subscribe((data:any)=>{
    //     this.fname=this.name
      
    //   })

    // }

  //   UpdateDetails(user){
  //     var obj:any={};
  //     obj.ame=this.fname;
         
  //     this.service.updateUser(user).subscribe((data:any)=>{
  //     console.log(obj.ame)
  // })
      // this.model2.name=this.name;
    // console.log(this.model2)

    // }
    
    }




    //const letter=name;

    
    
