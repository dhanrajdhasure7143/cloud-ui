import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';

@Component({
  selector: 'app-enterprise-customers',
  templateUrl: './enterprise-customers.component.html',
  styleUrls: ['./enterprise-customers.component.scss']
})
export class EnterpriseCustomersComponent implements OnInit {
  enterPriseList:any=[];
  isDisplayOverlay:boolean = false;
  userData:any={};
  columnList=[
    {DisplayName:"User mail",ColumnName:"userId",ShowFilter: true,sort:true},
    {DisplayName:"Name",ColumnName:"userName",ShowFilter: true,sort:true},
    {DisplayName:"Phone Number",ColumnName:"phoneNumber",ShowFilter: true,sort:true},
    // {DisplayName:"Department",ColumnName:"department",ShowFilter: true,sort:true},
    {DisplayName:"Country",ColumnName:"country",ShowFilter: true,sort:true},
    {DisplayName:"Created Date",ColumnName:"createdDate",ShowFilter: true,sort:true},
    {DisplayName:"Action",ColumnName:"action",ShowFilter: false,sort:false},
  ]
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

}
