import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WorkflowcreateService } from './../../@providers/workflowcreate.service';
import { Workflow } from '../../@models/workflow';
import { WorkflowRobot } from '../../@models/workflowRobot';
import { Project } from './../../@models/project';
import { ProjectRobot } from '../../@models/projectRobot';

const loggedData = JSON.parse(JSON.parse(localStorage.getItem('currentUser')));

const tempModel = {
  Type: 'Porject',
  username: loggedData['User'][0].UserName,
  projectType: 'API',
  WorkFlowProjectType: '',
  Name: '',
  Description: '',
  CreateBy: loggedData['User'][0].ID
};

@Component({
  selector: 'app-workflowcreate',
  templateUrl: './workflowcreate.component.html',
  styleUrls: ['./workflowcreate.component.scss']
})
export class WorkflowcreateComponent implements OnInit {
  @ViewChild('createBot') form: any;
  public showcreate = false;
  public workflowname = '';

  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  lineOfBusiness: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  itemsShowLimit = 1;
  model;
  columnDefs;
  gridData = [];

  constructor(private router: Router, private createSer: WorkflowcreateService) { }

  ngOnInit() {

    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'NAME',
      },
      {
        headerName: 'Description',
        field: 'DESCRIPTION'
      },
      {
        headerName: 'WorkFlow Project Type',
        field: 'WorkFlowProjectType'
      },
      {
        headerName: 'Create Date Time',
        field: 'CreateDatetime'
      }
    ];
    this.model = JSON.parse(JSON.stringify(tempModel));
    this.lineOfBusiness = [
      { item_id: 1, item_text: 'Health Care' },
      { item_id: 2, item_text: 'Finance' },
      { item_id: 3, item_text: 'Insurance' },
      { item_id: 4, item_text: 'Banking' },
      { item_id: 5, item_text: 'Public Sector' },
      { item_id: 6, item_text: 'e-Commerce' },
      { item_id: 7, item_text: 'IT Infrastructure' }
    ];

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: this.itemsShowLimit,
      allowSearchFilter: this.ShowFilter,
      closeDropDownOnSelection: true
    };
    this.createSer.getAllRobots().subscribe(res => {
      if (res) {
        this.gridData = JSON.parse(res);
      }
    });
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  save(form) {
    if (form.form.valid) {
      this.router.navigate([`/pages/designstudio//workflowedit`, `${btoa(JSON.stringify(this.model))}`]);
      // this.createSer.createApi(this.model).subscribe(res => {
      //   if (res && res.CreateResult && res.CreateResult !== 'wrong') {
      //     const robot = this.model.WorkFlowProjectType === 'Workflow' ? new WorkflowRobot() : new ProjectRobot();
      //     robot.CreateBy = loggedData['User'][0].ID;
      //     robot.Name = this.model.Name;
      //     robot.Parent = res.CreateResult;
      //     this.createSer.createRobot(robot).subscribe(res => {
      //       this.router.navigate([`/pages/designstudio//workflowedit`, `${btoa(JSON.stringify(this.model))}`]);
      //     }, err => {

      //     });
      //   }
      // }, err => {
      //   console.log('error ,,,,, ' + err);
      // });
    } else {
      return;
    }
  }

  onCancel() {
    this.form.submitted = false;
    this.form.reset();
    this.showcreate = false;
    this.model = JSON.parse(JSON.stringify(tempModel));
  }

  updateModel() {
    this.form.submitted = false;
    if (this.model) {
      if (this.model.WorkFlowProjectType === 'Workflow') {
        this.model = JSON.parse(JSON.stringify(Object.assign({}, this.model, new Workflow())));
      } else {
        this.model = JSON.parse(JSON.stringify(Object.assign({}, this.model, new Project())));
      }
    }
  }

  onRowClick(data) {
    console.log(data);
  }
}
