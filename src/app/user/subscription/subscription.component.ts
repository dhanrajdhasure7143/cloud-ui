import { Component, OnInit } from '@angular/core';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  botPlans : any[] = []

  constructor(private service : FirstloginService) { }

  ngOnInit(): void {
    this.service.loadPredefinedBots().subscribe((response : any) =>{
      this.botPlans = response.data
      console.log(this.botPlans,"res")
    })
  }

}
