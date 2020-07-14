import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/_services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  couponDetails: any; 
  couponNamename: any;
  couponIdId: any;
  durationTime: any;
  percentageOffTot:any;
  amountOff:any;
  isPercentage:boolean=false;
  isReedemBy:boolean=false;
  isReedemTimes:boolean=false;
  isAmount:boolean=false;
  data: void;
  constructor(private profileService:ProfileService) { 
     
  }

  ngOnInit() {
  }
  CreateCoupon(){
    this.couponDetails={
      couponNamename:this.couponNamename,
      couponIdId:this.couponIdId,
      durationTime:this.durationTime,
      percentageOffTot:this.percentageOffTot,
      amountOff:this.amountOff
        }
    this.createCoupon()
    console.log("form submitted")
  }
  createCoupon() {
    let input={
      
      "currency": "usd",
      "duration": this.durationTime,
      "durationInMonth": 0,
      "name": this.couponNamename,
      "percent_off": this.percentageOffTot,
      "redeem_by": 1596276480,
      "redmee_times": 3
    }
    this.profileService.createCoupon(input).subscribe(resp=>{this.data=resp
      Swal.fire({
        title: 'Successful',
        text: `Coupon creation successful...`,
        type: 'success',
        showCancelButton: false,
        allowOutsideClick: false
      }) 
         
          });
          
      console.log('resp is',this.data)
  }
  onChangeRadio(value){
    if(value=='percentageOff'){
      this.isPercentage=true;
      this.isAmount=false;
    }
    else{
      this.isAmount=true;
      this.isPercentage=false;
    }
    console.log("value is",value)

  }
  onSelected(value){
    if(value=='redeemBy' ){
this.isReedemBy=true;
    }
    else{
      this.isReedemTimes=true;
    }
  }

}
