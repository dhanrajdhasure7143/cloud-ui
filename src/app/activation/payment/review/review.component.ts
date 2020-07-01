import { Component, OnInit} from '@angular/core';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Base64 } from 'js-base64';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  constructor( private productlistservice:ProductlistService,
                private route:ActivatedRoute,
                private  router:Router,
                private modalService: BsModalService,) { }

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
        if(this.selected_plans.term =="12month"){
          this.selected_plans.term= 'Annual'
        }else{
          this.selected_plans.term= 'One Month'
        }
        this.name=this.selected_plans.nickName.slice(4);
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
                  "items": [
                    {
                      "meta":{"orderable":true,
                "visible":true,
                "plan_id":this.selected_plans.id},
                      "planId": this.selected_plans.id
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
          this.modalRef = this.modalService.show(template,this.config);
          console.log('sub',this.subscriptionDetails);
          

      
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
  applyCoupon(){
    // console.log('code',this.couponcode);
    // this.selected_plans.amount=100;
    // this.success='Coupon applied';
    // this.error='Enter Valid Coupon';
  }
  privacyPolicy(template){
    this.modalRef = this.modalService.show(template,this.config);
  }
  close_modal(){
    this.modalRef.hide();
    this.router.navigate(['/activation'])
  }

}
