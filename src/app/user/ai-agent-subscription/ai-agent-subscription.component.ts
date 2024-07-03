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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-ai-agent-subscription',
  templateUrl: './ai-agent-subscription.component.html',
  styleUrls: ['./ai-agent-subscription.component.scss']
})
export class AiAgentSubscriptionComponent implements OnInit {


  subscriptionForm: FormGroup;
  botPlans : any[] = [];
  countries : any[] = [];
  selectedPlanIndex: number = -1;
  countryInfo: any[] = [];
  userEmail : any;
  predefinedPlans:any[]=[];
  selectedPlans:any=[];
  selectedAmount:number=0;
  planType="Yearly";
  selectedValue:any;
  plans : any[] = ["RPA", "Process Intelligence","Orchestration","Business Process Studio","Projects" ]
  isDisabled : boolean = true;
  isReview_order:boolean = false;
  selected_plans_list:any;
  log_data:any={}
  isRegistered : boolean = false;
  totalAmount : number = 0;
  isHovered: boolean[] = [];
  monthlyToggle: boolean = true;
  selectedPlanDescription: number;
  selectedPlan: string = 'Yearly';
  selectedInterval: boolean = true;
  displayModal: boolean[] = new Array(this.botPlans.length).fill(false);
  isSpaceOnLeft: boolean = false;
  showBotInfoFlag: boolean = false;
  enterPrise_plan:any={};
  predefinedRawBots: any[] = [];
  emailToken:any;
  showSkeleton:boolean;

  constructor(private service : FirstloginService,
              private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private profileservice : ProfileService,
              private spinner : NgxSpinnerService,
              private router: Router,
              private crypto: CryptoService,
              private stripeService: StripeService,
              )  {
                this.route.queryParams.subscribe((data)=>{
                  if(data){
                    console.log("data",data)
                  // let params:any = JSON.parse(this.crypto.decrypt(data.token));
                    const formattedToken = data.token.replace(/\s+/g, '+');
                    this.emailToken = formattedToken
                    this.userEmail = this.crypto.decrypt(formattedToken);
                console.log("this.userEmail",this.userEmail)
                // this.isRegistered = params.isRegistered;
                  }
                  // Check if returning from Stripe
                  if (data['payment'] === 'success') {
                    Swal.fire('Success', 'Your payment was successful!', 'success');
                    // Clear stored plans after successful payment
                    localStorage.removeItem('selectedPlans');
                    localStorage.removeItem('selectedInterval');
                  } else {
                    // Retrieve stored plans if they exist
                    this.retrieveStoredPlans();
                  }
                })
               }

  ngOnInit(): void {
    this.showSkeleton=true
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

    // this.getPredefinedRawBots();
    this.loadPredefinedBots();
    this.getCountries();
  }

  getCountries() {
    this.countryInfo = Country.getAllCountries();
  }

  // loadPredefinedBots(){
  //   this.service.loadPredefinedBots().subscribe((response: any) =>{
  //     this.spinner.hide();
  //     console.log(response);
  //     if(response){

  //     response.forEach(element => {
  //         let obj = element.product;
  //         let image=element.image;
  //         obj["priceCollection"] = element.priceCollection;
  //         if (element.product.metadata && element.product.metadata.product_features) {
  //           let data = element.product.metadata.product_features;
  //           obj["features"] = JSON.parse(data);
  //         } else {
  //           obj["features"] = [];
  //         }

  //         const decodedImage = this.decodeBase64Image(image);
  //         obj["image"] = decodedImage;
  //         this.botPlans.push(obj);
  //       });

  //      this.enterPrise_plan= this.botPlans.find((element) => { return element.name == "Enterprise"});       
  //      console.log(this.enterPrise_plan);

  //       this.botPlans = this.botPlans.filter((element) => element.name != "Enterprise");
  //       console.log(this.botPlans);
  //     }
  //   }, err => {
  //     this.spinner.hide();
  //     Swal.fire({
  //       title: 'Error!',
  //       text: 'Failed to load',
  //       icon: 'error',
  //       showCancelButton: false,
  //       allowOutsideClick: true
  //     }).then((result) => {
  //       if (result.value) {
  //         this.router.navigate(['/signup']);
  //       }
  //     });
  //   });
  // }  

  getPredefinedRawBots(){
    this.service.getPredifinedRawBots().subscribe((response: any) =>{
      if(response && response.data){
        this.predefinedRawBots = response.data;
      }
    },err=>{
      console.log(err,"error for the raw bots");
    });
  }

