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
    {DisplayName:"Action",ColumnName:"action",ShowFilter: false,sort:false,showTooltip:true},
  ]
  search_fields=['predefinedBotName','productId','predefinedUUID','formType'];
  apiType:string="create";

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
      description:[""],
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
      subscribed:false,
      predefinedBotId: this.apiType === "update" ? this.agentForm.value.id : 0, 
      description: this.apiType === "update" ? this.agentForm.value.description : ""
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

}
