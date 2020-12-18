import { Component, OnInit } from '@angular/core';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchdashboard:any;
  p=0;
  constructor(private firstloginservice:FirstloginService,private spinner:NgxSpinnerService) { }
  plans:any=[];
  ngOnInit() {
    this.spinner.show();
    
    setTimeout(() => {
     this.getSuperAdminData()
       },800);
       setTimeout(() => {
         this.spinner.hide();
     }, 1500);
  }
  getSuperAdminData(){
    this.spinner.show();
    this.firstloginservice.getSuperAdminData().subscribe(res=>{this.plans=res
      console.log('resr',res);
      
    })
  }

}
