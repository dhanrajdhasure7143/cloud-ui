import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'dropdown',
  //styleUrls: ['./inputStyles.css'],
  encapsulation: ViewEncapsulation.None,
  template: `
      <div class="form-group special">
      <label for="{{field.Name}}">{{field.Name}}</label>
      <ng-multiselect-dropdown [id]="field.Name" #{{field.Name}} [placeholder]="'Select'" [data]="data"
      [disabled]="disabled" [settings]="dropdownSettings" >
    </ng-multiselect-dropdown>
      </div> 
    `
})
export class DropDownComponent {
  disabled: boolean = false;
  @Input() field: any = {};
  @Input() form: FormGroup;
  @Input() multiple: boolean = false;
  @Input() searchable: boolean = false;
  @Output() callFunctionEvent = new EventEmitter<void>();
  error: any = { 'isValid': true, 'message': '' };
  dropdownSettings: any = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  data = [];
  constructor() {

  }

  // ngOnInit(){
  //   if(this.field.value && this.field.value.restCall){
  //     console.log(this.field.value.restCall);
  //   this.callFunction(this.field.value.restCall);
  //   }
  // }

  callFunction(restCall) {
    this.callFunctionEvent.emit(restCall);
  }

  changeFunction(field) {
    this.callFunctionEvent.emit(field);
  }

}