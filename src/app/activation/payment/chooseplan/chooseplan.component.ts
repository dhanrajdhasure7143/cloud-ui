import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { ProfileService } from 'src/app/_services/profile.service';
import Swal from 'sweetalert2';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
  tenantId: string;
  newAccessToken: any[];
  userRole: any;
  freetrailAvailed: any;
  remainingDays: any;
  isfreetrail: any;
  modalRef: BsModalRef;
  constructor(private productlistservice:ProductlistService, private router: Router,
    private profileService: ProfileService,private sharedDataService:SharedDataService,
    private modalService: BsModalService
    ) { }
 
  ngOnInit() {
  this.getAllPlanes();
this.sharedDataService.getFreetieravailed().subscribe(data=>{this.isfreetrail=data})
this.productlistservice.getFreeTierInfo(localStorage.getItem("selectedproductId")).subscribe(data=>{
   this.freetrailAvailed=data;
  if(this.freetrailAvailed.Expirerin!=null){
    this.remainingDays=this.freetrailAvailed.Expirerin;
  }
  else{
    this.remainingDays=null;
  }
})

  
}
  getAllPlanes(){
    this.productId=localStorage.getItem("selectedproductId");
    this.tenantId=localStorage.getItem('tenantName');
    if(this.productId === null)
    {this.productId = localStorage.getItem("selectedproductId")}
        this.productlistservice.getProductPlanes(this.productId,this.tenantId,localStorage.getItem('accessToken')).subscribe(data=> {this.plansList =data
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
    // if(localStorage.getItem('userRole').includes('user') && !localStorage.getItem('selectedplan').includes('Professional') && !localStorage.getItem('selectedplan').includes('Standard')){
    //   this.plansList[0].subscribed=true;
    // } else if(localStorage.getItem('userRole').includes('Admin') && localStorage.getItem('selectedplan')!=null && localStorage.getItem('selectedplan').includes('Professional')){
    //   this.plansList[2].subscribed=true;
    // } else if(localStorage.getItem('userRole').includes('Admin') && localStorage.getItem('selectedplan').includes('Standard')){
    //   this.plansList[1].subscribed=true;
    // }
    
    },error=>{
      this.error='Sorry for inconvenience we will get back to you shortly'
    });

  }
  selectedPlan(planData){
    
    localStorage.setItem('selectedplan',planData.nickName);
   
    if(planData.nickName =="Free Tier"){
      let freeplanData={
        "ip": "1.2.3.4",
        "meta": {"orderable":true,"visible":true,"plan_id":planData.id},
        "planId": planData.id
      }

      this.productlistservice.activateFreeTire(freeplanData).subscribe(data=>{
        Swal.fire({
          title: 'Success',
          text: 'Your Free Trail has been started successfully for '+localStorage.getItem("selectedproductId")+' product',
          type: 'success',
          showCancelButton: false,
          allowOutsideClick: true
        }) 
        this.productlistservice.getNewAccessToken().subscribe(resp=>{
          this.newAccessToken=resp
       
          localStorage.setItem('currentUser', JSON.stringify(this.newAccessToken));
        })
        this.profileService.getUserRole(2).subscribe(res=>{
          this.userRole=res.message;
          localStorage.setItem('userRole',this.userRole);
        })
        this.router.navigate(['/activation/platform'])
      },err=>{
        Swal.fire({
          title: 'Error!',
          text: `Please try again.`,
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })
        // this.freetrailDetails=data;
        // this.expiryDate=this.freetrailDetails.Expiry_date;
        //   console.log("free tire is",this.freetrailDetails.Expiry_date)
          })
    
      //alert("Free Tier");
    }else{
 //   localStorage.setItem('selectedplan',planData.nickName);
    this.router.navigate(['/activation/payment/details']);
    }
  }
  contactUsSwal(){
   
    const userdata={
      "userId":localStorage.getItem('userName'),
      "firstName":localStorage.getItem('firstName'),
      "lastName":localStorage.getItem('lastName'),
      "phoneNumber":localStorage.getItem('phoneNumber'),
      "organisation":localStorage.getItem('company'),
         "tenantId":localStorage.getItem('tenantName'),
         "country":localStorage.getItem('country'),
         "productName": localStorage.getItem("selectedproductId")
    }
    this.productlistservice.contactUs(userdata).subscribe(res=>{
      Swal.fire({
        title: 'Thank you!',
        text: `Soon our person from Sales will contact you.`,
        type: 'info',
        showCancelButton: false,
        allowOutsideClick: true,
      })
     },err=>{
      Swal.fire({
        title: 'Oops!',
        text: `Internal server error, Please try again.`,
        type: 'error',
        showCancelButton: false,
        allowOutsideClick: true,
      })

    });
  }

  loopTrackBy(index, term){
    return index;
  }

  termsConditionsOpen(template){
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg' }));
  }
  privacyOpen(template){
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg' }));
  }
  }





  
  

