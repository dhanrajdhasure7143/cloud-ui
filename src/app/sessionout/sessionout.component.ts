import { Component, OnInit } from '@angular/core';
import { AppService } from '../_services';

@Component({
  selector: 'app-sessionout',
  templateUrl: './sessionout.component.html',
  styleUrls: ['./sessionout.component.scss']
})
export class SessionoutComponent implements OnInit {

  constructor(private appser: AppService) {
    localStorage.clear();
    sessionStorage.clear();
    this.appser.logout();
   }

  ngOnInit() {
  }

}
