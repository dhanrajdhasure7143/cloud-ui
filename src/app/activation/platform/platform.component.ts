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
    //this.productlistservice.getAllProducts().subscribe(data =>this.productslist = data);
    this.productslist = [
      {
          "id": "ezflow",
          "name": "ezFlow",
          "createdAt": 1565072431,
          "orderable": "true",
          "visible": "true",
          "description": "ezFlow from EPSoft",
          "meta": {
              "orderable": "true",
              "visible": "true",
              "product_id": "ezflow"
          },
          "plans": [
              {
                  "id": "ezflow_t1m",
                  "active": true,
                  "aggregationMethod": "sum",
                  "amount": 1000.0,
                  "meta": {
                      "orderable": "true",
                      "visible": "true",
                      "plan_id": "ezflow_t1m"
                  },
                  "chargeModel": "per_unit",
                  "createdAt": 1565072515,
                  "currency": "usd",
                  "productId": "ezflow",
                  "nickName": "ezFlow Monthly",
                  "productName": "ezFlow",
                  "term": "1month",
                  "tiers": null,
                  "trialPeriod": 30,
                  "mode": null,
                  "usageType": "metered"
              }
          ],
          "created": 1565072431
      },
      {
          "id": "ezbot",
          "name": "ezBot",
          "createdAt": 1564985029,
          "orderable": "true",
          "visible": "true",
          "description": "ezBot from EPSoft",
          "meta": {
              "orderable": "true",
              "visible": "true",
              "product_id": "ezbot"
          },
          "plans": [
              {
                  "id": "ezbot_t12m",
                  "active": true,
                  "aggregationMethod": null,
                  "amount": 0.0,
                  "meta": {
                      "orderable": "true",
                      "visible": "true",
                      "plan_id": "ezbot_t12m"
                  },
                  "chargeModel": "per_unit",
                  "createdAt": 1567745980,
                  "currency": "usd",
                  "productId": "ezbot",
                  "nickName": "ezBot Yearly",
                  "productName": "ezBot",
                  "term": "1year",
                  "tiers": null,
                  "trialPeriod": null,
                  "mode": null,
                  "usageType": "licensed"
              },
              {
                  "id": "ezbot_t1m",
                  "active": true,
                  "aggregationMethod": "sum",
                  "amount": 100.0,
                  "meta": {
                      "orderable": "true",
                      "visible ": "true",
                      "plan_id": "ezbot_t1m"
                  },
                  "chargeModel": "per_unit",
                  "createdAt": 1564985213,
                  "currency": "usd",
                  "productId": "ezbot",
                  "nickName": "ezBot Monthly",
                  "productName": "ezBot",
                  "term": "1month",
                  "tiers": null,
                  "trialPeriod": 30,
                  "mode": null,
                  "usageType": "metered"
              }
          ],
          "created": 1564985029
      }
  ]
  
  }

  setProductPlan(plans){
    this.productlistservice.setSelectedProductPlan(plans);
    this.router.navigate(['/activation/payment/chooseplan']);
  }
  
}