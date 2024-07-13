import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from "sweetalert2";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ai-agents-attributes',
  templateUrl: './ai-agents-attributes.component.html',
  styleUrls: ['./ai-agents-attributes.component.scss'],
  providers: [MessageService]
})
export class AiAgentsAttributesComponent implements OnInit {
 
  constructor(
    private firstloginservice: FirstloginService,
    private restapi: UsermanagementService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private api : UsermanagementService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  
  }

  
}
