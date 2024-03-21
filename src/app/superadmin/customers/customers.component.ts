import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from "sweetalert2";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [MessageService]
})
export class CustomersComponent implements OnInit {
  isCustom: boolean;
  displayedColumns: string[] = ['adminname', 'subscribedplan', 'amount', 'latestinvoiceamount', 'lastbillingdate', 'nextbillingdate', 'mobile', "email"];
  searchdashboard: any;
  sortDir = 1
  p = 0;
  public errorMessage: any;
  public subscriptionForm: FormGroup;
  userid: any;
  plans: any = [];
  isDisplayOverlay:boolean = false;
  activeTabIndex = 0;
  isOverlay:boolean = false;

  tenureExtensionDate: string = '';
  isExtendTenure=false;
  tenantId: string = '';
  statusValue:boolean =true;
  showToast: boolean = false;
  public check_tab = 0;

  columnList=[
    {DisplayName:"Admin",ColumnName:"tenantAdminName",ShowFilter: true,sort:true},
    {DisplayName:"Subscribed Plan",ColumnName:"subscribedPlan",ShowFilter: true,sort:true},
    {DisplayName:"Latest Invoice Amount",ColumnName:"lastInvoiceAmount",ShowFilter: true,sort:true},
    {DisplayName:"Last Billing Date",ColumnName:"lastBillingDate",ShowFilter: true,sort:true},
    {DisplayName:"Next Billing Date",ColumnName:"dueDate",ShowFilter: true,sort:true},
    {DisplayName:"Mobile",ColumnName:"mobile",ShowFilter: true,sort:true},
    {DisplayName:"Email",ColumnName:"email",ShowFilter: true,sort:true},
    {DisplayName:"Action",ColumnName:"action",ShowFilter: false,sort:false},
  ]

  constructor(
    private firstloginservice: FirstloginService,
    private restapi: UsermanagementService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private api : UsermanagementService,
    private messageService: MessageService
  ) { 
    
  }

  ngOnInit(): void {
    this.getSuperAdminData();
    this.subscriptionForm = this.formBuilder.group({
      subscriptionplan: ["", Validators.compose([Validators.required])],
      interval: [""],
      customPlanName: [""],
      customamount: [""],
      artificial_intelligence: [false],
      process_intelligence: [false],
      business_process_studio:[false],
      live_support: [false],
      service_orchestration: [false]
    })
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }


  onChange(value: string) {
    if (value === "custom") {
      this.isCustom = true;
      this.subscriptionForm.get("interval").setValidators([Validators.required]);
      this.subscriptionForm.get("customamount").setValidators([Validators.compose([Validators.required,Validators.maxLength(5), Validators.pattern(/^[0-9]*$/)])]);
      this.subscriptionForm.get("customPlanName").setValidators([ Validators.compose([Validators.required,Validators.maxLength(50), Validators.pattern(/^[a-zA-Z][a-zA-Z\s]*$/)])]);
      this.subscriptionForm.updateValueAndValidity();
    } else {
      this.subscriptionForm.get("interval").clearValidators();
      this.subscriptionForm.get("interval").updateValueAndValidity();
      this.subscriptionForm.get("customamount").clearValidators();
      this.subscriptionForm.get("customamount").updateValueAndValidity();
      this.subscriptionForm.get("customPlanName").clearValidators();
      this.subscriptionForm.get("customPlanName").updateValueAndValidity();
      this.isCustom = false;
    }
  }
  
  updateCustom() {
    this.spinner.show();
    let result = this.subscriptionForm.value;
    this.restapi.customPlan(this.userid, result).subscribe((res) => {
      this.spinner.hide();
      if(res){
        Swal.fire({
          icon: 'success',
          title: "Success",
          text: "Subscription Details Updated Successfully !!",
          heightAuto: false,
        });
        this.subscriptionForm.reset();
        // this.closeOverlay();
      }
    },
      (err) => {
        this.spinner.hide();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          heightAuto: false,
        });
      }
    );
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

  openOverlay(type,rowData){
    this.isDisplayOverlay = true;
  }

  closeOverlay(event){
    this.isDisplayOverlay = false;
  }
  
  onTabChange(event,tabView){
    const tab = tabView.tabs[event.index].header;
    this.activeTabIndex = event.index;
    this.check_tab = event.index;
    if(this.activeTabIndex == 1){
      this.getSuperAdminData();
    }
  }

}
