import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { UserService } from 'src/app/_services';
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
  constructor(private router: Router,private productlistservice:ProductlistService,public userService: UserService) { }

  ngOnInit() {
    this.productlistservice.getAllProducts().subscribe(data =>this.productslist = data);
    this.tenantId = localStorage.getItem("tenantName")
    this.email = localStorage.getItem("userName");
    console.log("apps subscribed", this.tenantId, this.email);
    this.userService.getUserApplications().subscribe(data => this.successGetApps(data));
  }
  successGetApps(data) {
    console.log("appname", data);
    if(data.appname=="Ezbot")
    {
      this.subscribedProd=true;
      console.log("subscribed?", this.subscribedProd);
    }
    data.forEach(element => {
      this.dbValue.push(element)
    });

  }
  SuccessCallback(data: any[]) {
    this.productslist=data;
    console.log("products are   ---------",this.productslist)
  }
  setProductPlan(plans){
    this.productlistservice.setSelectedProductPlan(plans);
    this.router.navigate(['/activation/payment/chooseplan']);
  }

  productTrackBy(index, item){
    return index;
  }
  
}