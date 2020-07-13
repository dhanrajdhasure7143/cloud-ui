import { Component, OnInit } from '@angular/core';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchdashboard:any;
  constructor(private firstloginservice:FirstloginService) { }
  plans:any=[];
  ngOnInit() {
    this.getSuperAdminData();
  }
  getSuperAdminData(){
    this.firstloginservice.getSuperAdminData().subscribe(res=>{this.plans=res
      console.log('resr',res);
      
    })
  }

}
