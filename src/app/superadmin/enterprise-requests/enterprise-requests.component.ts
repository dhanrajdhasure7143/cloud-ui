import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { Table } from "primeng/table";

@Component({
  selector: 'app-enterprise-requests',
  templateUrl: './enterprise-requests.component.html',
  styleUrls: ['./enterprise-requests.component.scss']
})
export class EnterpriseRequestsComponent implements OnInit {
  enterPriseList:any=[];
  isDisplayOverlay:boolean = false;
  userData:any={};
  columnList=[
    {DisplayName:"User mail",ColumnName:"userId",ShowFilter: true,sort:true,filterType:'text',showTooltip:true},
    {DisplayName:"Name",ColumnName:"userName",ShowFilter: true,sort:true,filterType:'text',showTooltip:false},
    {DisplayName:"Phone Number",ColumnName:"phoneNumber",ShowFilter: true,sort:true,filterType:'text',showTooltip:false},
    // {DisplayName:"Department",ColumnName:"department",ShowFilter: true,sort:true},
    {DisplayName:"Country",ColumnName:"country",ShowFilter: true,sort:true,filterType:'text',showTooltip:false},
    {DisplayName:"Created Date",ColumnName:"createdDate",ShowFilter: true,sort:true,filterType:'date',showTooltip:false},
    {DisplayName:"Action",ColumnName:"action",ShowFilter: false,sort:false,showTooltip:true},
  ]
  search_fields=['userId','userName','department','phoneNumber','country','createdDate'];
  searchValue:any;
  constructor(private rest_api : UsermanagementService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getenterPriseRequestedUsers()
  }

  getenterPriseRequestedUsers(){
    this.rest_api.getenterPriseRequestedUsers().subscribe((res:any)=>{
      console.log(res)
      if(res.code== 200){
        this.spinner.hide();
        this.enterPriseList = res.data
        this.enterPriseList.map(item=>{
          item["userName"] = item.firstName+" "+item.lastName
          item["createdDate"] = new Date(item.created_at)
          return item
        })
      }
    })
  }

  openOverlay(type,rowData){
    this.isDisplayOverlay = true;
    console.log(rowData,"rowData")
    this.userData= rowData
  }

  closeOverlay(event){
    this.isDisplayOverlay = false;
  }

  readValue(event){
    if(event == true){
      this.isDisplayOverlay = false;
      this.getenterPriseRequestedUsers();
    }
  }

  clearTableFilters(table: Table) {
    table.clear();
    table.filterGlobal("","");
    this.searchValue=''
}
  enterPriseRequestMethod() {
    this.getenterPriseRequestedUsers()
  }

}
