import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/_services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private route: Router, private appSer: AppService) { }

  ngOnInit() {
  }

  logout(event) {
    this.appSer.logout();
    this.route.navigate(['/']);
  }
}
