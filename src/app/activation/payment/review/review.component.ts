import { Component, OnInit } from '@angular/core';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
public selected_plans:any={};
public cardDetails:any;
public isagree:boolean;
public isdiable:boolean=true;
public productId:any;
public plantype:any;
public plansList:any;
public name:any;
public cardnumber:any;
cardNumberdigts:any;
  constructor( private productlistservice:ProductlistService,
                private route:ActivatedRoute) { }

  ngOnInit() {
    this.EnteredCarddetails();
    this.getproductPlans();
  }

  getproductPlans(){
    this.productId=localStorage.getItem("selectedproductId"),
    this.plantype=localStorage.getItem("selectedplan")
    this.productlistservice.getProductPlanes(this.productId).subscribe(data=> {this.plansList =data
    this.plansList.forEach(obj => {
      if(obj.nickName == this.plantype){
        this.selected_plans=obj
        this.selected_plans.term='month';
        this.name=this.selected_plans.nickName.slice(4);
      }
    });
  });
  }
  EnteredCarddetails(){
    this.productlistservice.getCarddetails().subscribe(res=>{
            this.cardDetails=res
    this.cardnumber=this.cardDetails.cardnumbertotal
    this.cardNumberdigts=this.cardnumber.toString().split('').slice(12).join('');
              })
  }

  onchangechekbox(){
    this.isdiable=!this.isagree;
  }
  buyProductPlan(){
    console.log("this.cardDetails",this.cardDetails);
    
  }
}
