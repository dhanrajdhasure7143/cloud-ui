import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import { Country, State, City } from 'country-state-city';
import { ProfileService } from 'src/app/_services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

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
  password : any

  constructor(private service : FirstloginService,
              private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private profileservice : ProfileService,
              private spinner : NgxSpinnerService,
              private router: Router
              ) {
                this.route.queryParams.subscribe((data)=>{
                this.userEmail = data.email;
                this.password = data.password
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
    this.getCountries();
  }

  getCountries() {
    this.countryInfo = Country.getAllCountries();
  }

  loadPredefinedBots(){
    this.service.loadPredefinedBots().subscribe((response : any) =>{
      if(response){
      this.botPlans = response.data;
      this.botPlans.forEach(item=>{
        item["isSelected"] = false;
        item["selectedTerm"] = "Monthly"
      })
      }
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
  let selected_plans_list=[]
  this.selectedPlans.forEach(element => {
    element.planDetails.forEach(item => {
      if(element.selectedTerm == item.interval){
        let obj={};
        obj["predefinedBotName"]=element.predefinedBotName;
        obj["interval"] = item.interval;
        obj["priceId"] = item.priceId;
        obj["amount"] = item.amount
        selected_plans_list.push(obj)
      }
    });
  });
  // if(this.selectedPlans.length == 0){
  //   return
  // }
  let selectedBotPlans = JSON.stringify(selected_plans_list)
  this.profileservice.updateData(selectedBotPlans)
  this.router.navigate(["/order"],{
    queryParams: { email : this.userEmail,details : selectedBotPlans, password : this.password  },
  });

}

sendEmailEnterPrisePlan(){
  this.spinner.show();
  this.service.sendEmailEntrepricePlan(this.userEmail).subscribe((res : any)=>{
    if(res.errorMessage !="User not present"){
    Swal.fire({
        title: 'Success!',
        text: `Thank you for choosing Enterprise plan, Our team will contact you soon`,
        icon: 'success',
        showCancelButton: false,
        allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/login'],{
          queryParams: { email : this.userEmail },
        });
      }
    });
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
      this.selectedPlans.push(item);
    }
  })
}


}
