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
  public error='';
  public test:any;
  constructor(private productlistservice:ProductlistService, private router: Router,
    ) { }
 
  ngOnInit() {
  this.getAllPlanes();
  }
  getAllPlanes(){
    this.productId=localStorage.getItem("selectedproductId");
    if(this.productId === null){this.productId = '2.0'}
    this.productlistservice.getProductPlanes(this.productId).subscribe(data=> {this.plansList =data
      // this.plansList=null;
      
      if(this.plansList == undefined || this.plansList == null){
        this.error='Sorry for inconvenience we will get back to you shortly'
      }
      if(this.plansList.length > 1){
      this.plansList=this.plansList.reverse();
    }
        for(var i=0; i<this.plansList.length; i++){
        var features=[];
        for (let [key, value] of Object.entries(this.plansList[i].features)) {
          var obj={'name':key,'active':value}
          features.push(obj)  
        }
        this.plansList[i].features=features;
      }
      for(var a=0; a<this.plansList[0].features.length-2; a++){
          this.plansList[0].features[a].limited=true
      }
      for(var a=0; a<this.plansList[1].features.length-2; a++){
        this.plansList[1].features[a].limited=true
      }
        this.plansList[2].features[2].limited=true;
        this.plansList[2].features[3].limited=true;
    this.plansList[0].amount = 0;
    this.plansList[0].term='month';
    this.plansList[1].term='month';
    this.plansList[2].term='year';
    },error=>{
      this.error='Sorry for inconvenience we will get back to you shortly'
    });
  }
  selectedPlan(planData){
    if(planData.nickName =="Free tier"){
      alert("Free Tier");
    }else{
    localStorage.setItem('selectedplan',planData.nickName);
    this.router.navigate(['/activation/payment/details']);
    }
  }
  loopTrackBy(index, term){
    return index;
  }
  }





  
  

