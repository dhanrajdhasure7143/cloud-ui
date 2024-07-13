import { Component, OnInit } from "@angular/core";
import { FirstloginService } from "src/app/firstlogin/@providers/firstlogin.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsermanagementService } from "src/app/_services/usermanagement.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public selectedTab = 0;
  public check_tab = 0;

  public errorMessage: any;
  public subscriptionForm: FormGroup;
  userid: any;
  constructor(
    private firstloginservice: FirstloginService,
    private restapi: UsermanagementService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.selected_tab_index = params['active'] || 0;
        this.check_tab = params['active'] || 0;
        this.selectedTab = parseInt(this.selected_tab_index);
      });

  }
  selected_tab_index:any;
  ngOnInit() {
    
  }


  onTabChanged(event) {
    this.check_tab = event.index;
    if (this.check_tab == 1) {
    }
  }
  
  onTabChange(event, tabView) {
    const tab = tabView.tabs[event.index].header;
    this.selected_tab_index = event.index;
    this.check_tab = event.index;
    // Append selected_tab_index to query params
    this.router.navigate([], {
      queryParams: { active: this.selected_tab_index },
      queryParamsHandling: 'merge'
    });
  }
}
