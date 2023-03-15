import { Component, OnInit } from "@angular/core";
import { FirstloginService } from "src/app/firstlogin/@providers/firstlogin.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public selectedTab = 0;
  public check_tab = 0;
  searchdashboard: any;
  sortDir=1
  p = 0;
  displayedColumns: string[] = ['adminname', 'subscribedplan', 'amount', 'latestinvoiceamount','lastbillingdate','nextbillingdate','mobile',"email"];
  constructor(
    private firstloginservice: FirstloginService,
    private spinner: NgxSpinnerService,
  ) {

  }
  plans: any = [];
  ngOnInit() {
    this.spinner.show();
  }

  getSuperAdminData() {
    this.spinner.show();
    this.firstloginservice.getSuperAdminData().subscribe((res) => {
      this.plans = res;
      this.spinner.hide();
    });
  }
  
  onSortClick(event) {
    let target = event.currentTarget,
      classList = target.classList;
    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir=-1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir=1;
    }
    this.sortArr('tenantAdminName');
    this.sortArr('subscribedPlan'); 
    this.sortArr('lastInvoiceAmount');
    this.sortArr('lastBillingDate');
    this.sortArr('dueDate');
    this.sortArr('mobile');
    this.sortArr('email');
  }

  sortArr(colName:any){
    this.plans.sort((a,b)=>{
      a= a[colName].toLowerCase();
      b= b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }

  onTabChanged(event) {
    this.check_tab = event.index;
    if (this.check_tab == 1) {
    this.getSuperAdminData();
    }
  }
}
