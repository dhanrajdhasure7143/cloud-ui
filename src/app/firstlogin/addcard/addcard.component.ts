import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { DeviceDetectorService } from "ngx-device-detector";
import { NgxSpinnerService } from "ngx-spinner";
import { CryptoService } from "src/app/_services/crypto.service";
import { ProductlistService } from "src/app/_services/productlist.service";
import { ProfileService } from "src/app/_services/profile.service";
import { SharedDataService } from "src/app/_services/shared-data.service";
import Swal from "sweetalert2";
import { FirstloginService } from "../@providers/firstlogin.service";

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.scss']
})
export class AddcardComponent implements OnInit {
  public selected_plans: any = {};
  public cardHoldername: any;
  public cardmonth: any;
  public cardnumbertotal: any;
  public cardyear: any;
  public cvvNumber: any;
  public cardDetails: any;
  public plantype: any;
  public productId: any;
  public plansList: any[];
  public name: any;
  public cardEncode: any;
  public cardDecode: any;
  public customerCount: string;
  public card: any;
  public cardEdit: any;
  // public yearList:any[]=[{"value":2020,"year":2020},{"value":2021,"year":2021},{"value":2022,"year":2022},{"value":2023,"year":2023},{"value":2024,"year":2024},{"value":2025,"year":2025},{"value":2026,"year":2026},{"value":2027,"year":2027}]
  public yearList: number[] = new Array(11);
  public userscount: number[] = new Array(17);
  public monthlist: number[] = new Array(12);
  tenantID: string;
  isStandard: boolean;
  isFreetierDisabled: boolean = false;
  public cardname: boolean = false;
  public expmonth: boolean = false;
  public expyear: boolean = false;
  cardnumber1: string;
  cardnumber2: string;
  cardnumber3: string;
  cardnumber4: string;
  public number: boolean;
  cards: any;
  cardid: string;
  paymentMode: any;
  public cardfulldetails: any[];
  allpaymentsList: any[];
  showErr: any;
  planselected: any;
  promo: any;
  public paymentToken: any;
  private spacialSymbolEncryption: string = '->^<-';
  finalAmount: any;
  public subscriptionDetails: any;
  modalRef: BsModalRef;
  config = {
    animated: false
  };
  validateCoupondata: any;
  totalPay: any;
  taxPercentage: any;
  isapplied: boolean = false;
  noOfusers: any;
  taxamount: any;
  agent: string;
  public deviceInfo = null;
  userDetails: any;
  data: any;
  ipAddress: any;
  planamount: any;
  constructor(private productlistservice: ProductlistService,
    private profileservice: ProfileService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private cryptoService: CryptoService,
    private sharedDataService: SharedDataService,
    private modalService: BsModalService,
    private deviceService: DeviceDetectorService,
    private http: HttpClient,
    private firstloginservice:FirstloginService,
    private paymentmode: ProfileService) { }

  ngOnInit() {
   // this.particles.getParticles();
   console.log(localStorage.getItem('authkey'))
    this.planselected = localStorage.getItem('selectedplan')
    if(this.planselected=='Standard'){
      this.planselected="Free Tier"
      this.planamount="0"
    }
    if(this.planselected=='Professional'){
      this.planamount="500"
    }
   
   // this.getproductPlans();
  //  this.allPaymentModes();
    this.editCardDetails();
    this.getYears();
  //  this.getAllPaymentmodes();
  }

  getYears() {
    // this.yearList=yearslist
  }

 

  getAllPaymentmodes() {
    const headers = {
      headers: new HttpHeaders({
        'authKey': localStorage.getItem('authkey')
      })
    };
 //const headers=new HttpHeaders({'authKey': localStorage.getItem('authkey')})
// 'timezone':'Asia/Calcutta','authKey': localStorage.getItem('authKey')}
    this.profileservice.listofPaymentModes().subscribe(response => {
      this.paymentMode = response

    });
  }

