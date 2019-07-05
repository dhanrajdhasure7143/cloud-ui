import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-create',
  templateUrl: './createbot.component.html',
  styleUrls: ['./createbot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatebotComponent implements OnInit {

  @Output() isOpen = new EventEmitter<boolean>(false);
  @Output() robot = new EventEmitter<any>();

  myForm: FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  lineOfBusiness: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};

  model = {
    Type: 'Project',
    username: '',
    projectType:'API',
    WorkFlowProjectType: 'Workflow',
    Name: '',
    Description: '',
    CreateBy: '',
  }

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.lineOfBusiness = [
      { item_id: 1, item_text: 'Health Care' },
      { item_id: 2, item_text: 'Finance' },
      { item_id: 3, item_text: 'Insurance' },
      { item_id: 4, item_text: 'Banking' },
      { item_id: 5, item_text: 'Public Sector' },
      { item_id: 6, item_text: 'e-Commerce' },
      { item_id: 7, item_text: 'IT Infrastructure' }
    ];
    this.selectedItems = [{ item_id: 4, item_text: 'Pune' }, { item_id: 6, item_text: 'Navsari' }];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.ShowFilter
    };
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

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }

  createWorkflow() {
    const loggedData = JSON.parse(JSON.parse(localStorage.getItem('currentUser')));
    const cloneModel = Object.assign({}, this.model);
    cloneModel.Type = 'Project';
    cloneModel.CreateBy = loggedData['User'][0].ID;
    cloneModel.username = loggedData['User'][0].UserName;
    this.isOpen.emit();
    this.robot.emit(cloneModel);
  }

}
