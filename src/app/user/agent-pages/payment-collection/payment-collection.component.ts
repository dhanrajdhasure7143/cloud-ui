import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StripeService } from 'ngx-stripe';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { CryptoService } from 'src/app/_services/crypto.service';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-collection',
  templateUrl: './payment-collection.component.html',
  styleUrls: ['./payment-collection.component.scss']
})
export class PaymentCollectionComponent implements OnInit {
  email:any;
  selectedAgent:any;
  agentsQuantity: number = 1;
  isYearly: boolean = true;
  selectedAgentId:any;
  totalAmount: number = 0;

    constructor(private route : ActivatedRoute,
    private crypto: CryptoService,
    private service : FirstloginService,
              private spinner : NgxSpinnerService,
              private router: Router,
              private stripeService: StripeService,
              private messageService: MessageService
) {
  this.route.queryParams.subscribe(data => {
    console.log("queryParams",data);
    if (data && data.token) {
    this.email = this.crypto.decrypt(data.token);
    } else {
    console.log("Invalid token");
    }
    if (data && data.id) this.selectedAgentId = data.id;
    if (data && data.quantity) this.agentsQuantity = data.quantity;
    if (data && data.isYearly) this.isYearly = data.isYearly === 'true';
    console.log("selectedAgent",this.selectedAgentId);
    console.log("email",this.email);
})
this.loadPredefinedBots();
}

  ngOnInit(): void {
  }

  loadPredefinedBots() {
    this.spinner.show();
    this.service.loadPredefinedBots().subscribe((response: any) => {
        this.spinner.hide();
        if (response) {
            console.log("response",response);
            response.forEach((agent) => {
                if(agent.product.id == this.selectedAgentId){
                this.selectedAgent = agent.product;
                this.selectedAgent["priceCollection"] = agent.priceCollection;
                }
            });
            console.log("selectedAgent",this.selectedAgent);
            this.getTotalAmount();
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

  incrementAgents() {
    this.agentsQuantity++;
    this.getTotalAmount();
  }

  decrementAgents() {
    if (this.agentsQuantity > 1) {
      this.agentsQuantity--;
      this.getTotalAmount();
    }
  }

  proceedToPay() {
    // console.log(`Proceeding to pay for ${this.agentsQuantity} agents on ${this.isYearly ? 'yearly' : 'monthly'} plan`);
    // Implement payment logic here
    this.spinner.show();
  
    // let selectedInterval = (this.selectedPlan === 'Monthly') ? 'month' : 'year';
    let filteredPriceIds = [];
  console.log("selectedAgent",this.selectedAgent);
      let selectedTire = !this.isYearly ? 'month' : 'year'
      this.selectedAgent.priceCollection.forEach((price) => {
        if (price.recurring.interval === selectedTire) {
          let obj = {};
          obj["id"] = price.id;
          obj["quantity"] = this.agentsQuantity;
          filteredPriceIds.push(obj);
        }
      });

  
  
    if (filteredPriceIds.length === 0) {
      // Handle the case when no price is selected for the chosen interval
      // console.error('No price selected for the chosen interval.');
      this.spinner.hide();
      return;
    }
    
    let filteredUrls = this.router.url.split('&');
    let req_body = {
      // "price": filteredPriceIds,
      "priceData": filteredPriceIds.map(price => ({
        "price": price.id,
        "quantity": price.quantity
      })),
      "customerEmail": this.email,
      "successUrl": environment.paymentSuccessURL,
      // "cancelUrl": environment.paymentFailuerURL+"?token="+this.crypto.encrypt(this.userEmail)
    //   "cancelUrl": environment.paymentFailuerURL+"?token="+this.email+"&id="+this.selectedAgentId+"&quantity="+this.agentsQuantity+"&isYearly="+this.isYearly
      "cancelUrl": environment.paymentFailuerURL+filteredUrls[0]+'&'+filteredUrls[1]+"&quantity="+this.agentsQuantity+"&isYearly="+this.isYearly
    };
    // console.log("PLAN_ID's", req_body);

    
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

  getTotalAmount(){
    let selectedTire = !this.isYearly ? 'month' : 'year'
    this.selectedAgent.priceCollection.forEach((price) => {
      if (price.recurring.interval === selectedTire) {
        console.log("price",price);
        this.totalAmount= price.unitAmount * this.agentsQuantity;
      }
    });
  }

  onplanTyreChanges(){
    this.getTotalAmount();
  }

}
