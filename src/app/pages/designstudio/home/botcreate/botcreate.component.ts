import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowcreateService } from '../../@providers/workflowcreate.service';
import { Workflow } from '../../@models/workflow';
import { Project } from '../../@models/project';



const tempModel = {
  Type: 'Project',
  //username: '',
  projectType: 'API',
  WorkFlowProjectType: '',
  Name: '',
  Description: '',
  CreateBy: '',
  LOBId: null
};
const AllRobotsByPrjId= {
  Type:'AllRobotsByPrjId',
  Project_Id: ''
}

@Component({
  selector: 'botcreate',
  templateUrl: './botcreate.component.html',
  styleUrls: ['./botcreate.component.scss']
})
export class BotcreateComponent implements OnInit {
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
  lobid: number;
  columnDefs;
  gridData = [];
  dropdownList = [];
  lob = [];

  constructor(private router: Router, private createSer: WorkflowcreateService) { }

  ngOnInit() {
    this.createSer.loadDropDown().subscribe(res => {
      if (res) {
        this.dropdownList = res;
      }
    }, err => {
    });
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
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'ID',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: this.itemsShowLimit,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.createSer.getAllRobots().subscribe(res => {
      if (res) {
        console.log(res);
        this.gridData = res;
      }
    });
  }

  onItemSelect(item: any) {
    this.lobid = item.ID;
  }

  onSelectAll(items: any) {
  }

  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  save(form) {
    if (form.form.valid) {
      this.model.LOBId = this.lobid;
      this.createSer.createApi(this.model).subscribe(res => {
        if (res !== false) {
          this.createSer.projectId = res;
          const tempModel = JSON.parse(JSON.stringify(this.model));
          tempModel.projectId = res;
          this.router.navigate([`/pages/designstudio//workflowedit`, `${btoa(JSON.stringify(tempModel))}`]);
        }
      }, err => {
        console.log('error ,,,,, ' + err);
      });
    } else {
      console.log('error ,,,,, ');
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
    if (data) {
      if (data.WorkFlowProjectType === 'Workflow') {
        this.model = JSON.parse(JSON.stringify(Object.assign({}, data, new Workflow())));
      } else {
        this.model = JSON.parse(JSON.stringify(Object.assign({}, data, new Project())));
      }
      this.router.navigate([`/pages/designstudio//botedit`, `${btoa(JSON.stringify(this.model))}`]);
    }
  }

}
