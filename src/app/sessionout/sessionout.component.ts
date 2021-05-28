import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sessionout',
  templateUrl: './sessionout.component.html',
  styleUrls: ['./sessionout.component.scss']
})
export class SessionoutComponent implements OnInit {

  constructor() {
    localStorage.clear();
    sessionStorage.clear();
   }

  ngOnInit() {
  }

}
