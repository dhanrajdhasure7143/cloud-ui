import { Component, OnInit, Input} from '@angular/core';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Base64 } from 'js-base64';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { subtract } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import { ProfileService } from 'src/app/_services/profile.service';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { SharedDataService } from 'src/app/_services/shared-data.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
 
  modalRef: BsModalRef;
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
public cardData:any;
public iscoupon:boolean=false;
public couponcode:any;
public error='';
public success='';
public cvvnumber:any;
public subscriptionDetails:any;
config = {
  animated: false
};
public paymentToken:any;
  tenantID: string;
  promo: any;
  finalAmount: any;
  validateCoupondata: any;
  totalPay: any;
  taxPercentage: any;
  isapplied: boolean=false;
  noOfusers: any;
  taxamount: any;
  couponAmount: any;
  newAccessToken: any[];
  userRole: any;
  freeactive: boolean=true;
  constructor( private productlistservice:ProductlistService,
                private route:ActivatedRoute,
                private  router:Router,
                private modalService: BsModalService,
                private profileService: ProfileService,
                private sharedDataService:SharedDataService) { }

  ngOnInit() {
    this.EnteredCarddetails();
 
    this.getproductPlans();
  }

  getproductPlans(){
    this.productId=localStorage.getItem("selectedproductId"),
    this.plantype=localStorage.getItem("selectedplan")
    this.tenantID=localStorage.getItem("tenantName");
    this.productlistservice.getProductPlanes(this.productId,this.tenantID).subscribe(data=> {this.plansList =data
    this.plansList.forEach(obj => {
      if(obj.nickName == this.plantype){
        this.selected_plans=obj
        this.profileService.validateCoupon(null,this.selected_plans.amount,this.cardDetails.customerCount).subscribe(resp=>{
          this.validateCoupondata=resp;
        this.totalPay=this.validateCoupondata.TotalPaybleAmount,
        this.noOfusers=this.cardDetails.customerCount
      this.taxPercentage=this.validateCoupondata.TaxPercentage
    this.taxamount=this.validateCoupondata.TaxAmount})
        if(this.selected_plans.term =="12month"){
          this.selected_plans.term= 'Annual'
        }else{
          this.selected_plans.term= 'One Month'
        }
        this.name=this.selected_plans.nickName;
      }
    });
  });
  }
  EnteredCarddetails(){       
    this.route.params.subscribe(data=>{this.cardData=data

      this.cardDetails=JSON.parse(Base64.decode(this.cardData.id));
      console.log("this.cardDetails.token",this.cardDetails);

          this.cardnumber=this.cardDetails.cardnumbertotal.slice(0, 12).replace(/\d/g, 'X')+this.cardDetails.cardnumbertotal.slice(-4);
          // this.cardNumberdigts=this.cardnumber.toString().split('').slice(12).join('');
          this.cardNumberdigts=this.cardnumber.match(new RegExp('.{1,4}', 'g')).join('-')
            console.log("this.cardDetails",this.cardData);
          this.cvvnumber=this.cardDetails.cvvNumber.replace(new RegExp("[0-9]", "g"), "X")
        });
  }
  onchangechekbox(){
    this.isdiable=!this.isagree;
  }
  buyProductPlan(template){
     console.log('planslist', this.selected_plans);
     console.log("this.cardDetails",this.cardDetails);
    
    const cardValue={
      "number":this.cardDetails.cardnumbertotal,
      "exp_month":this.cardDetails.cardmonth,
      "exp_year":this.cardDetails.cardyear,
      "cvc":this.cardDetails.cvvNumber
    }
    const plandetails={
                  "ip": "1.2.3.4",
                  "promo":this.promo,
                  "items": [
                    {
                      "meta":{"orderable":true,
                "visible":true,
                "plan_id":this.selected_plans.id},
                      "planId": this.selected_plans.id,
                      "quantity":this.cardDetails.customerCount
                    }
                  ],
                  "meta": {"orderable":true,
                "visible":true,
                "product_id":"2.0"}
                }
    this.productlistservice.getPaymentToken(cardValue).subscribe(res=>{
      this.paymentToken=res
      console.log('token',this.paymentToken);
   
      this.productlistservice.subscribePlan(this.paymentToken,plandetails).subscribe(data=>{this.subscriptionDetails=data
       this.finalAmount=this.subscriptionDetails.amountPaid;
this.sharedDataService.setFreetrialavailed(false);
       this.modalRef = this.modalService.show(template,this.config);
             })
   
    })

    // const paymentToken='tok_1GezwJGxwuSV2qOkUhBazB4K'
    // const plandetails={ "ip": "1.2.3.4", 
    //           "items": [ { "planId":"IAP_t1m"} 
    //         ] 
    //       };

    // this.productlistservice.subscribePlan(paymentToken,plandetails).subscribe(data=>{this.subscriptionDetails=data
    // this.modalRef = this.modalService.show(template,this.config);
    // })
  }
  editCardDetails(){
  this.router.navigate(['/activation/payment/details',this.cardData]);
  }
  haveCoupon(){
    this.iscoupon=true;
  }
  applyCoupon(couponcode){
    this.profileService.validateCoupon(couponcode,this.selected_plans.amount,this.cardDetails.customerCount).subscribe(resp=>{
      this.validateCoupondata=resp;
      this.isapplied=true;
        this.totalPay=this.validateCoupondata.TotalPaybleAmount;
        this.taxamount=this.validateCoupondata.TaxAmount
      if(this.validateCoupondata.message=='Coupon is valid'){
        if( this.validateCoupondata.amountOff!=null){
          this.couponAmount=this.validateCoupondata.amountOff;
        }
        else{
          this.couponAmount=this.validateCoupondata.percentageOff;
        }
        
        
        this.promo=couponcode;
        Swal.fire({
          title: 'Successful',
          text: `Coupon applied successfully...`,
          type: 'success',
          showCancelButton: false,
          allowOutsideClick: false
        })
       
     }
      else{
        this.isapplied=false;

        this.promo=null;
        Swal.fire({
          title: 'Invalid',
          text: `Invalid Coupon Code...`,
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: false
        })

      }

    })
   
   
    console.log("coupn code is",couponcode)

  }
  privacyPolicy(template){
    this.modalRef = this.modalService.show(template,this.config);
  }
  close_modal(){
    this.modalRef.hide();
    this.productlistservice.getNewAccessToken().subscribe(resp=>{
      this.newAccessToken=resp
      console.log("token",resp)
      localStorage.setItem('currentUser', JSON.stringify(this.newAccessToken));
    })
    this.profileService.getUserRole(2).subscribe(res=>{
      this.userRole=res.message;
      console.log("user role is",this.userRole)
      localStorage.setItem('userRole',this.userRole);
    })
    this.router.navigate(['/activation'])
  }

}
