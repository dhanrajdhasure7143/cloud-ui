import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'stepselection',
  templateUrl: './stepselection.component.html',
  styleUrls: ['./stepselection.component.scss']
})
export class StepselectionComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit() {
  }

  selectPlan(){
    this.router.navigate(['/activation/payment/chooseplan']);
  }

}
