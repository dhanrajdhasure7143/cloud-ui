import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
  selector: 'textbox',
  template: `
      <div class="form-group special">
        <label for="{{field.Name}}">{{field.Name}}</label>
        <input type="{{inputType}}" class="form-control" [id]="field.Name" [pattern]="regexp" (keydown.space)="$event.preventDefault()" [name]="field.Name" >
      </div> 
    `
})

export class TextBoxComponent implements OnInit {
  @Input() pattern: string | RegExp;
  @Input() field: any = {};
  @Input() form: FormGroup;
  @Input() inputType: string = 'text';
  @Output() callFunctionEvent = new EventEmitter<void>();
  error: any = { 'isValid': true, 'message': '' };
  regexp = '/^[a-z]*$/i'
  // get isValid() { return this.form.controls[this.field.name].valid; }
  // get isDirty() { return this.form.controls[this.field.name].dirty; }

  constructor() {

  }

  ngOnInit() {
    if (this.field.value && this.field.value.restCall)
      this.callFunction(this.field.value.restCall);
  }

  callFunction(restCall) {
    this.callFunctionEvent.emit(restCall);
  }

  /* restrict number input*/
  onKeydown(e) {
    let restrictIteams = ["/", ",", ".", "[", "]", "(", ")", "{", "}","'","*","^","!"];
    let temp = restrictIteams.includes(e.key);
    if (temp) {
      e.preventDefault();
    }
  }
}