import { Component, OnInit, Input } from '@angular/core';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';
import {yearslist } from './../../../../assets/jsons/yearlist.json'
import { ProfileService } from 'src/app/_services/profile.service';


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
  public customerCount:string;
  public card:any;
  public cardEdit:any;
  // public yearList:any[]=[{"value":2020,"year":2020},{"value":2021,"year":2021},{"value":2022,"year":2022},{"value":2023,"year":2023},{"value":2024,"year":2024},{"value":2025,"year":2025},{"value":2026,"year":2026},{"value":2027,"year":2027}]
  public yearList:number[] = new Array(11);
  public userscount:number[] = new Array(17);
  public monthlist:number[] = new Array(12);
  tenantID: string;
  isStandard: boolean;
  isFreetierDisabled: boolean=false;
  public cardname: boolean=false;
 public expmonth: boolean=false;
 public expyear: boolean=false;
  cardnumber1: string;
  cardnumber2: string;
  cardnumber3: string;
  cardnumber4: string;
  public number: boolean;
  cards: any;
  cardid: string;
  paymentMode: any;
  public cardfulldetails: any[];

  constructor( private productlistservice:ProductlistService,
              private profileservice: ProfileService,   
              private router:Router,
              private route:ActivatedRoute,) { }

  ngOnInit() {
    if(localStorage.getItem('cardholdername')!=undefined){
      if(localStorage.getItem('selectedplan')!='Free Tier')
    {
    this.cardname=true;
    this.number=true;
    this.expmonth=true;
    this.expyear=true;
    }
    this.cardHoldername=localStorage.getItem('cardholdername')
    this.cardmonth=localStorage.getItem('cardExpMonth')
    this.cardnumber1='XXXX'
    this.cardnumber2='XXXX'
    this.cardnumber3='XXXX'
    this.cardnumber4=localStorage.getItem('cardLast4')
    this.cardid=localStorage.getItem('cardId')
    this.cardnumbertotal=this.cardnumber1+this.cardnumber2+this.cardnumber3+this.cardnumber4
    this.cardyear=localStorage.getItem('cardExpYear')
    }
    this.getproductPlans();
    this.editCardDetails();
    this.getYears();
    this.getAllPaymentmodes();
  }

  getYears(){
    // this.yearList=yearslist
  }

  getAllPaymentmodes() {

    this.profileservice.listofPaymentModes().subscribe(response => {
       this.paymentMode = response 
        console.log("aditya",this.paymentMode)
        });
  }

  onChangeCard(id){
    if(localStorage.getItem('cardholdername')!=undefined){
      if(localStorage.getItem('selectedplan')!='Free Tier')
    {
    this.cardname=false;
    this.number=false;
    this.expmonth=false;
    this.expyear=false;
    }
    console.log("inside onchange",this.paymentMode)

    }
    this.cardfulldetails = this.paymentMode.filter(obj => {
      return obj.id == id
     })
     console.log("selectedcardinfo",this.cardfulldetails)
    
       this.cardHoldername=this.cardfulldetails[0].name
       this.cardmonth=this.cardfulldetails[0].cardExpMonth
       this.cardnumber1='XXXX'
       this.cardnumber2='XXXX'
       this.cardnumber3='XXXX'
       this.cardnumber4=this.cardfulldetails[0].cardLast4
       this.cardnumbertotal=this.cardnumber1+this.cardnumber2+this.cardnumber3+this.cardnumber4
       this.cardyear=this.cardfulldetails[0].cardExpYear
           
  }

  getproductPlans(){
    this.productId=localStorage.getItem("selectedproductId"),
    this.plantype=localStorage.getItem("selectedplan")
    this.tenantID=localStorage.getItem("tenantName");
    this.productlistservice.getProductPlanes(this.productId,this.tenantID).subscribe(data=> {this.plansList =data
      
      if(this.plansList.length > 1){
        this.plansList=this.plansList.reverse();
      }
          for(var i=0; i<this.plansList.length; i++){
            if(this.plansList[i].subscribed==true){
              this.isFreetierDisabled=true;
            }
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
        if(this.selected_plans.nickName == "Standard" ){
          this.isStandard=true;
        }
        this.name=this.selected_plans.nickName;
        if(this.selected_plans.term =="12month"){
          this.selected_plans.term= 'year'
        }else{
          this.selected_plans.term= 'month'
        }
      }
    });
  });
  
  }

  paymentfromSubmit(){
  this.cardDetails={
    cardHoldername:this.cardHoldername,
    cardmonth:this.cardmonth,
    cardnumbertotal:this.cardnumber1+this.cardnumber2+this.cardnumber3+this.cardnumber4,
    cardyear:this.cardyear,
    cvvNumber:this.cvvNumber,
    customerCount: parseInt(this.customerCount)
  }
  this.cardEncode=Base64.encode(JSON.stringify(this.cardDetails));
  this.card={id:this.cardEncode}
  console.log("Card details",this.card)
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
      this.cardnumber1=this.cardDetails.cardnumbertotal.slice(0, 4);
      this.cardnumber2=this.cardDetails.cardnumbertotal.slice(0, 4);
      this.cardnumber3=this.cardDetails.cardnumbertotal.slice(0, 4);
      this.cardyear=this.cardDetails.cardyear;
      this.cvvNumber=this.cardDetails.cvvNumber;
      this.customerCount=this.cardDetails.customerCount;
      }
    });
  }

  onChangeCardType(cardNumber) {
    var creditCardType = require("credit-card-type"); 
    this.cards = creditCardType(cardNumber);
  }

}
