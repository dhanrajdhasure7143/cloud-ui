import { Component, OnInit } from "@angular/core";
import { FirstloginService } from "src/app/firstlogin/@providers/firstlogin.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsermanagementService } from "src/app/_services/usermanagement.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public selectedTab = 0;
  public check_tab = 0;
  searchdashboard: any;
  sortDir = 1
  p = 0;
  displayedColumns: string[] = ['adminname', 'subscribedplan', 'amount', 'latestinvoiceamount', 'lastbillingdate', 'nextbillingdate', 'mobile', "email"];
  public errorMessage: any;
  public subscriptionForm: FormGroup;
  userid: any;
  constructor(
    private firstloginservice: FirstloginService,
    private restapi: UsermanagementService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {

  }
  plans: any = [];
  isCustom: boolean;
  ngOnInit() {
    this.subscriptionForm = this.formBuilder.group({
      subscriptionplan: ["", Validators.compose([Validators.required])],
      interval: ["", Validators.compose([Validators.required])],
      customPlanName: ["", Validators.compose([Validators.required])],
      customamount: ["", Validators.compose([Validators.required])],
      Artificialintelligence: [false],
      Processintelligence: [false],
      Livesupport: [false],
      Serviceorchestration: [false]
    })
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
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }
    this.sortArr('tenantAdminName');
    this.sortArr('subscribedPlan');
    this.sortArr('lastInvoiceAmount');
    this.sortArr('lastBillingDate');
    this.sortArr('dueDate');
    this.sortArr('mobile');
    this.sortArr('email');
  }

  sortArr(colName: any) {
    this.plans.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }

  onTabChanged(event) {
    this.check_tab = event.index;
    if (this.check_tab == 1) {
      this.getSuperAdminData();
    }
  }
  openEditOverlay(plan) {
    this.userid = plan.email
    document.getElementById("subscrip-edit").classList.remove("slide-right");
    document.getElementById("subscrip-edit").classList.add("slide-left");
    
  }

  slideDown() {
    document.getElementById("subscrip-edit").classList.add("slide-right");
    document.getElementById("subscrip-edit").classList.remove("slide-left");
  }
  onChange(value: string) {
    if (value === "custom") {
      this.isCustom = true;
    } else {
      this.isCustom = false;
    }
  }
  
  updateCustom() {
    this.spinner.show();
    console.log(this.subscriptionForm.value);
    let result = this.subscriptionForm.value;
    this.restapi.customPlan(this.userid, result).subscribe((res) => {
      this.spinner.hide();
      Swal.fire({
        // icon: 'success',
        title: "Success",
        text: "Subscription Details Updated Successfully !!",
        heightAuto: false,
      });
    },
      (err) => {
        this.spinner.hide();
        Swal.fire({
          // icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          heightAuto: false,
        });
      }
    );
  }
}
