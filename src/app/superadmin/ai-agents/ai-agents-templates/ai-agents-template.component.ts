import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from 'sweetalert2';
import { Table } from "primeng/table";
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-ai-agents-template',
  templateUrl: './ai-agents-template.component.html',
  styleUrls: ['./ai-agents-template.component.scss']
})
export class AiAgentsTemplateComponent implements OnInit {

  templateList: any = [];
  enterPriseList1: any = [];
  isDisplayOverlay: boolean = false;
  predefinedTemplateForm: FormGroup
  predefinedAttributesForm: FormGroup;
  agentAttributesFormUpdate: FormGroup;
  columnList = [
    // { DisplayName: "Bot ID", ColumnName: "botId", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Predefined Bot Name", ColumnName: "botName", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Product Id", ColumnName: "predefinedBotType", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Execution Order Id", ColumnName: "execution_order_id", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Bot Type", ColumnName: "botType", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    // { DisplayName: "Bot Version", ColumnName: "version", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    // { DisplayName: "Environment Id", ColumnName: "envId", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    // { DisplayName: "Created By", ColumnName: "createdBy", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Created At", ColumnName: "createdAt", ShowFilter: true, sort: true, filterType: 'date', showTooltip: false },
    // { DisplayName: "Updated On", ColumnName: "updatedAt", ShowFilter: true, sort: true, filterType: 'date', showTooltip: false },
  ];
  search_fields = ['botId', 'botName', 'botType', 'createdBy', 'status', 'createdDate','version'];
  searchValue: any;
  taskList:any=[];
  rpaBotData:any={}
  radioOptions=[{}];
  selectedTask_attributesList:any=[];
  isShowTasksEdit:boolean = false;
  inputTypes:any[]=[];
  selectedTask:any={};
  newAttributes_list:any[]=[];
  isShowSequenceEdit:boolean = false
  isShowstartStopCoordinateEdit:boolean = false;
  rpa_botId:any;
  isDisplay:boolean = false;
  predefinedBotsList:any[]=[];
  products: any[]=[];
  isEdit:boolean = false;
  aiagent_templats:any[]=[];
  aiagents_attributesList:any[] = []; 
  displayAttributesOverLay:boolean = false;
  selectedAttributes:any[]=[];
  isEditAttribute_form:boolean = false;
  attributeRow_data:any={};
  selectedAttributeProduct:any

  constructor(private rest_api: UsermanagementService,
    private spinner: NgxSpinnerService,
    private  fb: FormBuilder,
    private messageService : MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.products =[
      {name:"RPA",productId:1,rating:4.5, status:"Active"},
      {name:"OCR",productId:2,rating:4.5, status:"Active"},
      {name:"NLP",productId:3,rating:4.5, status:"Active"},
      {name:"Chatbot",productId:4,rating:3, status:"Active"},
      {name:"Voicebot",productId:5,rating:2, status:"Active"},
      {name:"Emailbot",productId:6,rating:4.5, status:"Active"},
      {name:"Documentbot",productId:7,rating:4.5, status:"Active"},
      {name:"Data Extraction",productId:8,rating:4.5, status:"In-Active"},
      {name:"Data Entry",productId:9,rating:4.5, status:"Active"},
    ]
    // this.spinner.show();
    this.getAllPredefinedBots();
    this.getTemplateList()
    // this.spinner.hide();

    this.predefinedTemplateForm=this.fb.group({
      // botId : ['', Validators.required],
      predefinedBotName : ['', Validators.required],
      predefinedBotType : ['', Validators.required],
      task_list : ['', Validators.required],
      task_sequence : ['', Validators.required],
      task_startStopCoordinate : ['', Validators.required],
      executionOrder : ['', Validators.required],  
      // predefinedBotId : ['', Validators.required],  
    });
    this.predefinedAttributesForm=this.fb.group({
        isAttributesRequired : [false], 
        attributeLabelName : ['', Validators.required], 
        attributePlaceholder : ['', Validators.required], 
        attributeOrder : ['', Validators.required], 
        attributeType : ['', Validators.required], 
        attribute_options : [''],
        // attribute_options: this.fb.array([]),
        attribute : [''], 
        isAttrubuteMandatory : [true], 
        isVisible : [true],
        isDuplicate : [false],
        minLength : [10],
        maxLength : [1000],
    });
    this.agentAttributesFormUpdate=this.fb.group({
      preAttributeName : ['', Validators.required], 
      preAttributeLable : ['', Validators.required], 
      placeholder : ['', Validators.required], 
      attributeOrderBy : ['', Validators.required], 
      preAttributeType : ['', Validators.required], 
      options : [''], 
      attributeRequired : [true], 
      visibility : [true],
      duplicate : [false],
      minNumber : [1],
      maxNumber : [1000],
  });
    this.inputTypes =[
      {field:"Text",value:"text"},
      {field:"Drop Down",value:"dropdown"},
      {field:"Text Area",value:"textarea"},
      {field:"File",value:"file"},
      {field:"Radio Button",value:"radio"},
      {field:"Check Box",value:"checkbox"},
    ]
  }

