import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
    selector: 'radio',
    template: `
      <div *ngIf="field.value.visible" class="form-group special rdb">
      <label>{{field.definition.display_name}}</label>
        <div>
          <div class="form-check dibb " *ngFor="let opt of field.value.recommended_values">
            <input type="radio" style="margin-right: 10px;" [disabled]="field.definition.readonly" (change)="changeFunction(field.value.restCall)"
            [(ngModel)]="field.value.value" [value]="opt" required = "field.definition.required" >
            <label class="form-check-label">
             {{opt}}
            </label>
          </div>
          <i class="fa fa-info-circle infospan" data-toggle="tooltip" title="{{field.definition.documentation}}"></i>
          <label *ngIf="field.definition.invalid" style="color:red">{{field.definition.message}}</label>
        </div>
      </div> 
    `
})
export class RadioComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;
    @Output() callFunctionEvent = new EventEmitter<void>();

    changeFunction(field){
      this.callFunctionEvent.emit(field);
    }


}