import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AiAgentService } from 'src/app/user/_services/ai-agent.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

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

  constructor(
    private rest_api: AiAgentService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
  ) { 
    this.agentForm = this.formBuilder.group({
      id: [""],
      agentName: ["", [Validators.required, Validators.required]],
      agentStripeId: ["", [Validators.required, Validators.required]],
      agentUUID: ["", [Validators.required, Validators.required]],
      formType: ["", [Validators.required, Validators.required]],
      isSchedule: ["", [Validators.required, Validators.required]],
      description:[""],
      subscribed:[""],

    });
  }

  ngOnInit(): void {
    this.getListOfAgents();
  }

  getListOfAgents(){
    this.spinner.show();
    this.rest_api.getAllPredefinedBotsList().subscribe((res:any)=>{
      console.log(res);
      this.agentsList = res.data
      this.spinner.hide();
    } , (error)=>{
      console.log(error);
    });
    
  }
  addAgentsForm(){
    this.addAgentsOverLay = true;
  }
  addAgent(type:any){
    console.log('Add Agents' + type);
    console.log(this.agentForm);
    let predifindId = 0;
    if(type != "create"){
      predifindId = this.agentForm.value.id
    }
    this.agentForm
    let body = {
      predefinedBotId:predifindId,
      predefinedBotName:this.agentForm.value.agentName,
      predefinedUUID:this.agentForm.value.agentUUID,
      productId:this.agentForm.value.agentStripeId,
      formType:this.agentForm.value.formType,
      schedulerRequired:this.agentForm.value.isSchedule,
      description:"",
      subscribed:false
    }
    this.rest_api.savePredefinedBots(body).subscribe((res:any)=>{
      console.log(res);
      this.addAgentsOverLay = false;
    },(error)=>{
      console.log(error);
    })
  }

  closeOverlay(event){
    this.addAgentsOverLay = false
  }

  resetForm(){
    this.agentForm.reset();
  }
  
  openOverlay(type:any,agentFormData){
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
    console.log(agentFormData);
    this.rest_api.deletePredefinedBots(agentFormData.predefinedBotId).subscribe((res:any)=>{
      debugger
      console.log(res);
    },(error)=>{
      console.log(error);
    })

  }

}
