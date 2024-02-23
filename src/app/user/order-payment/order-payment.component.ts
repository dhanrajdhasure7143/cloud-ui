import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/_services';
import { CryptoService } from 'src/app/_services/crypto.service';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from 'sweetalert2';
import { LoginService } from '../_services/login.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { IpServiceService } from 'src/app/_services/ip-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {
  cardDetails: FormGroup;
  @Input("planDetails") planDetails:any[]=[];
  @Output() backtoScreen = new EventEmitter();
  @Input() log_data: any={};
  totalAmount : number;
  userEmail : any;
  userDetails : any = {};
  agent: string;
  public deviceInfo = null;
  public ipAddress: string;
  private spacialSymbolEncryption: string = '->^<-';
  public productId: any;
  public plantype: any;
  tenantID: string;
  public plansList: any; 
  public selected_plans: any = {};
  public name: any;
  promo: any;
  public paymentToken: any;
  public error = '';
  public success = '';
  public cardData: any;
  public subscriptionDetails: any;
  finalAmount: any;
  base64textString:any;
  password : any;
  isButtonEnable : boolean = true;
  isChecked: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private service: FirstloginService,
              private crypto:CryptoService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService,
              private profileService: ProfileService,
              private sharedDataService: SharedDataService,
              private firstloginservice: FirstloginService,
              private ip: IpServiceService,
              private authenticationService: AuthenticationService,
              private deviceService: DeviceDetectorService,
              private http: HttpClient, 
              private loginservice: LoginService,
              private cryptoService: CryptoService,
              private productlistservice: ProductlistService,
              ) {}

  ngOnInit(): void {
    this.cardDetails = this.formBuilder.group({
      cardNumber: ['',Validators.required],
      expiry: ['',Validators.required],
      cvv: ['',Validators.required],
      cardHolderName: ['',Validators.required],
    });

  }

  ngOnChanges(){
    console.log(this.planDetails)
    if(this.log_data){
      this.userEmail = this.log_data.email;
      this.password = this.log_data.password
    }
    if(this.userEmail){
      this.registrationDetails();
    }
  }

  calculateTotalPrice(): number {
    this.totalAmount = 0;
    for (const plan of this.planDetails) {
      if (plan.interval === 'Monthly') {
        this.totalAmount += plan.amount;
      } else if (plan.interval === 'Yearly') {
        this.totalAmount += plan.amount;
      }
    }
    return this.totalAmount;
  }

  registrationDetails() {
    console.log(this.userEmail,"this.userEmail")
    this.profileService.getDetailsUser(this.userEmail.toLowerCase()).subscribe((data : any) =>{
      this.userDetails = data.response
    })
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

  getBase64pic(file) {
    var reader = new FileReader();
    reader.onload = this._handleReaderLoadedpic.bind(this);
    reader.readAsBinaryString(file);
  }
  
  _handleReaderLoadedpic(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  paymentSubscription() {
    this.spinner.show();
    var payload = new FormData();
    var reqObj = {}
    reqObj = {
      'userId': this.userDetails.userId,
      'firstName': this.userDetails.firstName,
      'lastName': this.userDetails.lastName,
      'password': this.password,
      'phoneNumber': this.userDetails.phoneNumber,
      'country': this.userDetails.country,
      'designation': this.userDetails.designation,
      'company': this.userDetails.company,
      'state': this.userDetails.state,
      'city': this.userDetails.city,
      'zipcode': this.userDetails.zipcode,
      'department': this.userDetails.department,
      'profile_image':this.userDetails.profile_image,
      'otp': "",
      'isSubscriptionEnabled': true
    }

    console.log(reqObj,this.cryptoService.encrypt(JSON.stringify(reqObj)),"reqObj")
    payload.append('firstName', this.cryptoService.encrypt(JSON.stringify(reqObj)));
    this.firstloginservice.registerUser(payload).subscribe((res : any) => {
      this.spinner.hide();
      if (res.body.errorMessage === 'Uploaded file is too large') {
        Swal.fire({
          title: 'Error!',
          text: "Uploaded file is too large",
          icon: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })
      } else if (res.body.errorMessage === 'Uploaded file is not supported') {
        Swal.fire({
          title: 'Error!',
          text: "Please upload png or jpg image",
          icon: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })
      } else if (res.body.errorMessage === 'User already registered') {
        Swal.fire({
          title: 'Error!',
          text: "User already registered. Please try to login!!",
          icon: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/']);
          }
        })
      } else {
        this.spinner.show();
        //  if (result.value) {
        let res: any;
        this.profileService.getDetailsUser(this.userEmail.toLowerCase()).subscribe(data => {
          res = data;
          localStorage.setItem("tenantid", res.tenantID)
          let headers = {};
          console.log(localStorage,"localStorage");
          let url = `/api/login/beta/accessToken`;
          const browser = this.getBrowserName();
          this.deviceInfo = this.deviceService.getDeviceInfo();
          if (this.ipAddress == undefined)
            this.ipAddress = '0.0.0.1';
          headers = {
            'device-info': this.deviceInfo.userAgent, 'ip-address': this.ipAddress, 'device-type': 'W',
            'browser': browser
          }
          let reqObj = { 'userId': this.userEmail.toLowerCase(), 'password': this.password }
          let encrypt = this.spacialSymbolEncryption + this.cryptoService.encrypt(JSON.stringify(reqObj));
          this.http.post<any>(url, { "enc": encrypt }, { headers }).subscribe(user => {
            console.log(user,"user")
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
                  if (obj.active == true || obj.active == 'true') {
                    if (obj.nickName == this.plantype) {
                      this.selected_plans = obj
                      // this.profileService.validateCoupon(null, this.selected_plans.amount, this.cardDetails.customerCount, JSON.parse(localStorage.getItem('accessToken'))).subscribe(resp => {
                      //   this.validateCoupondata = resp;
                      //   this.totalPay = this.validateCoupondata.TotalPaybleAmount,
                      //     this.noOfusers = this.cardDetails.customerCount
                      //   this.taxPercentage = this.validateCoupondata.TaxPercentage
                      //   this.taxamount = this.validateCoupondata.TaxAmount
                      // })
                      if (this.selected_plans.term == "1year") {
                        this.selected_plans.term = 'Annual'
                      } else {
                        this.selected_plans.term = 'One Month'
                      }
                      this.name = this.selected_plans.nickName;
                    }
                  }
                });

                const cardValue = {
                  "name": this.cardDetails.value.cardHolderName,
                  "number": this.cardDetails.value.cardNumber,
                  // "exp_month": this.cardDetails.cardmonth,
                  // "exp_year": this.cardDetails.cardyear,
                  "cvc": this.cardDetails.value.cvv
                }
                var users: any;
                var quantity: any = 0;
                // if (this.planselected == 'Standard') {
                //   users = "30";
                //   quantity = "0"
                // }
                // if (this.planselected == 'Professional') {
                //   users = "100";
                //   quantity = "0"
                // }
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
                      "quantity": quantity
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
                      icon: 'error',
                      showCancelButton: false,
                      allowOutsideClick: false

                    }).then((result) => {
                      if (result.value) {
                        this.profileService.deleteSelectedUser(this.userEmail).subscribe(resp => {
                          let encrypt = this.cryptoService.encrypt(this.userEmail);
                          let user = encrypt;
                          this.loginservice.sentVerificationMail(user).subscribe(res => {
                            this.router.navigate(['/home/add-card', this.cardData]);
                          }, error => {
                            this.error = 'User Already Exists'
                          }
                          );
                        }, err => {
                          Swal.fire({
                            title: 'Error',
                            text: `Please Register Again!!`,
                            icon: 'error',
                            showCancelButton: false,
                            allowOutsideClick: true
                          }).then((result) => {
                            if (result.value) {
                              this.router.navigate(['/']);
                            }
                          })
                        })
                      }
                    })
                    this.spinner.hide();
                  }
                  else {
                   
                    setTimeout(()=>{
                      this.spinner.hide();
                      Swal.fire({
                        title: 'Success',
                        text: `Subscription Completed Successfully!!`,
                        icon: 'success',
                        showCancelButton: false,
                        allowOutsideClick: true
                      }).then((result) => {
                        this.productlistservice.subscribePlan(this.paymentToken.message, plandetails, JSON.parse(localStorage.getItem('accessToken'))).subscribe(data => {
                          this.subscriptionDetails = data
                          this.spinner.hide();
                          if (this.subscriptionDetails.message == "Subscription Completed Successfully!!") {
                            this.finalAmount = this.subscriptionDetails.amountPaid;
                            this.sharedDataService.setFreetrialavailed(false);

                          }
                          else {
                            Swal.fire({
                              title: 'Error',
                              text: `Unable to register due to issue with the given card details. Please try again !!`,
                              icon: 'error',
                              showCancelButton: false,
                              allowOutsideClick: false
                            }).then((result) => {
                              if (result.value) {
                                this.spinner.show();
                                this.profileService.deleteSelectedUser(this.userEmail).subscribe(resp => {
                                  this.spinner.hide();
                                  this.router.navigate(['/']);
    
                                }, err => {
                                  Swal.fire({
                                    title: 'Error',
                                    text: `Please Register Again!!`,
                                    icon: 'error',
                                    showCancelButton: false,
                                    allowOutsideClick: true
                                  }).then((result) => {
                                    if (result.value) {
                                      this.router.navigate(['/']);
                                    }
                                  })
                                })
                              }
                            })
                          }
                        })
                        this.router.navigate(['/']);
                      })
                     },10000)
                 
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
      this.spinner.hide();
      Swal.fire("Error", "Registration failed", "error");
    })
  }

  backToplans(){
    this.backtoScreen.emit(true)
  }

  onchangecheckbox(event : any){
    console.log(event,event.target.checked)
    if(event.target.checked)
    this.isButtonEnable = false;
    else
    this.isButtonEnable = true;
  }

  formatCreditCardNumber(): void {
    const control = this.cardDetails.get('cardNumber');
    let value = control.value.replace(/\s+/g, ''); // Remove existing spaces
    value = value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    const formattedValue = this.formatCreditCardNumberWithSpaces(value);
    control.setValue(formattedValue, { emitEvent: false });
  }

  private formatCreditCardNumberWithSpaces(value: string): string {
    const groups = value.match(/[\s\S]{1,4}/g) || [];
    return groups.join(' ');
  }

}
