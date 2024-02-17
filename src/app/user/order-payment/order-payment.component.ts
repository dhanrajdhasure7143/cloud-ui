import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptoService } from 'src/app/_services/crypto.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {
  subscriptionForm: FormGroup;
  planDetails : any[] = [];
  totalAmount : number;

  constructor(private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private service: FirstloginService,
              private crypto:CryptoService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private profileService : ProfileService
              ) {}

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

    this.profileService.data$.subscribe((data : any) => {
      this.planDetails = JSON.parse(data)
      console.log(this.planDetails)
    });
  }

  calculateTotalPrice(): number {
    this.totalAmount = 0;

    for (const plan of this.planDetails) {
      if (plan.interval === 'Monthly') {
        this.totalAmount += plan.amount;
      } else if (plan.interval === 'Yearly') {
        this.totalAmount += plan.amount * 12;
      }
    }

    return this.totalAmount;
  }

}
