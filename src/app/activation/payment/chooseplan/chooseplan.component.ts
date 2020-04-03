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
  constructor(private productlistservice:ProductlistService, private router: Router,
    ) { }
 
  ngOnInit() {
    this.productlistservice.getSelectedProductPlan().subscribe(res=> {
      this.selected_plans = res
    console.log("plansss",this.selected_plans)

    }
      );
    this.plan=this.selected_plans;
    this.selected_plansOne=[{"planName":"Free Tire","amount":0},
                          {"planName":"Plan A","amount":200,},
                          {"planName":"Plan B","amount":600,},
                          {"planName":"Plan C","amount":"Enterprise Solution",}]
  }
  
  openTarget(url,plans){
    console.log("type of plan",plans)
    this.productlistservice.setSelectedProductPlan(plans)
    // let isValid = false;
    if(plans.planName=="Free Tire"){
      // this.plantype='freetrail';
      alert("Free Tire");

    }
    else{
      // this.plantype='plan';
    this.router.navigate(['/activation/payment/details']);
    }
    
    // window.open('http://localhost:3000'+url+'?plan='+plans.id+'&product='+plans.productId+'&type='+this.plantype, '_self' );
    

  }
fun1(evt, seltab) {
  console.log("type of plan",seltab)
  if (seltab == 'selectplan') {
    this.tab = 'tab1';
  }
  else if (seltab == 'Payment') {
    this.tab = 'tab2';
  } else {
    this.tab = 'tab3';
  }

  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(seltab).style.display = "block";
  evt.currentTarget.className += " active";
}


  }





  
  

