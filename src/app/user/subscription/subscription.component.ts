import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import { Country, State, City } from 'country-state-city';
import { ProfileService } from 'src/app/_services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptoService } from 'src/app/_services/crypto.service';
import { switchMap } from 'rxjs/operators';
import { StripeService } from 'ngx-stripe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  subscriptionForm: FormGroup;
  botPlans : any[] = [];
  countries : any[] = [];
  selectedPlanIndex: number = -1;
  showArrowRight : boolean = true;
  showArrowDown : boolean = false;
  countryInfo: any[] = [];
  userEmail : any;
  predefinedPlans:any[]=[];
  selectedPlans:any=[];
  selectedAmount:number=0;
  planType="Monthly";
  selectedValue:any;
  plans : any[] = ["RPA", "Process Intelligence","Orchestration","Business Process Studio","Projects" ]
  isDisabled : boolean = true;
  password : any;
  isReview_order:boolean = false;
  selected_plans_list:any;
  log_data:any={}
  isRegistered : boolean = false;
  totalAmount : number = 0;
  selectedPlan: string = '';

  constructor(private service : FirstloginService,
              private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private profileservice : ProfileService,
              private spinner : NgxSpinnerService,
              private router: Router,
              private crypto: CryptoService,
              private stripeService: StripeService
              ) {
                this.route.queryParams.subscribe((data)=>{
                  if(data){
                  let params:any = JSON.parse(this.crypto.decrypt(data.token));
                  console.log(params)
                  this.log_data = params
                this.userEmail = params.email;
                this.password = params.password;
                this.isRegistered = params.isRegistered;
                console.log(this.userEmail,this.password)
                  }
                })
               }

  ngOnInit(): void {
    this.spinner.show();
    this.subscriptionForm = this.formBuilder.group({
      cardNumber: [''],
      monthYear: [''],
      cvv: [''],
      lastName: [''],
      userName: [''],
      country: [''],
      autoBilling: ['']
    });

    this.loadPredefinedBots();
    this.getCountries();
  }

  getCountries() {
    this.countryInfo = Country.getAllCountries();
  }

  loadPredefinedBots(){
    this.service.loadPredefinedBots().subscribe((response : any) =>{
      this.spinner.hide()
      console.log(response)
      if(response){
        response.forEach(element => {
          let obj=element.product
          obj["priceCollection"] = element.priceCollection
          let data = element.product.metadata.product_features
          obj["features"] = JSON.parse(data);
          this.botPlans.push(obj)
        });
        console.log(this.botPlans)
      // this.botPlans = response;
      // this.botPlans.forEach(item=>{
      //   item["isSelected"] = false;
      //   item["selectedTerm"] = "Monthly"
      // })
      }
    },err=>{
      this.spinner.hide();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load',
        icon: 'error',
        showCancelButton: false,
        allowOutsideClick: true
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/signup']);
      }
    });
    })
  }

showDescription(index: number) {
  this.selectedPlanIndex = index;
  this.showArrowRight = false;
  this.showArrowDown = true;
}

hideDescription() {
  this.selectedPlanIndex = -1;
  this.showArrowRight = true;
  this.showArrowDown = false;
}

paymentPlan(){
  // this.isReview_order = true;
   
// {
//   "price":["price_1OoK1ASGPu394vele0kSwgko", "price_1OoJvwSGPu394velC9wLmrR6"],
//   "customerEmail":"praveen.bookala@gmail.com",
//   "successUrl":"https://ezflow.dev.epsoftinc.com/users",
//   "cancelUrl":"https://ezflow.dev.epsoftinc.com/users"
//   }
  this.selected_plans_list=[];
  // this.selectedPlans.forEach(element => {
  //   element.planDetails.forEach(item => {
  //     if(element.selectedTerm == item.interval){
  //       let obj={};
  //       obj["predefinedBotName"]=element.predefinedBotName;
  //       obj["interval"] = item.interval;
  //       obj["priceId"] = item.priceId;
  //       obj["amount"] = item.amount
  //       this.selected_plans_list.push(obj);
  //     }
  //   });
  // });
  
  let req_body={
      "price":["price_1OoK1ASGPu394vele0kSwgko", "price_1OoJvwSGPu394velC9wLmrR6"],
      "customerEmail":"praveen.bookala@gmail.com",
      "successUrl":environment.paymentSuccessURL,
      "cancelUrl":environment.paymentFailuerURL
      }

  // this.selectedPlans.forEach(element => {
  //     element.planDetails.forEach(item => {
  //       this.selected_plans_list.push(item.priceId)
  // })
  // })
  this.service.getCheckoutScreen(req_body).pipe(
    switchMap((session:any) => {
      console.log(session)
      return this.stripeService.redirectToCheckout({ sessionId: session.id })
    })
  )
  .subscribe(res=>{
    console.log(res)
  })
  console.log(this.selected_plans_list, this.selectedPlans)
  // if(this.selectedPlans.length == 0){
  //   return
  // }
  // let selectedBotPlans = JSON.stringify(selected_plans_list)
  // this.profileservice.updateData(selectedBotPlans)
  // this.router.navigate(["/order"],{
  //   queryParams: { email : this.userEmail,details : selectedBotPlans, password : this.password  },
  // });

}

sendEmailEnterPrisePlan(){
  this.spinner.show();
  this.service.sendEmailEntrepricePlan(this.userEmail).subscribe((res : any)=>{
    if(res.errorMessage !="User not present"){
    Swal.fire({
        title: 'Success!',
        text: `Thank you for choosing Enterprise plan, Our team will contact you soon!`,
        icon: 'success',
        showCancelButton: false,
        allowOutsideClick: false
    })
    // .then((result) => {
    //   if (result.value) {
    //     this.router.navigate(['/login'],{
    //       queryParams: { email : this.userEmail },
    //     });
    //   }
    // });
  }
      this.spinner.hide();
  },err=>{
    Swal.fire("Error","Failed to send","error")
    this.spinner.hide();
  })
}

onSelectPredefinedBot(plan, index){
  this.selectedPlans = [];
  this.botPlans[index]["isSelected"]= !this.botPlans[index]["isSelected"];
  this.isDisabled = this.botPlans.every(item => !item.isSelected);
  this.botPlans.forEach(item=>{
    if(item.isSelected){
      console.log(item)
      this.selectedPlans.push(item);
    }
  })
}

readValue(value){
  this.isReview_order = false;
}

planSelection(event){
  this.selectedPlan = event
  let plansData = []
  this.selectedPlans.forEach((item : any) => {
    plansData.push(item.planDetails)
  })
  console.log(plansData,"plansData")
  this.totalAmount = 0;
  for (const planGroup of plansData) {
    for (const plan of planGroup) {
      if (plan.interval === this.selectedPlan) {
        this.totalAmount += plan.amount;
        console.log(this.totalAmount)
      }
    }
  }

}
}
