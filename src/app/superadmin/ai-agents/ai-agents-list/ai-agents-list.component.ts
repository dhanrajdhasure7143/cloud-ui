import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AiAgentService } from 'src/app/user/_services/ai-agent.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-ai-agents-list',
  templateUrl: './ai-agents-list.component.html',
  styleUrls: ['./ai-agents-list.component.scss']
})
export class AiAgentsListComponent implements OnInit {
  agentsList=[];
  addAgentsOverLay:boolean=false;
  agentForm: FormGroup;

  columnList=[
    {DisplayName:"Id",ColumnName:"predefinedBotId",ShowFilter: true,sort:true,filterType:'text',showTooltip:true},
    {DisplayName:"AI Agent",ColumnName:"predefinedBotName",ShowFilter: true,sort:true,filterType:'text',showTooltip:true},
    {DisplayName:"Agent Stripe ID",ColumnName:"productId",ShowFilter: true,sort:true,filterType:'text',showTooltip:true},
    {DisplayName:"Agent UUID",ColumnName:"predefinedUUID",ShowFilter: true,sort:true,filterType:'text',showTooltip:false},
    {DisplayName:"Form Type",ColumnName:"formType",ShowFilter: true,sort:true,filterType:'text',showTooltip:false},
    {DisplayName:"Is Schedule",ColumnName:"schedulerRequired",ShowFilter: true,sort:true,filterType:'text',showTooltip:false},
    {DisplayName:"Description",ColumnName:"description",ShowFilter: true,sort:true,filterType:'text',showTooltip:false},
    {DisplayName:"Action",ColumnName:"action",ShowFilter: false,sort:false,showTooltip:true},
  ]
  search_fields=['predefinedBotName','productId','predefinedUUID','formType'];
  apiType:string="create";
  inputTypes1 =[
    {field:"Common",value:"common"},
    {field:"Specific",value:"specific"},
  ]
  uploadOverlay:boolean=false;
  uploadFile:any;
  _onSelectedFile:any;
  selectedAgent:any;

  constructor(
    private rest_api: AiAgentService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.agentForm = this.formBuilder.group({
      id: [""],
      agentName: ["", [Validators.required, Validators.required]],
      agentStripeId: ["", [Validators.required, Validators.required]],
      agentUUID: ["", [Validators.required, Validators.required]],
      formType: ["", [Validators.required, Validators.required]],
      isSchedule: [false],
      outputRequired: [false],
      description:["", [Validators.required, Validators.required]],
      subscribed:[false],

    });
  }

  ngOnInit(): void {
    this.getListOfAgents();
  }

  getListOfAgents(){
    this.spinner.show();
    this.rest_api.getAllPredefinedBotsList().subscribe((res:any)=>{
      this.agentsList = res.data
      this.spinner.hide();
    } , (error)=>{
      console.log(error);
    });
    
  }
  addAgentsForm(){
    this.agentForm.reset();
    this.addAgentsOverLay = true;
  }
  addAgent(type:any){
    let body = {
      predefinedBotName:this.agentForm.value.agentName,
      predefinedUUID:this.agentForm.value.agentUUID,
      productId:this.agentForm.value.agentStripeId,
      formType:this.agentForm.value.formType,
      schedulerRequired:this.agentForm.value.isSchedule,
      outputRequired:this.agentForm.value.outputRequired,
      subscribed:false,
      predefinedBotId: this.apiType === "update" ? this.agentForm.value.id : 0, 
      description: this.agentForm.value.description
    }
    this.rest_api.savePredefinedBots(body).subscribe((res:any)=>{
      if(res.code === 200){
        this.messageService.add({severity:'success', summary:'Success', detail:'Successfully '+this.apiType});
        this.addAgentsOverLay = false;
        this.apiType = type ;
        this.getListOfAgents();
      }else{
        this.messageService.add({severity:'error', summary:'Error', detail:'Unable to '+this.apiType});
        this.apiType = type ;
      }
    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Unable to '+this.apiType});
      this.apiType = type ;
    })
  }

  closeOverlay(event){
    this.addAgentsOverLay = false
  }

  resetForm(){
    this.agentForm.reset();
  }
  
  openOverlay(type:any,agentFormData){
    this.apiType = type;
    this.addAgentsOverLay = true
    this.agentForm.patchValue({
      id: agentFormData.predefinedBotId,
      agentName: agentFormData.predefinedBotName,
      agentUUID: agentFormData.predefinedUUID,
      agentStripeId: agentFormData.productId,
      formType: agentFormData.formType,
      isSchedule: agentFormData.schedulerRequired,
      outputRequired: agentFormData.outputRequired,
      subscribed: agentFormData.subscribed,
      description:agentFormData.description
        });
  }

  deleteAiAgentProdect(agentFormData:any){
    this.confirmationService.confirm({
      message: "Are you sure you want to delete this Agent?",
      header: "Delete Confirmation",
      acceptLabel: "Let's Do It!",
      rejectLabel: "Not Now",
      rejectButtonStyleClass: 'btn reset-btn',
      acceptButtonStyleClass: 'btn bluebg-button',
      defaultFocus: 'none',
      rejectIcon: 'null',
      acceptIcon: 'null',
      accept: () => {
        this.rest_api.deletePredefinedBots(agentFormData.predefinedBotId).subscribe((res:any)=>{
          if(res.code === 200){
            this.messageService.add({severity:'success', summary:'Success', detail:'Successfully Deleted'});
            this.getListOfAgents();
          }else{
            this.messageService.add({severity:'error', summary:'Error', detail:'Unable to  Deleted'});
          }
        },(error)=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Unable to  Deleted'});
        })
      }
    });
  }

  uploadAttributes(row){
    this.uploadOverlay = true;
    this.selectedAgent = row;
    console.log("uploadAttributes",row)
  }

  onConfirmUpload(){
    this.spinner.show();
    const formData = new FormData();
    // for (const file of this.selectedFiles) {
    //   formData.append('files[]', file);
    // }
    let filePath ="predefined/instructions";
    formData.append('file', this._onSelectedFile);
    formData.append('filePath',filePath);
    this.rest_api.uploadFile(formData).subscribe(res=>{
      this.uploadOverlay = false;
      this._onSelectedFile = undefined;  
      this.uploadFile = undefined;
      this.spinner.show();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded successfully.' });
      console.log("attributesResponse",res);
    },error=>{
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save.' });
    });
  }

  onRejectUpload(){
    this.uploadOverlay = false;
    this._onSelectedFile = undefined;  
      this.uploadFile = undefined;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this._onSelectedFile = file
    console.log("file",file);
  }


}
