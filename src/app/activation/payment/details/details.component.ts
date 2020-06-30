import { Component, OnInit, Input } from '@angular/core';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';
import {yearslist } from './../../../../assets/jsons/yearlist.json'


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
  public card:any;
  public cardEdit:any;
  // public yearList:any[]=[{"value":2020,"year":2020},{"value":2021,"year":2021},{"value":2022,"year":2022},{"value":2023,"year":2023},{"value":2024,"year":2024},{"value":2025,"year":2025},{"value":2026,"year":2026},{"value":2027,"year":2027}]
  public yearList:number[] = new Array(11);
  tenantID: string;

  constructor( private productlistservice:ProductlistService, 
              private router:Router,
              private route:ActivatedRoute,) { }

  ngOnInit() {
    this.getproductPlans();
    this.editCardDetails();
    this.getYears();
  }

  getYears(){
    // this.yearList=yearslist
  }

  getproductPlans(){
    this.productId=localStorage.getItem("selectedproductId"),
    this.plantype=localStorage.getItem("selectedplan")
    this.tenantID=localStorage.getItem("tenantName");
    this.productlistservice.getProductPlanes(this.productId,this.tenantID).subscribe(data=> {this.plansList =data
      console.log("testtttt",this.plansList)
      if(this.plansList.length > 1){
        this.plansList=this.plansList.reverse();
      }
      for(var i=0; i<this.plansList.length; i++){
        var features=[];
        for (let [key, value] of Object.entries(this.plansList[i].features)) {
          var obj={'name':key,'active':value}
          features.push(obj)  
        }
        this.plansList[i].features=features;
      }
      for(var a=0; a<this.plansList[2].features.length-2; a++){
        this.plansList[1].features[a].limited=true
      }
        this.plansList[2].features[2].limited=true;
        this.plansList[2].features[3].limited=true;

    this.plansList.forEach(obj => {
      if(obj.nickName == this.plantype){
        this.selected_plans=obj
        this.name=this.selected_plans.nickName.slice(4);
        if(this.selected_plans.term =="12month"){
          this.selected_plans.term= 'Annual'
        }else{
          this.selected_plans.term= 'Month'
        }
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
  this.card={id:this.cardEncode}
  this.router.navigate(['/activation/payment/review',this.card]);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 6 && (charCode < 2 || charCode >57)) {
      return false;
    }
    return true;
  }
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
   }
  editCardDetails(){
    this.route.params.subscribe(data=>{this.cardEdit=data
      if(this.isEmpty(data) != true){
    this.cardDetails=JSON.parse(Base64.decode(this.cardEdit.id));
      this.cardHoldername=this.cardDetails.cardHoldername;
      this.cardmonth=this.cardDetails.cardmonth;
      this.cardnumbertotal=this.cardDetails.cardnumbertotal;
      this.cardyear=this.cardDetails.cardyear;
      this.cvvNumber=this.cardDetails.cvvNumber;
      }
    });
  }
}
