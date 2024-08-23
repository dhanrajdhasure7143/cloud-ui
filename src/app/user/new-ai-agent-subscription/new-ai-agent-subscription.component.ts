import { Component, ElementRef, OnInit } from '@angular/core';
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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-ai-agent-subscription',
  templateUrl: './new-ai-agent-subscription.component.html',
  styleUrls: ['./new-ai-agent-subscription.component.scss']
})
export class NewAiAgentSubscriptionComponent implements OnInit {

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
  expandedSpecs: { [key: number]: boolean } = {};
  isPopupVisible = false;
  billingCycle = 'monthly';
  isOpenEnterprice = false;
  isOpensuccessDialog:boolean = false;

  constructor(private service : FirstloginService,
              private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private profileservice : ProfileService,
              private spinner : NgxSpinnerService,
              private router: Router,
              private crypto: CryptoService,
              private stripeService: StripeService,
              private messageService: MessageService
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
                obj['quantity']=0
                obj['showAllSpecs']=false
                obj['selectedTire']='Yearly'
                this.botPlans.push(obj);
            });
            this.enterPrise_plan= this.botPlans.find((element) => { return element.name == "Enterprise"});       

            this.botPlans = this.botPlans.filter((element) => element.name != "Enterprise");
            console.log(this.botPlans,"this.botPlans")
            // this.botPlans=[...this.botPlans, ...this.botPlans];
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
  // let selectedInterval = (this.selectedPlan === 'Monthly') ? 'month' : 'year';
  // let filteredPriceIds = [];
  // this.selectedPlans.forEach((element) => {
  //   element.priceCollection.forEach((price) => {
  //     if (price.recurring.interval === selectedInterval) {
  //       let obj={}
  //       obj["id"]=price.id
  //       obj["quantity"]=element.quantity
  //       filteredPriceIds.push(obj);
  //     }
  //   });
  // });

  let validPlans = this.selectedPlans.filter(plan => plan.quantity > 0);
  console.log("selectedPlans",validPlans)
  
  // Extract the selectedTire values
let tireTypes = validPlans.map(plan => plan.selectedTire);

// Check if both "Monthly" and "Yearly" are present
let hasMonthly = tireTypes.includes("Monthly");
let hasYearly = tireTypes.includes("Yearly");

