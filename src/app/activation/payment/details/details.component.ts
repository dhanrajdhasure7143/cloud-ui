import { Component, OnInit, Input } from '@angular/core';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public selected_plans:any={};
  public cardHoldername:any;
  public cardmonth:any;
  public cardnumbertotal:any;
  public cardyear:any;
  public cvvNumber:any;
  public cardDetails:any;
  public plantype:any;
  public productId:any;
  public plansList:any[];
  public name:any;
  public yearList:any[]=[{"value":2020,"year":2020},{"value":2021,"year":2021},{"value":2022,"year":2022},{"value":2023,"year":2023},{"value":2024,"year":2024},{"value":2024,"year":2025}]


  constructor( private productlistservice:ProductlistService, private router:Router) { }

  ngOnInit() {
    this.getproductPlans();
    // this.productlistservice.getCarddetails().subscribe(res=>{
    //   this.cardDetails=res 
    // })
    // this.cardHoldername=this.cardDetails.cardHoldername;
    // this.cardmonth=this.cardDetails.cardmonth;
    // this.cardnumbertotal=this.cardDetails.cardnumbertotal;
    // this.cardyear=this.cardDetails.cardyear;
    // this.cvvNumber=this.cardDetails.cvvNumber;
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

  paymentfromSubmit(){
  this.cardDetails={
    cardHoldername:this.cardHoldername,
    cardmonth:this.cardmonth,
    cardnumbertotal:this.cardnumbertotal,
    cardyear:this.cardyear,
    cvvNumber:this.cvvNumber,
  }
  this.router.navigate(['/activation/payment/review']);
  this.productlistservice.setCarddetails(this.cardDetails);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 6 && (charCode < 2 || charCode >56)) {
      return false;
    }
    return true;
  }
}
