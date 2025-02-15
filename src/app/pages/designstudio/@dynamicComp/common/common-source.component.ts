import { group } from '@angular/animations';

import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import swal from 'sweetalert2';
import { TextBoxComponent } from '../../input-fields/textbox';
import { CheckBoxComponent } from './../../input-fields/checkbox';
import { DropDownComponent } from './../../input-fields/dropdown';
import { ModalRestService } from '../../@providers/modal-rest.service';

@Component({
  selector: 'common-source-modal',
  templateUrl: './common-source.component.html',
  styleUrls: ['./common-source.component.css']
})
export class CommonSourceComponent implements OnInit {
  oneAtATime: boolean = true;
  mongoPostData: { "hostName": string; "port": string; "databaseName": string; "userName": string; "password": string; };
  //@Input() name;
  @Input() node;
  @Input() pipeline;
  @ViewChild("test", { static: false }) test: ElementRef;
  @ViewChild(TextBoxComponent,{static:false}) textbox: TextBoxComponent;
  @ViewChild(CheckBoxComponent,{static:false}) checkbox: CheckBoxComponent;
  @ViewChild(DropDownComponent,{static:false}) dropdown: DropDownComponent;
  errors = [];
  public tempTabIndex;
  public tabActiveId: number = 0;
  public setNextTabActive: boolean = false;
  public groups: any[];
  public isDisabled: any;

  constructor(private modalRestService: ModalRestService, private spinnerService: Ng4LoadingSpinnerService) {

  }

  ngOnInit() {
    if (this.node) {
      this.groups = this.node.actionProp || [];
    }
  }

  callFunction(restCall) {
    if (restCall && restCall.action) {
      this[restCall.action](restCall.inputParameters, restCall.outputParameters);
    }
    if (restCall && restCall.anotherRestCall) {
      restCall = restCall.anotherRestCall;
      if (restCall && restCall.action) {
        this[restCall.action](restCall.inputParameters, restCall.outputParameters);
      }
    }
  }

  onSubmit() {
  
  }


  formValidation(form) {
    
  }

  setNode(data) {
    this.node = data;
  }
}