if (hasMonthly && hasYearly) {
  this.messageService.add({severity:'error', summary:'Error', detail:'Please select either Monthly or Yearly for all selected plans.'});
  this.spinner.hide();
  return;
}

  // let selectedInterval = (this.selectedPlan === 'Monthly') ? 'month' : 'year';
  let filteredPriceIds = [];

  validPlans.forEach((element) => {
    let selectedTire =element.selectedTire=== 'Monthly' ? 'month' : 'year'
    element.priceCollection.forEach((price) => {
      if (price.recurring.interval === selectedTire) {
        let obj = {};
        obj["id"] = price.id;
        obj["quantity"] = element.quantity;
        filteredPriceIds.push(obj);
      }
    });
  });


  if (filteredPriceIds.length === 0) {
    // Handle the case when no price is selected for the chosen interval
    console.error('No price selected for the chosen interval.');
    this.spinner.hide();
    return;
  }
  localStorage.setItem('selectedPlans', JSON.stringify(validPlans));
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
    if(res.errorMessage !="User not present" || res.code==4200){
      // Swal.fire({
      //     title: 'Success!',
      //     text: `Thank you for choosing Enterprise plan, Our team will contact you soon!`,
      //     icon: 'success',
      //     showCancelButton: false,
      //     allowOutsideClick: false
      // })
      this.isOpenEnterprice = false;
      this.isOpensuccessDialog = true;
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
    // this.selectedPlan = interval;

    let plansData = [];
    this.selectedPlans.forEach((item) => {
    let selectedInterval = (item.selectedTire === 'Monthly') ? 'month' : 'year';

      item.priceCollection.forEach((price) => {
        if (price.recurring.interval === selectedInterval) {
          // plansData.push(price.unitAmount);
          plansData.push(price.unitAmount*Number(item.quantity));

        }
      });
    });

    console.log(plansData)
    // this.totalAmount = 0;
    // plansData.forEach((amount) => {
      //   this.totalAmount += amount;
      // });
      
      // console.log("scjhwdcbwhjhjebebjehvhjeverhjebc", this.totalAmount)
      this.totalAmount = plansData.reduce((sum, amount) => sum + amount, 0);
    // localStorage.setItem('selectedPlans', JSON.stringify(this.selectedPlans));
    // localStorage.setItem('selectedInterval', this.selectedPlan);
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

  incrementQuantity(plan: any, index) {
    plan.quantity++;
    const selectedPlan = this.selectedPlans.find(sp => sp.id === plan.id);
    if (!plan.isSelected) {
      this.onSelectPredefinedBot(plan,index);  
    }
    if (selectedPlan) {
      selectedPlan.quantity = plan.quantity;
    }
    console.log("selectedPlan",this.selectedPlan)
    this.planSelection(plan.selectedTire)
  }

  decrementQuantity(plan: any, index) {
      if (plan.quantity >= 1) {
          plan.quantity--;
      const selectedPlan = this.selectedPlans.find(sp => sp.id === plan.id);
      if (!plan.isSelected) {
        this.onSelectPredefinedBot(plan,index);
      }

      if (selectedPlan) {
        selectedPlan.quantity = plan.quantity;
      }
      
      this.planSelection(this.selectedPlan)
      }
  }
  
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

  retrieveStoredPlans() {
  const storedPlans = localStorage.getItem('selectedPlans');
  const storedInterval = localStorage.getItem('selectedInterval');
  
  if (storedPlans && storedInterval) {
    this.selectedPlans = JSON.parse(storedPlans);
    this.selectedPlan = storedInterval;
  }
}

  findPriceForInterval(plan: any, interval: string): any {
    return plan.priceCollection.find(price => price.recurring.interval === interval);
  }

  updateUIWithStoredPlans() {
    if (this.selectedPlans.length > 0) {
      const selectedInterval = this.selectedPlan === 'Monthly' ? 'month' : 'year';
      this.botPlans.forEach(plan => {
        const selectedPlan = this.selectedPlans.find(sp => sp.id === plan.id);
        if (selectedPlan) {
          plan.isSelected = true;
          const selectedPrice = this.findPriceForInterval(selectedPlan, selectedInterval);
          if (selectedPrice) {
            plan.quantity = selectedPrice.quantity || selectedPlan.quantity || 0;
          } else {
            plan.quantity = selectedPlan.quantity || 0;
          }
        } else {
          plan.isSelected = false;
          plan.quantity = 0;
        }
      });
      this.isDisabled = false;
      this.planSelection(this.selectedPlan);
    }
  }

  togglePlan(): void {
    if (this.selectedPlan) {
      if (this.selectedPlan==="Monthly") {
        this.planSelection('Yearly');
      }
      else{
        this.planSelection('Monthly');
      }
    }
  }

  formatFeatures(features: string[]): string {
    if (!features || features.length === 0) {
      return '';
    }
    if (features.length === 1) {
      return features[0];
    }
    const all_word = features.slice(0, -1).join(', ');
    const last_word = features[features.length - 1];
    return `${all_word} and ${last_word}`;
  }

  calculatePrice(unitAmount, quantity){
    return unitAmount*quantity;
  }

  showPopup() {
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
  }

  showEnterpriceModel(){
    this.isOpenEnterprice = true
  }

  closePopup(){
    this.isOpenEnterprice = false;
    this.isOpensuccessDialog = false;
  }

  changePlan(tire,plan) {
  // this.selectedPlan = this.selectedPlans.length > 0 ? this.selectedPlan || "Monthly" : "Yearly";
  plan.selectedTire= tire=='monthly' ? "Monthly" : "Yearly";
  // let selectedInterval = (tire === 'monthly') ? 'Monthly' : 'Yearly';
  this.planSelection(plan.selectedTire)
    this.selectedPlans.find(sp => sp.id === plan.id).selectedTire = tire=='monthly' ? "Monthly" : "Yearly";
  }

}
