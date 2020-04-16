import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductlistService } from 'src/app/_services/productlist.service';
@Component({
  selector: 'app-chooseplan',
  templateUrl: './chooseplan.component.html',
  styleUrls: ['./chooseplan.component.scss']
})
export class ChooseplanComponent implements OnInit {
  tab: string;
  selected_plans:any[];
  selected_plansOne:any[];
  plan:any;
  plantype: any;
  public plansList:any;
  public list:any[];
  public productId:any;
  constructor(private productlistservice:ProductlistService, private router: Router,
    ) { }
 
  ngOnInit() {
  this.getAllPlanes();
  }

  getAllPlanes(){
    this.productId=localStorage.getItem("selectedproductId"),
    this.productlistservice.getProductPlanes(this.productId).subscribe(data=> {this.plansList =data
    this.plansList=this.plansList.reverse();
    console.log("planesList",this.plansList)
    this.plansList[0].amount = 0;
    this.plansList[0].term='month';
    this.plansList[1].term='month';
      this.plansList[2].term='year';

  });
  }
  
  selectedPlan(planData){
    if(planData.nickName =="EZBot Freetrial" || planData.nickName =="EZFlow Freetrial"){
      alert("Free Tier");
    }else if(planData.nickName == 'Plan C'){
     
    }
    else{
    localStorage.setItem('selectedplan',planData.nickName);
    this.router.navigate(['/activation/payment/details']);
    }
    
    // window.open('http://localhost:3000'+url+'?plan='+plans.id+'&product='+plans.productId+'&type='+this.plantype, '_self' );
    
  }

  }





  
  

