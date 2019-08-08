import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.component.html',
  styleUrls: ['./firstlogin.component.scss']
})
export class FirstloginComponent implements OnInit {
  model ='';
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  departments = [];
  itemsShowLimit = 1;

  constructor(private router: Router) { }

  ngOnInit() {
    this.departments = ['India', 'Canada', 'U.S.A'];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'ID',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: this.itemsShowLimit,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }

  onSubmit() {
    this.router.navigate(['/activation']);
  }

  onCancel() {
    localStorage.clear();
    sessionStorage.clear();
    location.href = 'https://aiotal.com/';
  }

}
