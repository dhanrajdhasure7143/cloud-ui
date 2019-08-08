import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.component.html',
  styleUrls: ['./firstlogin.component.scss']
})
export class FirstloginComponent implements OnInit {
  model;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['/activation']);
  }

}