  loadPredefinedBots() {
    this.service.loadPredefinedBots().subscribe((response: any) => {
        this.spinner.hide();
        this.showSkeleton=false
        // console.log(response);
        // this.getPaymentMethods();
        if (response) {
            response.forEach(element => {
                let obj = element.product;
                let isSubscribed=false;
                let isYearlySubscribed=false;
                let isMonthlySubscribed=false;
                let image=element.image;
                obj["priceCollection"] = element.priceCollection;
                let data = element.product.metadata?.product_features ? element.product.metadata.product_features : [];
                let features = data ? JSON.parse(data) : [];

                if (features.length > 0) {
                    // Add two more features
                    features.push("New Feature 1");
                    features.push("New Feature 2");
                    obj["features"] =data?JSON.parse(data):[];
                }
                
                console.log(features,"Gravwqghvs hgvhdd ")
                  
                    

                obj.priceCollection.forEach(price => {
                    try {
                      if (Array.isArray(this.predefinedRawBots)) {
                        price.isPlanSubscribed = this.predefinedRawBots.some(bot => {
                            return bot.products.some(product => {
                                if (Array.isArray(product.price_id)) {
                                    return product.price_id.some(priceId => {
                                      if (priceId === price.id && bot.term === price.tiersMode) {
                                        isSubscribed = true;
                                        if (price.tiersMode === 'year') {
                                          isYearlySubscribed = true;
                                        } 
                                        
                                        if (price.tiersMode === 'month'){
                                          isMonthlySubscribed = true; 
                                        }
                                      }
                                        return priceId === price.id && bot.term === price.tiersMode;  
                                    });
                                } else {
                                  if (product.price_id === price.id && bot.term === price.tiersMode) {
                                    isSubscribed = true;
                                    if (price.tiersMode === 'year') {
                                      isYearlySubscribed = true;
                                    } 
                                    
                                    if (price.tiersMode === 'month'){
                                      isMonthlySubscribed = true; 
                                    }
                                  }
                                  return product.price_id === price.id && bot.term === price.tiersMode;
                                }
                            });
                        });
                    } 
                    else {
                          price.isPlanSubscribed = false;
                      }
                    } catch (error) {
                        price.isPlanSubscribed = false;
                    }
                });
                const decodedImage = this.decodeBase64Image(image);
                obj["image"] = decodedImage;
                // console.log("image",image)
                obj["isYearlySubscribed"] = isYearlySubscribed;
                obj["isMonthlySubscribed"] = isMonthlySubscribed;
                obj["doPlanDisabled"] = isSubscribed;
                obj['quantity']=1
                obj['showAllSpecs']=false
                this.botPlans.push(obj);
            });
            this.enterPrise_plan= this.botPlans.find((element) => { return element.name == "Enterprise"});       

            this.botPlans = this.botPlans.filter((element) => element.name != "Enterprise");
            this.updateUIWithStoredPlans();
        }
    }, err => {
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
    });
}

paymentPlan() {
  this.spinner.show();
  let selectedInterval = (this.selectedPlan === 'Monthly') ? 'month' : 'year';
  let filteredPriceIds = [];
  this.selectedPlans.forEach((element) => {
    element.priceCollection.forEach((price) => {
      if (price.recurring.interval === selectedInterval) {
        let obj={}
        obj["id"]=price.id
        obj["quantity"]=element.quantity
        filteredPriceIds.push(obj);
      }
    });
  });

  console.log(this.selectedPlans)

  if (filteredPriceIds.length === 0) {
    // Handle the case when no price is selected for the chosen interval
    console.error('No price selected for the chosen interval.');
    this.spinner.hide();
    return;
  }
  localStorage.setItem('selectedPlans', JSON.stringify(this.selectedPlans));
  localStorage.setItem('selectedInterval', this.selectedPlan);
  let req_body = {
    // "price": filteredPriceIds,
    "priceData": filteredPriceIds.map(price => ({
      "price": price.id,
      "quantity": price.quantity
    })),
    "customerEmail": this.userEmail,
    "successUrl": environment.paymentSuccessURL,
    // "cancelUrl": environment.paymentFailuerURL+"?token="+this.crypto.encrypt(this.userEmail)
    "cancelUrl": environment.paymentFailuerURL+"?token="+this.emailToken
  };
  console.log("PLAN_ID's", req_body);
  
  this.service.getCheckoutScreen(req_body).pipe(
      switchMap((session: any) => {
        this.spinner.hide();
        return this.stripeService.redirectToCheckout({ sessionId: session.id });
      })
    ).subscribe(
      res => {
        this.spinner.hide();
      },error => {
        this.spinner.hide();
        console.error('Error during payment:', error);
      }
    );
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
    }
      this.spinner.hide();
  },err=>{
    Swal.fire("Error","Failed to send","error")
    this.spinner.hide();
  })
}

