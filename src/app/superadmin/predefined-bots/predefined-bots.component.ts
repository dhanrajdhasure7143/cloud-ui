import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from "sweetalert2";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-predefined-bots',
  templateUrl: './predefined-bots.component.html',
  styleUrls: ['./predefined-bots.component.scss'],
  providers: [MessageService]
})
export class PredefinedBotsComponent implements OnInit {
  searchdashboard: any;
  public errorMessage: any;
  public subscriptionForm: FormGroup;
  activeTabIndex = 0;
  public check_tab = 0;

  constructor(
    private firstloginservice: FirstloginService,
    private restapi: UsermanagementService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private api : UsermanagementService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // this.getPredefinedBotsTemplate();
    // this.getPredefinedBotsVMHost();
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  onTabChange(event,tabView){
    const tab = tabView.tabs[event.index].header;
    this.activeTabIndex = event.index;
    this.check_tab = event.index;
  }

  getPredefinedBotsTemplate(){
    this.restapi.getPredefinedBotsTemplate().subscribe((response: any[]) => {
      if (response) {
        // console.log("Templates :",response)
      }
    });
  }

  getPredefinedBotsVMHost(){
    this.restapi.getPredefinedBotsVMHost().subscribe((response: any[]) => {
      if (response) {
        // console.log("VM Hosts :",response)
      }
    });
  }

}