  onChangeCard(id) {
    if (localStorage.getItem('cardholdername') != undefined) {
      if (localStorage.getItem('selectedplan') != 'Free Tier') {
        this.cardname = true;
        this.number = true;
        this.expmonth = true;
        this.expyear = true;
      }


    }
    this.cardfulldetails = this.paymentMode.filter(obj => {
      return obj.id == id
    })


    this.cardHoldername = this.cardfulldetails[0].name
    this.cardmonth = this.cardfulldetails[0].cardExpMonth
    this.cardnumber1 = 'XXXX'
    this.cardnumber2 = 'XXXX'
    this.cardnumber3 = 'XXXX'
    this.cardnumber4 = this.cardfulldetails[0].cardLast4
    this.cardnumbertotal = this.cardnumber1 + this.cardnumber2 + this.cardnumber3 + this.cardnumber4
    this.cardyear = this.cardfulldetails[0].cardExpYear

  }

  allPaymentModes() {
    let headers={'authKey': localStorage.getItem('authkey')}
    this.paymentmode.listofPaymentModes().subscribe(resp => {

      this.allpaymentsList = resp
    })


  }
  getproductPlans() {
    this.productId = localStorage.getItem("selectedproductId"),
      this.plantype = localStorage.getItem("selectedplan")
    this.tenantID = localStorage.getItem("tenantName");
    // let headers={'Authorization': 'Bearer '+localStorage.getItem('currentUser'), 
    // 'ip-address': '0.0.0.1','timezone':'Asia/Calcutta'}
    this.productlistservice.getProductPlanes(this.productId, this.tenantID,localStorage.getItem('accessToken')).subscribe(data => {
      this.plansList = data
      this.plansList.forEach(obj => {
        if (obj.nickName == this.plantype) {
          this.selected_plans = obj
          this.paymentmode.validateCoupon(null, this.selected_plans.amount, this.cardDetails.customerCount,JSON.parse(localStorage.getItem('accessToken'))).subscribe(resp => {
            this.validateCoupondata = resp;
            this.totalPay = this.validateCoupondata.TotalPaybleAmount,
              this.noOfusers = this.cardDetails.customerCount
            this.taxPercentage = this.validateCoupondata.TaxPercentage
            this.taxamount = this.validateCoupondata.TaxAmount
          })
          if (this.selected_plans.term == "12month") {
            this.selected_plans.term = 'Annual'
          } else {
            this.selected_plans.term = 'One Month'
          }
          this.name = this.selected_plans.nickName;
        }
      });
    });

  }

  paymentfromSubmit() {
    if (this.cardid != undefined) {
      this.cardnumber4 = this.paymentMode.find(item => item.id == this.cardid).cardLast4
    }
    this.cardDetails = {
      cardHoldername: this.cardHoldername,
      cardmonth: this.cardmonth,
      cardnumbertotal: this.cardnumber1 + this.cardnumber2 + this.cardnumber3 + this.cardnumber4,
      cardyear: this.cardyear,
      cvvNumber: this.cvvNumber,
      id: this.cardid,
      customerCount: parseInt(this.customerCount)
    }
    this.cardEncode=Base64.encode(JSON.stringify(this.cardDetails));
    this.card={id:this.cardEncode}
   //console.log("carddetails",this.cardDetails)
    this.router.navigate(['/home/card-review',this.card]);

  }



