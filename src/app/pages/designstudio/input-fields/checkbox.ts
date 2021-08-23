import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'checkbox',
  template: `
    <div *ngIf="field.value.visible && (multiple == false)" class="form-group special">
    <div>
      <label class="form-check-label">{{field.definition.display_name}}
         <input type="checkbox" id="" value="{{field.value.value}}" (change)="changeFunction(field.value.restCall)"
         required = "field.definition.required" [disabled]="field.definition.readonly" [(ngModel)]="field.value.value"/>
         <label *ngIf="field.definition.invalid" style="color:red">{{field.definition.message}}</label>
      </label>
    </div>
  </div> 

      <div *ngIf="field.value.visible && (multiple == true)" class="form-group special">
        <div >
          <div *ngFor="let opt of field.value.recommended_values" class="form-check form-check">
          <label class="form-check-label">{{opt}}
             <input class="form-check-input" type="checkbox" [(ngModel)]="field.value.value" id="" value="" 
             required = "field.definition.required"/>
             
          </label>
          </div>
          <label *ngIf="field.definition.invalid" style="color:red">{{field.definition.message}}</label>
        </div>
      </div> 
    `
})
export class CheckBoxComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;
  @Input() multiple: boolean = false;
  @Output() callFunctionEvent = new EventEmitter<void>();
  error:any = { 'isValid': true, 'message': ''};
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  
  constructor() {
  }
  changeFunction(field){
    this.callFunctionEvent.emit(field);
  }
}