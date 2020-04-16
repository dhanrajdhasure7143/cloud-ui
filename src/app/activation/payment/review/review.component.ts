import { Component, OnInit } from '@angular/core';
import { ProductlistService } from 'src/app/_services/productlist.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
public selected_plans:any={};
public cardDetails:any;
public isagree:boolean;
public isdisable:boolean=true;
public productId:any;
public plantype:any;
public plansList:any;
public name:any;

  constructor( private productlistservice:ProductlistService) { }

  ngOnInit() {
    this.EnteredCarddetails();
    this.getproductPlans()
  }

  getproductPlans(){
    this.productId=localStorage.getItem("selectedproductId"),
    this.plantype=localStorage.getItem("selectedplan")
    this.productlistservice.getProductPlanes(this.productId).subscribe(data=> {this.plansList =data
    console.log("planesList",this.plansList)
    this.plansList.forEach(obj => {
      if(obj.nickName == this.plantype){
        this.selected_plans=obj
        this.selected_plans.term='month';
        this.name=this.selected_plans.nickName.slice(4);
        console.log("selected_plansone",this.selected_plans)
      }
    });
  });
  }
  EnteredCarddetails(){
    this.productlistservice.getCarddetails().subscribe(res=>{
                this.cardDetails=res 
              console.log("card",this.cardDetails);
              })
  }

  onchangechekbox(){
    this.isdisable=!this.isagree;
  }
}