  buyProductPlan(template) {

    if (this.cardid != undefined) {
      this.cardnumber4 = this.paymentMode.find(item => item.id == this.cardid).cardLast4
    }
    this.cardDetails = {
      cardHoldername: this.cardHoldername,
      cardmonth: this.cardmonth,
      cardnumbertotal: this.cardnumber1 + this.cardnumber2 + this.cardnumber3 + this.cardnumber4,
      cardyear: this.cardyear,
      cvvNumber: this.cvvNumber,
      id: this.cardid,
      customerCount: parseInt(this.customerCount)
    }

    const cardValue = {
      "name": this.cardDetails.cardHoldername,
      "number": this.cardDetails.cardnumbertotal,
      "exp_month": this.cardDetails.cardmonth,
      "exp_year": this.cardDetails.cardyear,
      "cvc": this.cardDetails.cvvNumber
    }
    const plandetails = {
      "ip": "1.2.3.4",
      "promo": this.promo,
      "items": [
        {
          "meta": {
            "orderable": true,
            "visible": true,
            "plan_id": this.selected_plans.id
          },
          "planId": this.selected_plans.id,
          "quantity": this.cardDetails.customerCount
        }
      ],
      "meta": {
        "orderable": true,
        "visible": true,
        "product_id": "2.0"
      }
    }

    let encrypt = this.spacialSymbolEncryption + this.cryptoService.encrypt(JSON.stringify(cardValue))
    let reqObj = { "enc": encrypt };
    // this.productlistservice.getSubscriptionPaymentToken(reqObj).subscribe(res => {
    //   this.spinner.show();
    //   this.paymentToken = res
    //   if (this.paymentToken.message == 'Failed To Generate Payment Token') {

    //     Swal.fire({
    //       title: 'Error',
    //       text: `Invalid Card Details!!`,
    //       type: 'error',
    //       showCancelButton: false,
    //       allowOutsideClick: false

    //     })
    //     this.spinner.hide();
    //   }
    //   else {

    //     this.productlistservice.subscribePlan(this.paymentToken.message, plandetails).subscribe(data => {
    //       this.subscriptionDetails = data
    //       this.spinner.hide();
    //       this.finalAmount = this.subscriptionDetails.amountPaid;
    //       this.sharedDataService.setFreetrialavailed(false);
    //       this.modalRef = this.modalService.show(template, this.config);
    //     })
    //   }


    // })

    this.modalRef = this.modalService.show(template, this.config);
    // const paymentToken='tok_1GezwJGxwuSV2qOkUhBazB4K'
    // const plandetails={ "ip": "1.2.3.4", 
    //           "items": [ { "planId":"IAP_t1m"} 
    //         ] 
    //       };

    // this.productlistservice.subscribePlan(paymentToken,plandetails).subscribe(data=>{this.subscriptionDetails=data
    // this.modalRef = this.modalService.show(template,this.config);
    // })
  }

  close_modal(){
    this.modalRef.hide();
   
    this.router.navigate(['/'])
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 6 && (charCode < 2 || charCode > 57)) {
      return false;
    }
    return true;
  }
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  editCardDetails() {

    this.route.params.subscribe(data => {
      this.cardEdit = data
      if (this.isEmpty(data) != true) {
        this.cardDetails = JSON.parse(Base64.decode(this.cardEdit.id));
        this.cardHoldername = this.cardDetails.cardHoldername;
        this.cardid = this.cardDetails.id;
        this.cardmonth = this.cardDetails.cardmonth;
        this.cardnumber1 = this.cardDetails.cardnumbertotal.slice(0, 4);
        this.cardnumber2 = this.cardDetails.cardnumbertotal.slice(4, 8);
        this.cardnumber3 = this.cardDetails.cardnumbertotal.slice(8, 12);
        this.cardnumber4 = this.cardDetails.cardnumbertotal.substring(12, this.cardDetails.cardnumbertotal.length - 0);
        this.cardyear = this.cardDetails.cardyear;
        this.cvvNumber = this.cardDetails.cvvNumber;
        this.customerCount = this.cardDetails.customerCount;
      }
    });
  }

  resetForm(form:NgForm) {
    form.resetForm();
    this.cardmonth=undefined;
    this.cardyear=undefined;
  }

  onChangeCardType(cardNumber) {
    var creditCardType = require("credit-card-type");
    this.cards = creditCardType(cardNumber);
  }
}
