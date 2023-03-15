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
  p = 0;
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
  onSort(e) {}

  onTabChanged(event) {
    this.check_tab = event.index;
    if (this.check_tab == 1) {
    this.getSuperAdminData();
    }
  }
}