  get attributeOptions(): FormArray {
    return this.predefinedAttributesForm.get('attribute_options') as FormArray;
  }

  addOption(): void {
    this.attributeOptions.push(this.fb.group({
      label: '',
      value: ''
    }));
  }

  removeOption(index: number): void {
    this.attributeOptions.removeAt(index);
  }

  getTemplateList() {
    this.spinner.show();
    this.rest_api.getPredefinedBotsTemplate().subscribe({
      next: (res: any) => {
        if (res.code == 4200) {
          this.templateList = res.data
          this.templateList.map(item=>{
            item["predefinedBotType"] = this.predefinedBotsList.find(e=>e.productId==item.productId)?this.predefinedBotsList.find(e=>e.productId==item.productId).predefinedBotName:null
          })
        }
        this.getAllAttributes();
        // this.spinner.hide();
      },
      error: (err) => {
        console.error('Error fetching Template list:', err);
        this.spinner.hide();
      }
    });
  }

  openOverlay() {
    this.isDisplayOverlay = true;
    this.isDisplay = false;
  }

  closeOverlay(event) {
    this.isDisplayOverlay = false;
    this.isEdit = false;
    this.isEditAttribute_form = false;
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
    
    var regex = new RegExp("^[a-zA-Z]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
      if ((event.target.selectionStart === 0 && event.code === 'Space')){
        event.preventDefault();
      }
  }

  lettersOnly_1(event): boolean {
    
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
    this.rest_api.getRpaBotData(this.rpa_botId).subscribe(res=>{
      console.log(res)
      this.isDisplay = true;
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

  savePredefinedTemplateData(type){
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
      // "predefinedBotId": this.predefinedTemplateForm.get("predefinedBotId").value,
      "productId":this.predefinedTemplateForm.get('predefinedBotType').value.productId,
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
    if(type == "update"){
      req_body["id"] = this.rpaBotData.id;
      req_body["productId"] = this.rpaBotData.productId;
    }

    this.rest_api.savePredefinedTemplate(req_body).subscribe(res=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully.' });
      let reqObject = {"attributesList":this.newAttributes_list}
      this.rest_api.savePredefinedAttributes(this.newAttributes_list).subscribe(res=>{
        console.log(res)
        console.log("attributesResponse",res);
      })
      this.spinner.hide();
      this.isDisplayOverlay = false;
      this.isEdit=false;
      this.predefinedTemplateForm.reset();
    },err=>{
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save.' });

    })

  }

  onChangeAttributesRequired(){
    console.log(this.predefinedAttributesForm.get("isAttributesRequired").value)
    this.selectedTask_attributesList = [];
    this.selectedTask_attributesList = [];
    this.newAttributes_list=[]
    this.selectedTask={};
    // this.resetFields();
  }

  onChangeTaskList(event){
    console.log(event)
    this.selectedTask = event.value
    this.selectedTask_attributesList = event.value.attributes
  }

  onChangeAttributesList(event){
    console.log(event)
  }

  onEditTaskList(){
    this.isShowTasksEdit = !this.isShowTasksEdit;
  }

  addAttributesData(){
    console.log("selectedattribute",this.predefinedAttributesForm.get('attribute').value)
    let obj = {
      "preAttributeName":this.predefinedTemplateForm.get('predefinedBotName').value+"_"+this.selectedTask.botTId+"_"+this.selectedTask.taskName+"_"+this.predefinedAttributesForm.get('attribute').value.metaAttrValue,
      // "predefinedBotId":this.predefinedTemplateForm.get("predefinedBotId").value,
      "productId":this.predefinedTemplateForm.get('predefinedBotType').value.productId,
      "preAttributeType":this.predefinedAttributesForm.get('attributeType').value,
      "minNumber":this.predefinedAttributesForm.get('minLength').value,
      "maxNumber":this.predefinedAttributesForm.get('maxLength').value,
      "preAttributeLable":this.predefinedAttributesForm.get('attributeLabelName').value,
      "placeholder":this.predefinedAttributesForm.get('attributePlaceholder').value,
      "attributeRequired":this.predefinedAttributesForm.get('isAttrubuteMandatory').value,
      "visibility":this.predefinedAttributesForm.get('isVisible').value,
      "attributeOrderBy":this.predefinedAttributesForm.get('attributeOrder').value,
      "duplicate":this.predefinedAttributesForm.get('isDuplicate').value,
      "options":JSON.parse(this.predefinedAttributesForm.get('attribute_options').value),
      "isEditing": false
    }
    console.log(this.predefinedAttributesForm.value)
    console.log("Object",obj);
    this.predefinedAttributesForm
    this.newAttributes_list.push(obj)
    this.resetFields();
  }

  deleteAttribute(index: number) {
    // Implement delete logic here
    this.newAttributes_list.splice(index, 1);
  }

  editAttribute(index: number) {
    this.newAttributes_list[index].isEditing = true;
  }

  cancelEdit(index: number) {
    this.newAttributes_list[index] = { ...this.newAttributes_list[index].originalValue, isEditing: false };
  }

  saveAttribute(index: number) {
    this.newAttributes_list[index].isEditing = false;
  }


  resetFields(){
    this.predefinedAttributesForm.get('attributeType').reset()
    this.predefinedAttributesForm.get('minLength').reset()
    this.predefinedAttributesForm.get('maxLength').reset()
    this.predefinedAttributesForm.get('attributeLabelName').reset()
    this.predefinedAttributesForm.get('attributeOrder').reset()
    this.predefinedAttributesForm.get('attributePlaceholder').reset()
    this.predefinedAttributesForm.get('attribute_options').reset()
  }

  getAllPredefinedBots(){
    this.rest_api.getAllPredefinedBotsList().subscribe((res:any)=>{
        this.predefinedBotsList = res.data
        this.aiagent_templats = [...this.predefinedBotsList];
    })
  }

  onCancel(){
    this.isDisplayOverlay=!this.isDisplayOverlay;
    this.isEditAttribute_form   = false;
    this.isEdit = false;
  }

  getAllAttributes(){
 
    this.rest_api.getAllPredefinedAttributes().subscribe((res:any)=>{
      this.aiagents_attributesList = res.data
      this.aiagent_templats.forEach(element => {
            element["templates_list"] = this.templateList.filter(e=>e.productId == element.productId)
            element["attributes_list"] = this.aiagents_attributesList.filter(e=>e.productId == element.productId)
      });
      this.spinner.hide()
      console.log(this.aiagent_templats)
    })
  }

  onClickEdit(row){
    this.rpaBotData = row;
    this.taskList = row.tasks;
    this.isEdit = true;
    this.predefinedTemplateForm.get("predefinedBotName").setValue(row.botName)
    this.predefinedTemplateForm.get("predefinedBotType").setValue(row.productId)
    this.predefinedTemplateForm.get("executionOrder").setValue(JSON.stringify(row.execution_order_id))
    this.predefinedTemplateForm.get("task_list").setValue(JSON.stringify(this.taskList))
    this.predefinedTemplateForm.get("task_sequence").setValue(JSON.stringify(row.sequences))
    this.predefinedTemplateForm.get("task_startStopCoordinate").setValue(JSON.stringify(row.startStopCoordinate))
    console.log("onClickEdit row",row,this.predefinedTemplateForm);

  }

  onClickViewAttributes(row){
    console.log("onClickView",row);
    this.displayAttributesOverLay = true;
    this.selectedAttributes = row.attributes_list;
  }

  onDeleteTemplate(row) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this template?',
      accept: () => {
        this.rest_api.deleteAiAgentTemplate(row.id).subscribe(res => {
          console.log(res)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successfully.' });
          this.getTemplateList();
        }, err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete.' });
        });
      }
    });
  }

  openAttributesOverlay(product){
    this.isEditAttribute_form = true;
    this.selectedAttributeProduct = product;
    this.agentAttributesFormUpdate.reset();
    this.agentAttributesFormUpdate.get("attributeRequired").setValue(true)
    this.agentAttributesFormUpdate.get("visibility").setValue(true)
    this.agentAttributesFormUpdate.get("duplicate").setValue(false)
    this.agentAttributesFormUpdate.get("attributeOrderBy").setValue(0)
  }

  onClickEditAttribute(row){
    console.log("onClickEditAttribute",row);
    this.isEditAttribute_form = true;
    this.attributeRow_data = row;
    this.agentAttributesFormUpdate.get("preAttributeName").setValue(row.preAttributeName)
    this.agentAttributesFormUpdate.get("preAttributeLable").setValue(row.preAttributeLable)
    this.agentAttributesFormUpdate.get("placeholder").setValue(row.placeholder)
    this.agentAttributesFormUpdate.get("attributeOrderBy").setValue(row.attributeOrderBy)
    this.agentAttributesFormUpdate.get("preAttributeType").setValue(row.preAttributeType)
    this.agentAttributesFormUpdate.get("options").setValue(JSON.stringify(row.options))

    this.agentAttributesFormUpdate.get("attributeRequired").setValue(row.attributeRequired)
    this.agentAttributesFormUpdate.get("visibility").setValue(row.visibility)
    this.agentAttributesFormUpdate.get("duplicate").setValue(row.duplicate)
    this.agentAttributesFormUpdate.get("minNumber").setValue(row.minNumber)
    this.agentAttributesFormUpdate.get("maxNumber").setValue(row.maxNumber)


  }

  onDeleteAttribute(row){
    console.log("onDeleteAttribute",row)
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this template?',
      accept: () => {
        this.spinner.show();
        this.rest_api.deleteAiAgentAttribute(row.id).subscribe(res => {
          console.log(res)
          this.spinner.hide();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successfully.' });
          this.getTemplateList();
        }, err => {
          this.spinner.hide();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete.' });
        });
      }
    });
  }

  updateAgentAttributeData(){

this.spinner.show();
console.log("agentAttributesFormUpdate",this.agentAttributesFormUpdate.value)
    let reqObject = this.agentAttributesFormUpdate.value;
    reqObject["options"]=(JSON.parse(this.agentAttributesFormUpdate.value.options))
    if(this.attributeRow_data.id){
    reqObject["id"] = this.attributeRow_data.id;
    reqObject["productId"] = this.attributeRow_data.productId;
    }else{
      reqObject["productId"] = this.selectedAttributeProduct.productId;
    }
    console.log("reqObject",reqObject)
    this.rest_api.savePredefinedAttributes([reqObject]).subscribe(res=>{
      console.log(res)
      this.attributeRow_data = undefined;
      // this.spinner.hide();
      this.getTemplateList();
    this.isEditAttribute_form = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully.' });
      console.log("attributesResponse",res);
    },error=>{
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save.' });
    })

  }

  onCancelAttributes(){
    this.isEditAttribute_form = false
  }

}
