import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from 'sweetalert2';
import { Table } from "primeng/table";

@Component({
  selector: 'app-predefined-bots-template',
  templateUrl: './predefined-bots-template.component.html',
  styleUrls: ['./predefined-bots-template.component.scss']
})
export class PredefinedBotsTemplateComponent implements OnInit {

  templateList: any = [];
  enterPriseList1: any = [];
  isDisplayOverlay: boolean = false;
  userData: any = {};
  columnList = [
    { DisplayName: "Bot ID", ColumnName: "botId", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Predefined Bot Name", ColumnName: "botName", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Bot Type", ColumnName: "botType", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Bot Version", ColumnName: "version", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Created By", ColumnName: "createdBy", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Created At", ColumnName: "createdAt", ShowFilter: true, sort: true, filterType: 'date', showTooltip: false },
    { DisplayName: "Updated On", ColumnName: "updatedAt", ShowFilter: true, sort: true, filterType: 'date', showTooltip: false },
  ];
  search_fields = ['botId', 'botName', 'botType', 'createdBy', 'status', 'createdDate','version'];
  searchValue: any;
  constructor(private rest_api: UsermanagementService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // this.spinner.show();
    this.getTemplateList()
    // this.spinner.hide();
  }

  getTemplateList() {
    this.spinner.show();
    this.rest_api.getPredefinedBotsTemplate().subscribe({
      next: (res: any) => {
        if (res.code == 4200) {
          this.templateList = res.data
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error fetching Template list:', err);
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
      this.getTemplateList();
    }
  }

  clearTableFilters(table: Table) {
    table.clear();
    table.filterGlobal("", "");
    this.searchValue = ''
  }
}
