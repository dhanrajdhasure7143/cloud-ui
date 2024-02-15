import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import { Country, State, City } from 'country-state-city';
import { ProfileService } from 'src/app/_services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  subscriptionForm: FormGroup;
  botPlans : any[] = []
  countries : any[] = [];
  selectedPlanIndex: number = -1;
  showArrowRight : boolean = true;
  showArrowDown : boolean = false;
  countryInfo: any[] = [];
  userEmail : any;

  constructor(private service : FirstloginService,
              private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private profileservice : ProfileService ) {
                this.route.queryParams.subscribe((data)=>{
                this.userEmail = data.email
                })
               }

  ngOnInit(): void {

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
    this.userDetails();
    this.getCountries();
  }

  getCountries() {
    this.countryInfo = Country.getAllCountries();
  }

  loadPredefinedBots(){
    this.service.loadPredefinedBots().subscribe((response : any) =>{
      console.log(response.data)
      this.botPlans = response.data
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

userDetails() {
  this.profileservice.getUserDetails(this.userEmail).subscribe((data : any) =>{
    console.log(data,"testing")
  })
}

paymentPlan(){

}

}
