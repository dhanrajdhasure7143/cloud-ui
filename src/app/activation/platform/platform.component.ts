import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductlistService } from 'src/app/_services/productlist.service';
@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  productslist: any[] = [];

  constructor(private router: Router,private productlistservice:ProductlistService) { }

  ngOnInit() {
    this.productlistservice.getAllProducts().subscribe(data =>this.productslist = data);
  }

  setProductPlan(plans){
    this.productlistservice.setSelectedProductPlan(plans);
    this.router.navigate(['/activation/payment/chooseplan']);
  }
  
}