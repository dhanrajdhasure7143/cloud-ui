import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductlistService } from 'src/app/_services/productlist.service';
@Component({
  selector: 'app-chooseplan',
  templateUrl: './chooseplan.component.html',
  styleUrls: ['./chooseplan.component.scss']
})
export class ChooseplanComponent implements OnInit {
  tab: string;
  selected_plans:any = {};

  constructor(private productlistservice:ProductlistService, private router: Router) { }
 
  ngOnInit() {
    this.productlistservice.getSelectedProductPlan().subscribe(res=> this.selected_plans = res);
  } 

fun1(evt, seltab) {

  if (seltab == 'selectplan') {
    this.tab = 'tab1';
  }
  else if (seltab == 'Payment') {
    this.tab = 'tab2';
  } else {
    this.tab = 'tab3';
  }

  // this.state = true;
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(seltab).style.display = "block";
  evt.currentTarget.className += " active";
}


  }





  
  

