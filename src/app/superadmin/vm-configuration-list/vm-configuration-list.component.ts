import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';

@Component({
  selector: 'app-vm-configuration-list',
  templateUrl: './vm-configuration-list.component.html',
  styleUrls: ['./vm-configuration-list.component.scss']
})
export class VmConfigurationListComponent implements OnInit {
  configuredVmList: any = [];
  isDisplayOverlay: boolean = false;
  userData: any = {};
  columnList = [
    { DisplayName: "Environment Name", ColumnName: "environmentName", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Host/IP", ColumnName: "hostAddress", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "User Name", ColumnName: "username", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Password", ColumnName: "password", ShowFilter: false, sort: false, showTooltip: false },
    // { DisplayName: "Created By", ColumnName: "createdBy", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Created At", ColumnName: "createdAt", ShowFilter: true, sort: true, filterType: 'date', showTooltip: false },
    // { DisplayName: "Modified By", ColumnName: "modifiedBy", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Modified At", ColumnName: "modifiedAt", ShowFilter: true, sort: true, filterType: 'date', showTooltip: false },
    { DisplayName: "Status", ColumnName: "status", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false }
  ];
  search_fields = ['environmentName', 'hostAddress', 'username', 'password', 'status', 'createdDate'];
  searchValue: any;
  
  constructor(private rest_api: UsermanagementService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getVmList();
  }

  getVmList() {
    this.spinner.show();
    this.rest_api.getPredefinedBotsVMHost().subscribe({
      next: (res: any) => {
        console.log("getConfigureVmList", res);
        if (res.code == 4200) {
          this.spinner.hide();
          this.configuredVmList = res.data
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error fetching VM list:', err);
        this.spinner.hide();
      }
    });
  }

  openOverlay(type, rowData) {
    this.isDisplayOverlay = true;
    console.log(rowData, "rowData")
    this.userData = rowData
  }

  closeOverlay(event) {
    this.isDisplayOverlay = false;
  }

  readValue(event) {
    if (event == true) {
      this.isDisplayOverlay = false;
      this.getVmList();
    }
  }

  clearTableFilters(table: Table) {
    table.clear();
    table.filterGlobal("", "");
    this.searchValue = ''
  }
}
