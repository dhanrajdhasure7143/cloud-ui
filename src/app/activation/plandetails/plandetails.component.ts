import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plandetails',
  templateUrl: './plandetails.component.html',
  styleUrls: ['./plandetails.component.scss']
})
export class PlandetailsComponent implements OnInit {
  today: Date = new Date();
  date: Date;
  constructor() { }

  ngOnInit() {
  this.date = new Date();
  this.date.setDate( this.date.getDate() + 30 );
  }
}
