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
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

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
  password : any;
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
  enterPrise_plan:any;


  constructor(private service : FirstloginService,
              private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private profileservice : ProfileService,
              private spinner : NgxSpinnerService,
              private router: Router,
              private crypto: CryptoService,
              private stripeService: StripeService,
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
    this.service.loadPredefinedBots().subscribe((response: any) =>{
      this.spinner.hide();
      console.log(response);
      if(response){

      response.forEach(element => {
          let obj = element.product;
          let image=element.image;
          obj["priceCollection"] = element.priceCollection;
          if (element.product.metadata && element.product.metadata.product_features) {
            let data = element.product.metadata.product_features;
            obj["features"] = JSON.parse(data);
          } else {
            obj["features"] = [];
          }

          const decodedImage = this.decodeBase64Image(image);
          obj["image"] = decodedImage;
          this.botPlans.push(obj);
        });

       this.enterPrise_plan= this.botPlans.find((element) => { return element.name == "Enterprise"});       
       console.log(this.enterPrise_plan);

        this.botPlans = this.botPlans.filter((element) => element.name != "Enterprise");
        console.log(this.botPlans);
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
        filteredPriceIds.push(price.id);
      }
    });
  });

  if (filteredPriceIds.length === 0) {
    // Handle the case when no price is selected for the chosen interval
    console.error('No price selected for the chosen interval.');
    this.spinner.hide();
    return;
  }

  let req_body = {
    "price": filteredPriceIds,
    "customerEmail": this.userEmail,
    "successUrl": environment.paymentSuccessURL,
    "cancelUrl": environment.paymentFailuerURL
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

onSelectPredefinedBot(plan, index) {
  this.selectedPlans = [];
  this.botPlans[index].isSelected = !this.botPlans[index].isSelected;
  this.isDisabled = this.botPlans.every(item => !item.isSelected);
  this.botPlans.forEach(item => {
    if (item.isSelected) {
      this.selectedPlans.push(item);
    }
  })
  this.selectedPlan = this.selectedPlans.length > 0 ? this.selectedPlan || "Monthly" : "Yearly";
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
          plansData.push(price.unitAmount);
        }
      });
    });
    console.log(plansData, "plansData");
    this.totalAmount = 0;
    plansData.forEach((amount) => {
      this.totalAmount += amount;
    });
    console.log(this.totalAmount);
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

  toggleChanged() {
    if (this.selectedInterval) {
      this.planSelection('Yearly');
    } else {
      this.planSelection('Monthly');
    }
  }

  showBotInfo(event: MouseEvent): void {
    const squareElement = event.currentTarget as HTMLElement;
    const squarePosition = squareElement.getBoundingClientRect();
    const squareWidth = squareElement.offsetWidth;
    const windowWidth = window.innerWidth;

    const botInfoWidth = 450;

    this.isSpaceOnLeft = windowWidth - squarePosition.left >= squareWidth + botInfoWidth;
    this.showBotInfoFlag = true;
  }

  hideBotInfo(): void {
    this.showBotInfoFlag = false;
  }

  decodeBase64Image(base64Data: string): string {
    return 'data:image/jpeg;base64,' + base64Data;
  }

}
