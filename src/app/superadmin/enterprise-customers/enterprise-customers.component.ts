import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from 'sweetalert2';
import { Table } from "primeng/table";

@Component({
  selector: 'app-enterprise-customers',
  templateUrl: './enterprise-customers.component.html',
  styleUrls: ['./enterprise-customers.component.scss']
})
export class EnterpriseCustomersComponent implements OnInit {
  enterPriseList:any=[];
  isOverlay:boolean = false;
  // selectedAction: 'offboard' | 'extendTenure' | null = null;
  selectedAction = 'extendTenure';
  tenantId: string = '';
  newTabData: any[];
  isOffboarding = false;
  offboardingReason = '';
  tenureExtensionDate: string = '';
  isExtendTenure=false;
  statusValue:boolean =true;
  showToast: boolean = false;
  search_fields:any[]=["tenantId","tenantName","tenantDomain","enterpriseUserExpiryAt","status"];
  searchValue:any;

  newColumnList = [
    { ColumnName: 'tenantId', DisplayName: 'Tenant ID', sort: true, ShowFilter: true,filterType:'text',showTooltip:false },
    { ColumnName: 'tenantName', DisplayName: 'Tenanat Name', sort: true, ShowFilter: true,filterType:'text',showTooltip:false },
    { ColumnName: 'tenantDomain', DisplayName: 'Tenant Domain', sort: true, ShowFilter: true,filterType:'text',showTooltip:false },
    // { ColumnName: 'tenantType', DisplayName: 'Tenant Type', sort: true, ShowFilter: true },
    // { ColumnName: 'isOffboardTenant', DisplayName: 'Status', sort: true, ShowFilter: true },
    { ColumnName: 'enterpriseUserExpiryAt', DisplayName: 'Expiry Date', sort: true, ShowFilter: false,filterType:'text',showTooltip:false },
    { ColumnName: 'status', DisplayName: 'Status', sort: true, ShowFilter: true,filterType:'dropdown',showTooltip:false,dropdownList:["Active","Inactive"] },
    { ColumnName: 'createdAt', DisplayName: 'Created At', sort: true, ShowFilter: false,filterType:'date',showTooltip:false},
    { ColumnName: 'newAction', DisplayName: 'Action', sort: false, ShowFilter: false,filterType:'text',showTooltip:false },
  ];

  constructor(
    private firstloginservice: FirstloginService,
    private restapi: UsermanagementService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private api : UsermanagementService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.loadData();
    this.toggleActionType();
  }

  loadData(): void {
    this.api.getEnterpriseList().subscribe((response: any[]) => {
      if (response) {
        console.log(response)
        this.spinner.hide();
        this.enterPriseList = response
        this.enterPriseList.map(item=>{
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const expiryDate = new Date(item.enterpriseUserExpiryAt);
            if (expiryDate < today) {
              item["status"] = 'Inactive';
            } else {
              item["status"] = 'Active';
            }
        })
      }
    });
  }

  openOffboardOverlay(actionType: any, row:any){
    console.log('The Result is Here : ',row)
    this.isOverlay = true;
    // this.selectedAction = actionType;
    this.tenantId = row.tenantId;
    const inputDate = new Date(row.enterpriseUserExpiryAt);
    inputDate.setDate(inputDate.getDate() + 1);
    this.tenureExtensionDate = inputDate.toISOString().slice(0, 10);
    this.toggleActionType();
    // console.log('The Result is Here : ',row)
  }

  toggleActionType() {
    // this.isOffboarding = this.selectedAction === 'offboard';
   
    this.selectedAction === 'extendTenure';
    this.isExtendTenure = true;
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

  
  extendTenure(){
    if (this.tenantId && this.tenureExtensionDate) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update the tenure?',
        icon: 'warning',
        showCancelButton: true,
        allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        // console.log('The Result is Here : ',this.tenureExtensionDate)
      const reqBody = {
        expiresAt: this.tenureExtensionDate
      };
      this.spinner.show();
      this.api.extendTenure(this.tenantId, reqBody).subscribe(
        (response:any) => {
          this.closeOffboardOverlay(event);
          this.loadData();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tenure updated Succesfully' });
        },
        error => {
          this.spinner.hide();
          console.error('API Expiry error IS HERE :', error);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Failed to update tenure.' });
        }
      );
    }
  });
    }
    else{
      console.error('API Error: Unable to handle the Extend Tenure Option.');
    }
    this.offboardingReason = '';
  }
  
  performAction() {
    if (this.selectedAction === 'offboard') {
      this.offboardTenant();
    } else if (this.selectedAction === 'extendTenure') {
      this.extendTenure();
    }
  }

  offboardTenant() {
    if (this.tenantId) {
      const payload = {
        "tenantId": this.tenantId,
        "status": this.statusValue,
      };
      this.spinner.show();
      this.api.offBoardTenant(this.statusValue,this.tenantId).subscribe(
        (response:any) => {
          this.loadData();
          this.closeOffboardOverlay(event);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Tenant Offboarded Successfully." });
        },
        error => {
          this.spinner.hide();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Failed to Offboard Tenant.' });
        }
      );
    }
    else{
      console.error('API Error: Unable to handle the Offboard Tenant Option.');
    }
    this.offboardingReason = '';
  }
 
  getColor(status) {
    switch (status) {
      case 'Inactive':
        return '#B91C1C';
      case 'Active':
        return '#4BD963';
    }
  }

  clearTableFilters(table: Table) {
    table.clear();
    table.filterGlobal("","");
    this.searchValue=''
}

}