onSelectPredefinedBot(plan:any, index) {
  plan.quantity = 1
  console.log("Selected Plan:", plan)
  this.selectedPlans = [];
  this.botPlans[index].isSelected = !this.botPlans[index].isSelected;
  this.isDisabled = this.botPlans.every(item => !item.isSelected);
  this.botPlans.forEach(item => {
    if (item.isSelected) {
      this.selectedPlans.push(item);
    }
  })
  // this.selectedPlan = this.selectedPlans.length > 0 ? this.selectedPlan || "Monthly" : "Yearly";
  this.isDisabled = this.selectedPlans.length === 0;
  this.planSelection(this.selectedPlan);
}

readValue(value){
  this.isReview_order = false;
}

// planSelection(event){
//   this.selectedPlan = event
//   let plansData = []
//   this.selectedPlans.forEach((item : any) => {
//     plansData.push(item.planDetails)
//   })
//   console.log(plansData,"plansData")
//   this.totalAmount = 0;
//   for (const planGroup of plansData) {
//     for (const plan of planGroup) {
//       if (plan.interval === this.selectedPlan) {
//         this.totalAmount += plan.amount;
//         console.log(this.totalAmount)
//       }
//     }
//   }
// }

  planSelection(interval: string) {
    this.selectedPlan = interval;
    let plansData = [];
    let selectedInterval = (interval === 'Monthly') ? 'month' : 'year';
    this.selectedPlans.forEach((item) => {
      item.priceCollection.forEach((price) => {
        if (price.recurring.interval === selectedInterval) {
          // plansData.push(price.unitAmount);
          plansData.push(price.unitAmount*Number(item.quantity));

        }
      });
    });
    // this.totalAmount = 0;
    // plansData.forEach((amount) => {
      //   this.totalAmount += amount;
      // });
      
      // console.log("scjhwdcbwhjhjebebjehvhjeverhjebc", this.totalAmount)
      this.totalAmount = plansData.reduce((sum, amount) => sum + amount, 0);
  }

  showDescription(index: number) {
    this.selectedPlanIndex = index;
    this.isHovered[index] = true;
  }
  
  hideDescription() {
    this.selectedPlanIndex = -1;
    this.isHovered = new Array(this.botPlans.length).fill(false);
  }
  
  showModalDialog(index: number) {
    this.displayModal[index] = true;
  }

  toggleChanged(period: string) {
    if (this.selectedInterval) {
      if (period=="Monthly") {
        this.planSelection('Monthly');
      }
      else{
        this.planSelection('Yearly');
      }
    }
  }

  showBotInfo(event: MouseEvent): void {
    const squareElement = event.currentTarget as HTMLElement;
    const squarePosition = squareElement.getBoundingClientRect();
    const squareWidth = squareElement.offsetWidth;
    const windowWidth = window.innerWidth;

    const botInfoWidth = 455;

    this.isSpaceOnLeft = windowWidth - squarePosition.left >= squareWidth + botInfoWidth;
    this.showBotInfoFlag = true;
  }

  hideBotInfo(): void {
    this.showBotInfoFlag = false;
  }

  decodeBase64Image(base64Data: string): string {
    return 'data:image/jpeg;base64,' + base64Data;
  }

  incrementQuantity(plan: any) {
    plan.quantity++;
    this.planSelection(this.selectedPlan)

  }

  decrementQuantity(plan: any) {

      if (plan.quantity > 1) {
          plan.quantity--;
      this.planSelection(this.selectedPlan)
      console.log("QTY", plan.quantity)

      }
  }



  // New code 
  billingCycle = 'monthly';
  
  increaseQuantity(card: any) {
    card.quantity++;
  }

  decreaseQuantity(card: any) {
    if (card.quantity > 1) {
      card.quantity--;
    }
  }

  toggleSpecs(card: any) {
    card.showAllSpecs = !card.showAllSpecs;

    console.log("cardwjfwefjw",card.showAllSpecs  )
  }
  
  setBillingPeriod(period: string) {
    this.billingCycle = period;
  }

  get isMonthly() {
    return this.selectedPlan === 'Monthly';
  }

  expandedSpecs: { [key: number]: boolean } = {};

  retrieveStoredPlans() {
  const storedPlans = localStorage.getItem('selectedPlans');
  const storedInterval = localStorage.getItem('selectedInterval');
  
  if (storedPlans && storedInterval) {
    this.selectedPlans = JSON.parse(storedPlans);
    this.selectedPlan = storedInterval;
  }
}
  updateUIWithStoredPlans() {
    if (this.selectedPlans.length > 0) {
      this.botPlans.forEach(plan => {
        const selectedPlan = this.selectedPlans.find(sp => sp.id === plan.id);
        if (selectedPlan) {
          plan.isSelected = true;
          plan.quantity = selectedPlan.quantity;
        }
      });
      this.isDisabled = false;
      this.planSelection(this.selectedPlan);
    }
  }
}

