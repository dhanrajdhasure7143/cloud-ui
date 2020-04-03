import { Component, OnInit, Input } from '@angular/core';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public selected_plans:any[];
  public selectedPlan:any[];
  public cardHoldername:any;
  public cardmonth:any;
  public cardnumbertotal:any;
  public cardyear:any;
  public cvvNumber:any;
  public cardDetails:any[]=[];
  public yearList:any[]=[{"value":2020,"year":2020},{"value":2021,"year":2021},{"value":2022,"year":2022},{"value":2023,"year":2023},{"value":2024,"year":2024},{"value":2024,"year":2025}]


  constructor( private productlistservice:ProductlistService, private router:Router) { }

  ngOnInit() {
    this.productlistservice.getSelectedProductPlan().subscribe(res=> {
      this.selected_plans = res
    console.log("selected",this.selected_plans);
    });
    this.productlistservice.getCarddetails().subscribe(res=>{
      this.cardDetails=res 
    console.log("card",this.cardDetails);
    })
    
    this.cardHoldername=this.cardDetails[0].cardHoldername;
    this.cardmonth=this.cardDetails[0].cardmonth;
    this.cardnumbertotal=this.cardDetails[0].cardnumbertotal;
    this.cardyear=this.cardDetails[0].cardyear;
    this.cvvNumber=this.cardDetails[0].cvvNumber;
  }

  paymentfromSubmit(){
  this.router.navigate(['/activation/payment/review']);
  this.cardDetails[0]={
    cardHoldername:this.cardHoldername,
    cardmonth:this.cardmonth,
    cardnumbertotal:this.cardnumbertotal,
    cardyear:this.cardyear,
    cvvNumber:this.cvvNumber,
  }
  console.log("details",this.cardDetails);
  this.productlistservice.setCarddetails(this.cardDetails);

  }
}
