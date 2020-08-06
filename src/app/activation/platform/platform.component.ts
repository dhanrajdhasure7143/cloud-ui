import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { UserService } from 'src/app/_services';
import { Particles } from 'src/app/_models/particlesjs';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  productslist: any[] = [];
  email: string;
  tenantId: string;
  dbValue: any = [];
  subscribedProd: boolean=false;
  selectedData:any[];
  public productId:any;
  visibletest: any=[];
  expiryDate: any;
  freetrailDetails: any;
  isFree: boolean=true;
  constructor(private router: Router,
              private productlistservice:ProductlistService,
              public userService: UserService,
              private particles :Particles
    ) { }
  public products:any[]=[];
  public selectedIndex:number;
  public selectedId:any;
  public isenable:boolean=true;
  public selectedIdValue:boolean=false;
  ngOnInit() {
    this.particles.getParticles();
    this.tenantId=localStorage.getItem('tenantName')
    
    this.productlistservice.getAllProducts(this.tenantId).subscribe(data => {this.productslist = data
      console.log("productList", this.productslist)
      this.productslist.forEach(prod => {
       // if(!prod.freetrailAvailed){}
        if(prod.id === "2.0"){
          prod.img = "assets/images/2.0.svg"
        }
        if(prod.id === "ezflow"){
          prod.img = "assets/images/ezflow.svg"
        }
        if(prod.id === "ezbot"){
          prod.img = "assets/images/Ezbot.svg"
        }
        
        
      });
      //this.productslist[1].img="assets/images/2.0.svg";
      // this.productslist[1].freetier=false;
      // this.productslist[1].expirytime=10;
      this.products=this.productslist;
      this.products.forEach(element => {
            if(element.meta.visible=='true'){
                   this.visibletest.push(element)
                }
                  });
     
      // if( this.productslist[1].freetier == true){
      //   this.productslist[1].title = 'Active Free Tier';
      // }else{
      //   this.productslist[1].title = 'Upgrade';
      // }
        });
  }

  loopTrackBy(index, term){
    return index;
  }

  selecteddata(selectedData,index){
    console.log("selectedData",selectedData)
    this.isenable=false;
    this.selectedIndex=index;
    this.selectedId=selectedData.id;
    // localStorage.setItem('selectedproductId',this.selectedId);
    this.selectedIdValue=selectedData.subscribed;
    this.productId=selectedData.id
    let freeplanData={
      "ip": "1.2.3.4",
      "meta": {"orderable":true,"visible":true,"plan_id":"freetrial_t1m"},
      "planId": "2.0freetrial_t1m"
    }
    if(!selectedData.freetrailAvailed){
      console.log("in if")
    this.productlistservice.activateFreeTire(freeplanData).subscribe(data=>{
      this.freetrailDetails=data;
      this.expiryDate=this.freetrailDetails.Expiry_date;
        console.log("free tire is",this.freetrailDetails.Expiry_date)
        })
    }
  }
  navigateProduct(selectedproduct){
    //added this for navigate to 2.0 ui
    var token=JSON.parse(localStorage.getItem('currentUser'));
    var encryptToken=btoa(token.accessToken)
    var encryptrefreshToken=btoa(token.refreshToken);
    window.location.href="http://eiapdev.epsoftinc.in/#/pages/home?accessToken="+encryptToken+'&refreshToken='+encryptrefreshToken
    // Swal.fire({
    //   title: 'Info!',
    //   text: `Coming soon...`,
    //   type: 'info',
    //   showCancelButton: false,
    //   allowOutsideClick: false
    // })
    // // if(this.selectedId == '2.0'){
    //   alert("2.0")
    // }else if(this.selectedId == 'ezbot'){
    //   alert("2.0")
    // // this.router.navigate(['/pages/designstudio/botcreate'])
    // }else if(this.selectedId == 'ezflow'){
    //   alert("EzFlow")
    // }

  }
  upgradePlan(){
    localStorage.setItem('selectedproductId',this.selectedId);   
    this.router.navigate(["/activation/payment/chooseplan"])
  }  
}