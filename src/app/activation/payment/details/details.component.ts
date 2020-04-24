import { Component, OnInit, Input } from '@angular/core';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';


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
  public cardEncode:any;
  public cardDecode:any;
  public test:any;
  public yearList:any[]=[{"value":2020,"year":2020},{"value":2021,"year":2021},{"value":2022,"year":2022},{"value":2023,"year":2023},{"value":2024,"year":2024},{"value":2025,"year":2025},{"value":2026,"year":2026},{"value":2027,"year":2027}]


  constructor( private productlistservice:ProductlistService, 
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.getproductPlans();
    this.editCardDetails();
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
  this.cardEncode=Base64.encode(JSON.stringify(this.cardDetails));
  this.test={id:this.cardEncode}
  this.router.navigate(['/activation/payment/review',this.test]);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 6 && (charCode < 2 || charCode >56)) {
      return false;
    }
    return true;
  }
  editCardDetails(){
    this.route.params.subscribe(data=>{this.test=data
    this.cardDetails=JSON.parse(Base64.decode(this.test.id));
      this.cardHoldername=this.cardDetails.cardHoldername;
      this.cardmonth=this.cardDetails.cardmonth;
      this.cardnumbertotal=this.cardDetails.cardnumbertotal;
      this.cardyear=this.cardDetails.cardyear;
      this.cvvNumber=this.cardDetails.cvvNumber;
    });
  }
}
