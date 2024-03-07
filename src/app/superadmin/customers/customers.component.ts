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
  newTabData: any[];
  isOverlay:boolean = false;
  isOffboarding = false;
  offboardingReason = '';
  selectedAction: 'offboard' | 'extendTenure' | null = null;
  tenureExtensionDate: String = null;
  isExtendTenure=false;
  tenantId: string = '';
  isOffboarded:boolean=false;

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

  newColumnList = [
    { ColumnName: 'tenantId', DisplayName: 'Tenant ID', sort: true, ShowFilter: true },
    { ColumnName: 'tenantName', DisplayName: 'Tenanat Name', sort: true, ShowFilter: true },
    { ColumnName: 'tenantDomain', DisplayName: 'Tenant Domain', sort: true, ShowFilter: true },
    { ColumnName: 'systemAdminUsers', DisplayName: 'System Admin Users', sort: true, ShowFilter: true },
    { ColumnName: 'isOffboardTenant', DisplayName: 'Offboard Status', sort: true, ShowFilter: true },
    { ColumnName: 'enterpriseUserCreatedAt', DisplayName: 'Created Date', sort: true, ShowFilter: true },
    { ColumnName: 'enterpriseUserExpiryAt', DisplayName: 'Expiry Date', sort: true, ShowFilter: true },
    { ColumnName: 'newAction', DisplayName: 'Action', sort: false, ShowFilter: false },
  ];

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
    this.loadNewData();
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
    this.spinner.show();

  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  openEditOverlay(plan) {
    this.userid = plan.email
    document.getElementById("subscrip-edit").classList.remove("slide-right");
    document.getElementById("subscrip-edit").classList.add("slide-left");
    
  }
  // closeOverlay(){
  //   document.getElementById("subscrip-edit").style.display = 'none';
  //   this.subscriptionForm.reset();
  //   this.subscriptionForm.get("subscriptionplan").setValue("default");
  //   this.subscriptionForm.get("interval").setValue("default");
  // }

  slideLeft() {
    document.getElementById("subscrip-edit").classList.add("slide-right");
    document.getElementById("subscrip-edit").classList.remove("slide-left");
    this.subscriptionForm.reset();
    this.subscriptionForm.get("subscriptionplan").setValue("default");
    this.subscriptionForm.get("interval").setValue("default");
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
      console.log(res,"customers")
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
    console.log(rowData,"rowData")
    // this.userData= rowData
  }

  closeOverlay(event){
    this.isDisplayOverlay = false;
  }
  
  onTabChange($event){
    this.activeTabIndex=1;
    this.loadNewData();
  }

  loadNewData(): void {
    this.api.getEnterpriseList().subscribe((response: any[]) => {
      if (response) {
        this.newTabData = response
        this.updateSystemAdminUsers();
      }
    });
  }

  // getPlanDetails() {
  //   this.api.getEnterpriseList().subscribe((response: any) => {
  //     if(response){
  //       this.newTabData=response;
  //       // response.forEach(element => {
  //       //   let obj=element.product
  //       //   obj["usersData"] = element.priceCollection
  //       //   let data = element.product.metadata.product_features
  //       //   obj["features"] = JSON.parse(data);
  //       //   this.newTabData.push(obj)
  //       // });
  //     }
  //     console.log(this.newTabData)
  //   })
  // }

  openOffboardOverlay(actionType: any, tenantId: string, isOfboarded: boolean, tenExpiryDate: String){
    this.isOverlay = true;
    this.selectedAction = actionType;
    this.tenantId = tenantId;
    this.isOffboarded=isOfboarded;
    this.tenureExtensionDate=tenExpiryDate.split('T')[0];
  }

  closeOffboardOverlay(event){
    this.isOverlay = false;
    this.isOffboarding = !this.isOffboarding;
    this.isExtendTenure=false;
    this.isOffboarding=false;
  }

  toggleOffboarding() {
    this.isOffboarding = !this.isOffboarding;
  }

  offboardTenant() {
    if (this.tenantId) {
      this.spinner.show();
      this.api.offBoardTenant(!this.isOffboarded,this.tenantId).subscribe(
        (response:any) => {
          if (this.isOffboarded) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: "Tenant Revoked Successfully." });
          }
          else{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: "Tenant Offboarded Successfully." });
          }
          this.loadNewData();
          this.spinner.hide();
        },   
        error => {
          console.error('API Error IS HERE :', error);
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Failed to Offboard Tenant.' });
          this.spinner.hide();
          if (error.errorCode && error.errorMessage) {
            console.error(`Error Code: ${error.errorCode}, Error Message: ${error.errorMessage}`);
          }
        }
      );
    }
    else{
      console.error('API Error: Unable to handle the Offboard Tenant Option.');
    }
    this.closeOffboardOverlay(event);
    this.offboardingReason = '';
  }

  toggleActionType() {
    this.isOffboarding = this.selectedAction === 'offboard';
    this.isExtendTenure = this.selectedAction === 'extendTenure';
  }

  extendTenure(){
    if (this.tenantId && this.tenureExtensionDate) {
      this.spinner.show();
      const reqBody = {
        expiresAt: this.tenureExtensionDate
      };

      this.api.extendTenure(this.tenantId, reqBody).subscribe(
        (response:any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tenure Extended Succesfully' });
          this.loadNewData();
          this.spinner.hide();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Failed to extend tenure' });
          console.error('API Expiry error IS HERE :', error);
          this.spinner.hide();
          if (error.errorCode && error.errorMessage) {
            console.error(`Error Code: ${error.errorCode}, Error Message: ${error.errorMessage}`);
          }
        }
      );
    }
    else{
      console.error('API Error: Unable to handle the Extend Tenure Option.');
    }
    this.closeOffboardOverlay(event);
    this.offboardingReason = '';
  }
  
  performAction() {
    if (this.selectedAction === 'offboard') {
      this.offboardTenant();
    } else if (this.selectedAction === 'extendTenure') {
      this.extendTenure();
    }
  }

  updateSystemAdminUsers(): void {
    this.newTabData.forEach(tenant => {
      tenant['systemAdminUsers'] = this.getSystemAdminUsers(tenant.tenantId);
    });
  }
  
  getSystemAdminUsers(tenantId: string): string {
    const selectedTenant = this.newTabData.find(tenant => tenant.tenantId === tenantId);
  
    const systemAdminUsers = selectedTenant?.usersData
      ?.filter(user => user.roleName === 'System Admin')
      ?.map(user => user.userId)
      .join(', ');

    return systemAdminUsers || '';
  }
  
  minDate(): string {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    return formattedToday;
  }
}
