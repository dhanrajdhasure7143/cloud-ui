import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  predefinedTemplateForm: FormGroup
  columnList = [
    { DisplayName: "Bot ID", ColumnName: "botId", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Predefined Bot Name", ColumnName: "botName", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Execution Order Id", ColumnName: "execution_order_id", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Bot Type", ColumnName: "botType", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Bot Version", ColumnName: "version", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Environment Id", ColumnName: "envId", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Created By", ColumnName: "createdBy", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Created At", ColumnName: "createdAt", ShowFilter: true, sort: true, filterType: 'date', showTooltip: false },
    { DisplayName: "Updated On", ColumnName: "updatedAt", ShowFilter: true, sort: true, filterType: 'date', showTooltip: false },
  ];
  search_fields = ['botId', 'botName', 'botType', 'createdBy', 'status', 'createdDate','version'];
  searchValue: any;
  taskList:any=[];
  rpaBotData:any={}

  constructor(private rest_api: UsermanagementService,
    private spinner: NgxSpinnerService,
    private  fb: FormBuilder,
    private messageService : MessageService) { }

  ngOnInit(): void {
    // this.spinner.show();
    this.getTemplateList()
    // this.spinner.hide();

    this.predefinedTemplateForm=this.fb.group({
      botId : ['', Validators.required],
      predefinedBotName : ['', Validators.required],
      task_list : ['', Validators.required],
      task_sequence : ['', Validators.required],
      task_startStopCoordinate : ['', Validators.required],
      executionOrder : ['', Validators.required],  
      predefinedBotId : ['', Validators.required],  
    });
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

  lettersOnly(event): boolean {
    
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
      if ((event.target.selectionStart === 0 && event.code === 'Space')){
        event.preventDefault();
      }
  }

  getBotData(){
    this.spinner.show();
    this.rest_api.getRpaBotData(this.predefinedTemplateForm.get("botId").value).subscribe(res=>{
      console.log(res)
      this.spinner.hide();
      this.rpaBotData = res
      this.taskList = this.rpaBotData.tasks
      this.predefinedTemplateForm.get("task_list").setValue(JSON.stringify(this.taskList))
      this.predefinedTemplateForm.get("task_sequence").setValue(JSON.stringify(this.rpaBotData.sequences))
      this.predefinedTemplateForm.get("task_startStopCoordinate").setValue(JSON.stringify(this.rpaBotData.startStopCoordinate))
    },err=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get data.' });
      this.spinner.hide();
      console.log("error to get data",err)
    });
  }

  savePredefinedTemplateData(){
this.spinner.show()
   let req_body = {
      "botCompleted": true,
      "botId": this.rpaBotData.botId,
      "botName": this.predefinedTemplateForm.get("predefinedBotName").value,
      "botType": this.rpaBotData.botType,
      "botmainEntitySchedulerEntity": this.rpaBotData.botMainSchedulerEntity?this.rpaBotData.botMainSchedulerEntity:null,
      "comments": this.rpaBotData.comments?this.rpaBotData.comments:null,
      "createdAt": this.rpaBotData.createdAt,
      "createdBy": this.rpaBotData.createdBy,
      "envId": 0,
      "executionMode": this.rpaBotData.executionMode,
      "execution_order_id": this.predefinedTemplateForm.get("executionOrder").value,
      "groups": JSON.stringify(this.rpaBotData.groups),
      "id": 0,
      "lastSubmittedBy": this.rpaBotData.lastSubmittedBy,
      "predefinedBotId": this.predefinedTemplateForm.get("predefinedBotId").value,
      "scheduler": this.rpaBotData.scheduler,
      "sequences": JSON.parse(this.predefinedTemplateForm.get("task_sequence").value),
      "startStopCoordinate": JSON.parse(this.predefinedTemplateForm.get("task_startStopCoordinate").value),
      "svg": this.rpaBotData.svg,
      "tasks": JSON.parse(this.predefinedTemplateForm.get("task_list").value),
      "updatedAt": this.rpaBotData.updatedAt,
      "version": this.rpaBotData.version,
      "versionNew": this.rpaBotData.versionNew,
      "versionType": this.rpaBotData.versionType?this.rpaBotData.versionType:null
    }

    this.rest_api.savePredefinedTemplate(req_body).subscribe(res=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully.' });
      console.log(res)
      this.spinner.hide();
      this.isDisplayOverlay = false;
      this.predefinedTemplateForm.reset();
    },err=>{
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save.' });

    })

  }

  
}
