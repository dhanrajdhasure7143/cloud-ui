import { Component, OnInit } from '@angular/core';
import { ProductlistService } from 'src/app/_services/productlist.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
public selected_plans:any[];
public cardDetails:any;
public isagree:boolean;
public isdisable:boolean=true;

  constructor( private productlistservice:ProductlistService) { }

  ngOnInit() {
  this.selectedPlan();
    this.EnteredCarddetails();
  }
  selectedPlan(){
    this.productlistservice.getSelectedProductPlan().subscribe(res=> {
      this.selected_plans = res
    console.log("selectedMyplan",this.selected_plans);
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
