import { Component, OnInit, Input, ViewChild, TemplateRef, Inject } from '@angular/core';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Base64 } from 'js-base64';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { subtract } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import { ProfileService } from 'src/app/_services/profile.service';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { NgxSpinnerService } from "ngx-spinner";
import { CryptoService } from 'src/app/_services/crypto.service';
import { FirstloginComponent } from '../firstlogin.component';
import { FirstloginService } from '../@providers/firstlogin.service';
import { User } from 'src/app/_models';
import { IpServiceService } from 'src/app/_services/ip-service.service';
import { AuthenticationService } from 'src/app/_services';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { APP_CONFIG } from 'src/app/app.config';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  modalRef: BsModalRef;
  public selected_plans: any = {};
  public cardDetails: any;
  public isagree: boolean;
  public isdiable: boolean = true;
  public clicked: boolean = false;
  public productId: any;
  public plantype: any;
  public plansList: any;
  public name: any;
  public cardnumber: any;
  cardNumberdigts: any;
  public cardData: any;
  public iscoupon: boolean = false;
  public couponcode: any;
  public error = '';
  public success = '';
  public cvvnumber: any;
  public subscriptionDetails: any;
  config = {
    animated: false
  };
  public paymentToken: any;
  tenantID: string;
  promo: any;
  finalAmount: any;
  validateCoupondata: any;
  totalPay: any;
  taxPercentage: any;
  isapplied: boolean = false;
  noOfusers: any;
  taxamount: any;
  couponAmount: any;
  newAccessToken: any[];
  userRole: any;
  freeactive: boolean = true;
  private spacialSymbolEncryption: string = '->^<-';
  userDetails: any;
  data: any;
  model: User;
  decodedToken: any = {};
  public ipAddress: string;
  agent: string;
  public deviceInfo = null;
  paymentMode: any;
  details: any;
  @ViewChild('template') template: TemplateRef<any>;
  planselected: string;
  planterm: string;
  planamount: string;
  constructor(private productlistservice: ProductlistService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private sharedDataService: SharedDataService,
    private firstloginservice: FirstloginService,
    private ip: IpServiceService,
    private authenticationService: AuthenticationService,
    private deviceService: DeviceDetectorService,
    private http: HttpClient,
    private cryptoService: CryptoService,
    @Inject(APP_CONFIG) private appconfig) { }

  ngOnInit() {
    // this.particles.getParticles();
    this.EnteredCarddetails();
    this.planselected = localStorage.getItem('selectedplan')
    if (this.planselected == 'Standard') {
      this.planselected = "Free Tier"
      this.planterm = "One Month"
      this.planamount = "0"
    }
    if (this.planselected == 'Professional') {
      this.planterm = "Annual"
      this.planamount = "500"
    }
    // this.getproductPlans();
  }

  getproductPlans() {
    this.productId = "EZFlow";
    this.plantype = localStorage.getItem("selectedplan")
    this.tenantID = localStorage.getItem("tenantid");
    this.productlistservice.getProductPlanes(this.productId, this.tenantID, JSON.parse(localStorage.getItem('accessToken'))).subscribe(data => {
      this.plansList = data
      this.plansList.forEach(obj => {
        if (obj.nickName == this.plantype) {
          this.selected_plans = obj
          this.profileService.validateCoupon(null, this.selected_plans.amount, this.cardDetails.customerCount, JSON.parse(localStorage.getItem('accessToken'))).subscribe(resp => {
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
  EnteredCarddetails() {
    this.route.params.subscribe(data => {
      this.cardData = data

      this.cardDetails = JSON.parse(Base64.decode(this.cardData.id));
      this.cardnumber = this.cardDetails.cardnumbertotal.slice(0, 12).replace(/\d/g, 'X') + this.cardDetails.cardnumbertotal.slice(-3);
      // this.cardNumberdigts=this.cardnumber.toString().split('').slice(12).join('');
      this.cardNumberdigts = this.cardnumber.match(new RegExp('.{1,4}', 'g')).join('-')
      this.cvvnumber = this.cardDetails.cvvNumber.replace(new RegExp("[0-9]", "g"), "X")
    });
  }
  onchangechekbox() {
    this.isdiable = !this.isagree;
  }
  buyProductPlan() {
    this.onSubmit();
  }
  editCardDetails() {
    this.router.navigate(['/home/add-card', this.cardData]);
  }
  haveCoupon() {
    this.iscoupon = true;
  }

  buyplan(template) {

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
    this.productlistservice.getSubscriptionPaymentToken(reqObj, JSON.parse(localStorage.getItem('accessToken'))).subscribe(res => {
      this.spinner.show();
      this.paymentToken = res
      if (this.paymentToken.message == 'Failed To Generate Payment Token') {

        Swal.fire({
          title: 'Error',
          text: `Invalid Card Details!!`,
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: false

        })
        this.spinner.hide();
      }
      else {

        this.productlistservice.subscribePlan(this.paymentToken.message, plandetails, JSON.parse(localStorage.getItem('accessToken'))).subscribe(data => {
          this.subscriptionDetails = data
          this.spinner.hide();
          this.finalAmount = this.subscriptionDetails.amountPaid;
          this.sharedDataService.setFreetrialavailed(false);
          //this.getproductPlans();
          this.modalRef = this.modalService.show(template, this.config);
        })
      }


    })
  }
  applyCoupon(couponcode) {


    const cardValue = {
      "name": this.cardDetails.cardHoldername,
      "number": this.cardDetails.cardnumbertotal,
      "exp_month": this.cardDetails.cardmonth,
      "exp_year": this.cardDetails.cardyear,
      "cvc": this.cardDetails.cvvNumber
    }

    let encrypt = this.spacialSymbolEncryption + this.cryptoService.encrypt(JSON.stringify(cardValue));
    let reqObj = { "enc": encrypt };
    this.productlistservice.getSubscriptionPaymentToken(reqObj, JSON.parse(localStorage.getItem('accessToken'))).subscribe(res => {

      this.paymentToken = res
      if (this.paymentToken.message == 'Failed To Generate Payment Token') {

        Swal.fire({
          title: 'Error',
          text: `Invalid Card Details!!`,
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: false

        })

      }
      else {
        this.profileService.validateCoupon(couponcode, this.selected_plans.amount, this.cardDetails.customerCount, JSON.parse(localStorage.getItem('accessToken'))).subscribe(resp => {
          this.validateCoupondata = resp;
          this.isapplied = true;
          this.totalPay = this.validateCoupondata.TotalPaybleAmount;
          this.taxamount = this.validateCoupondata.TaxAmount
          if (this.validateCoupondata.message == 'Coupon is valid') {
            if (this.validateCoupondata.amountOff != null) {
              this.couponAmount = this.validateCoupondata.amountOff;
            }
            else {
              this.couponAmount = this.validateCoupondata.percentageOff;
            }

            this.promo = couponcode;
            Swal.fire({
              title: 'Successful',
              text: `Coupon applied successfully!!`,
              type: 'success',
              showCancelButton: false,
              allowOutsideClick: false
            })

          }
          else {
            this.isapplied = false;

            this.promo = null;
            Swal.fire({
              title: 'Error',
              text: `Invalid Coupon Code!!`,
              type: 'error',
              showCancelButton: false,
              allowOutsideClick: false
            })

          }

        })
      }
    })

  }
  privacyPolicy(template) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
  }

  public getBrowserName() {
    this.agent = window.navigator.userAgent.toLowerCase()

    switch (true) {
      case this.agent.indexOf('edge') > -1:
        return 'edge';
      case this.agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case this.agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case this.agent.indexOf('trident') > -1:
        return 'ie';
      case this.agent.indexOf('firefox') > -1:
        return 'firefox';
      case this.agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }

  }
  close_modal() {

    this.modalRef.hide();

     Swal.fire({
          title: 'Success',
          text: `Registration completed successfully!`,
          type: 'success',
          showCancelButton: false,
          allowOutsideClick: false
        }).then((result) => {

    var accesToken = JSON.parse(localStorage.getItem('accessToken'));
    var refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    var encryptToken = btoa(accesToken)
    var encryptrefreshToken = btoa(refreshToken);
    var firstName = this.userDetails.firstName;
    var lastName = this.userDetails.lastName;
    var ProfileuserId = this.userDetails.userId;
    var tenantName = localStorage.getItem('tenantid')
    var userId = this.cryptoService.encrypt(JSON.stringify(this.userDetails.userId));
    var useridBase64 = btoa(userId);
    var userIp = btoa('0.0.0.1');
    var productURL = this.appconfig.newproductendpoint;
    window.location.href = productURL+"/#/pages/home?accessToken=" + encryptToken + '&refreshToken=' + encryptrefreshToken + '&firstName=' + firstName + '&lastName=' + lastName + '&ProfileuserId=' + ProfileuserId + '&tenantName=' + tenantName + '&authKey=' + useridBase64 + '&userIp=' + userIp
        });
  }
  lettersAndNumbers(event): boolean {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  }

  onSubmit() {
    this.spinner.show();
    this.userDetails = JSON.parse(Base64.decode(localStorage.getItem('details')));
    console.log(this.userDetails)

    var payload = new FormData();

    var reqObj = {}
    reqObj = {
      'userId': this.userDetails.userId,
      'firstName': this.userDetails.firstName,
      'lastName': this.userDetails.lastName,
      'password': this.userDetails.password,
      'phoneNumber': this.userDetails.phoneNumber,
      'country': this.userDetails.country,
      'designation': this.userDetails.designation,
      'company': this.userDetails.company,
      'state': this.userDetails.state,
      'city': this.userDetails.city,
      'zipcode': this.userDetails.zipcode,
      'department': this.userDetails.department,
      'profile_image': this.userDetails.profile_image
    }
    // if(this.selectedFile!=undefined){
    //   reqObj['profilePic'] = payload;
    //   reqObj['profilePicName'] = this.selectedFile.name;
    // }

    payload.append('firstName', this.cryptoService.encrypt(JSON.stringify(reqObj)));
    this.firstloginservice.registerUser(payload).subscribe(res => {
      this.data = res
      this.spinner.hide();
      //   sessionStorage.clear();
      //  localStorage.clear();
      if (this.data.body.errorMessage === 'Uploaded file is too large') {
        Swal.fire({
          title: 'Error!',
          text: "Uploaded file is too large",
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })
      }
      else if (this.data.body.errorMessage === 'Uploaded file is not supported') {
        Swal.fire({
          title: 'Error!',
          text: "Please upload png or jpg image",
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })
      }
      else {
        // Swal.fire({
        //   title: 'Success',
        //   text: `Registration completed successfully!`,
        //   type: 'success',
        //   showCancelButton: false,
        //   allowOutsideClick: false
        // }).then((result) => {
          this.spinner.show();
        //  if (result.value) {
            let res: any;
            this.authenticationService.userDetails(this.userDetails.userId).subscribe(data => {
              res = data;
              localStorage.setItem("tenantid", res.tenantID)
              let headers = {};
              let url = `/api/login/beta/accessToken`;
              const browser = this.getBrowserName();

              this.deviceInfo = this.deviceService.getDeviceInfo();
              if (this.ipAddress == undefined)
                this.ipAddress = '0.0.0.1';
              headers = {
                'device-info': this.deviceInfo.userAgent, 'ip-address': this.ipAddress, 'device-type': 'W',
                'browser': browser
              }

              let reqObj = { 'userId': this.userDetails.userId, 'password': this.userDetails.password }
              let encrypt = this.spacialSymbolEncryption + this.cryptoService.encrypt(JSON.stringify(reqObj));
              this.http.post<any>(url, { "enc": encrypt }, { headers }).subscribe(user => {
                if (user.accessToken) {
                  localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
                  localStorage.setItem('refreshToken', JSON.stringify(user.refreshToken));

                  this.spinner.hide();
                  this.spinner.show();
                  this.productId = "EZFlow";
                  this.plantype = localStorage.getItem("selectedplan")
                  this.tenantID = localStorage.getItem("tenantid");
                  this.productlistservice.getProductPlanes(this.productId, this.tenantID, JSON.parse(localStorage.getItem('accessToken'))).subscribe(data => {
                    this.plansList = data
                    this.plansList.forEach(obj => {
                      if(obj.active==true || obj.active=='true'){
                      if (obj.nickName == this.plantype) {
                        this.selected_plans = obj
                        this.profileService.validateCoupon(null, this.selected_plans.amount, this.cardDetails.customerCount, JSON.parse(localStorage.getItem('accessToken'))).subscribe(resp => {
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
                      }
                    });

                    const cardValue = {
                      "name": this.cardDetails.cardHoldername,
                      "number": this.cardDetails.cardnumbertotal,
                      "exp_month": this.cardDetails.cardmonth,
                      "exp_year": this.cardDetails.cardyear,
                      "cvc": this.cardDetails.cvvNumber
                    }
                    var users: any;
                    if (this.planselected == 'Standard') {
                      users = "30";
                    }
                    if (this.planselected == 'Standard') {
                      users = "100";
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
                          "quantity":"100"
                        }
                      ],
                      "meta": {
                        "orderable": true,
                        "visible": true,
                        "product_id": "EZFlow"
                      }
                    }

                    let encrypt = this.spacialSymbolEncryption + this.cryptoService.encrypt(JSON.stringify(cardValue))
                    let reqObj = { "enc": encrypt };
                    this.productlistservice.getSubscriptionPaymentToken(reqObj, JSON.parse(localStorage.getItem('accessToken'))).subscribe(res => {
                      this.spinner.show();
                      this.paymentToken = res
                      if (this.paymentToken.message == 'Failed To Generate Payment Token') {

                        Swal.fire({
                          title: 'Error',
                          text: `Invalid Card Details!!`,
                          type: 'error',
                          showCancelButton: false,
                          allowOutsideClick: false

                        })
                        this.spinner.hide();
                      }
                      else {

                        this.productlistservice.subscribePlan(this.paymentToken.message, plandetails, JSON.parse(localStorage.getItem('accessToken'))).subscribe(data => {
                          this.subscriptionDetails = data
                          this.spinner.hide();
                          this.finalAmount = this.subscriptionDetails.amountPaid;
                          this.sharedDataService.setFreetrialavailed(false);
                          this.modalRef = this.modalService.show(this.template, this.config);
                        })
                      }


                    })
                  });

                }

              });
            });

        //  }

      //  });
      }
    }, err => {
      Swal.fire({
        title: 'Error!',
        type: 'error',
        text: `${err.error.message} ! Please check your user name`,
        allowOutsideClick: false
      });
    });
  }
}
