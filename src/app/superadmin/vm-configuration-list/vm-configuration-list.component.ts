import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { CryptoService } from 'src/app/_services/crypto.service';


@Component({
  selector: 'app-vm-configuration-list',
  templateUrl: './vm-configuration-list.component.html',
  styleUrls: ['./vm-configuration-list.component.scss']
})
export class VmConfigurationListComponent implements OnInit {
  configuredVmList: any = [];
  isDisplayOverlay: boolean = false;
  userData: any = {};
  columnList = [
    { DisplayName: "Environment Id", ColumnName: "id", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Environment Name", ColumnName: "environmentName", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Environment Type", ColumnName: "environmentType", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Host/IP", ColumnName: "hostAddress", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Port", ColumnName: "portNumber", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Connection Type", ColumnName: "connectionType", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Agent Path", ColumnName: "agentPath", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Tenant Id", ColumnName: "tenantId", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "User Name", ColumnName: "username", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Password", ColumnName: "password", ShowFilter: false, sort: false, showTooltip: false },
    // { DisplayName: "Created By", ColumnName: "createdBy", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    // { DisplayName: "Created At", ColumnName: "createdAt", ShowFilter: true, sort: true, filterType: 'date', showTooltip: false },
    // { DisplayName: "Modified By", ColumnName: "modifiedBy", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    // { DisplayName: "Modified At", ColumnName: "modifiedAt", ShowFilter: true, sort: true, filterType: 'date', showTooltip: false },
    { DisplayName: "Status", ColumnName: "status", ShowFilter: true, sort: true, filterType: 'text', showTooltip: false },
    { DisplayName: "Action", ColumnName: "action" }
  ];
  search_fields = ['environmentName', 'hostAddress', 'username', 'password', 'status', 'createdDate','id','environmentType','portNumber','connectionType','agentPath','tenantId'];
  searchValue: any;
  stateInfo=[
    {name: 'Windows'},
    {name: 'Mac'},
    {name: 'Linux'}
  ]
  environmentOptions: SelectItem[] = [
    { label: 'Windows', value: 'Windows' },
    { label: 'Linux', value: 'Linux' },
    { label: 'Mac', value: 'Mac' }
  ];
  mode: 'Create' | 'Update' = 'Create'; 
  predBotData:any;

  vmForm: FormGroup=this.formBuilder.group({
    environmentName: ['', Validators.required],
    environmentType: ['', Validators.required],
    agentPath: ['', Validators.required],
    hostAddress: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    connectionType: ['SSH', Validators.required],
    portNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  });

  constructor(private rest_api: UsermanagementService,private crypto:CryptoService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getVmList();
  }

  getVmList() {
    this.spinner.show();
    this.rest_api.getPredefinedBotsVMHost().subscribe({
      next: (res: any) => {
        console.log("getConfigureVmList", res);
        if (res.code == 4200) {
          this.spinner.hide();
          this.configuredVmList = res.data
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error fetching VM list:', err);
        this.spinner.hide();
      }
    });
  }

  openOverlay(type, rowData) {
    this.isDisplayOverlay = true;
    console.log(rowData, "rowData")
    this.userData = rowData
  }

  closeOverlay(event) {
    this.isDisplayOverlay = false;
    this.resetForm();
    this.mode="Create"
  }

  readValue(event) {
    if (event == true) {
      this.isDisplayOverlay = false;
      this.getVmList();
    }
  }

  clearTableFilters(table: Table) {
    table.clear();
    table.filterGlobal("", "");
    this.searchValue = ''
  }

  saveVMData(): void {
    const selectedEnvironmentType = this.vmForm.get('environmentType').value;
    const requestData = {
      ...this.vmForm.value,
        password:  this.crypto.encrypt(this.vmForm.get("password").value,),// this.vmForm.get("password").value,
        environmentType: selectedEnvironmentType.value,
        activeStatus: 1,
        categoryId: 0,
        createdAt: new Date().toISOString(),
        createdBy: "admin",
        id: 0,
        modifiedAt: new Date().toISOString(),
        modifiedBy: "admin",
        status: "open",
        tenantId: null
    };

    this.spinner.show();
    this.rest_api.savePredefinedBotsVMHost(requestData).subscribe({
      next: (response) => {
        console.log('Saved VM Details:', response);
        this.resetForm();
        this.isDisplayOverlay = false;
        this.getVmList();
        this.spinner.hide();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'VM Created Succesfully' });

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create VM.' });
        this.spinner.hide();
      }
    });
  }

  resetForm() {
    this.vmForm.reset({
      connectionType: 'SSH'
    });
  }

  onCancel(){
    this.resetForm();
    this.isDisplayOverlay =false;
  }

  deletePredefinedBotsVMHost(id){
    if (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to Delete ?',
        icon: 'warning',
        showCancelButton: true,
        allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
      const reqBody = {
        "id":id
      };
      this.spinner.show();
      this.rest_api.deletePredefinedBotsVMHost(id).subscribe({
        next: (response) => {
          this.getVmList();
          this.spinner.hide();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'VM Deleted Succesfully' });

        },
        error: (error) => {
          console.error('Error:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete' });
          this.spinner.hide();
        }
      });
    }
  });
    }
    else{
      console.error('API Error');
    }
  }

  prepareUpdateForm(data: any): void {
    this.mode = 'Update';
    this.predBotData=data;
    this.vmForm.patchValue({
      environmentName: data.environmentName,
      environmentType: data.environmentType,
      agentPath: data.agentPath,
      hostAddress: data.hostAddress,
      portNumber: data.portNumber,
      username: data.username,
      password: this.crypto.decrypt(data.password),
      connectionType: data.connectionType
    });
    this.isDisplayOverlay=true;
  }

  onSubmit() {
    if (this.vmForm.valid) {

      console.log('Form data: ', this.vmForm.value);
      if (this.mode === 'Update') {
        this.updateVmData();
        this.mode="Create"
      } else {
        this.saveVMData();
      }
    } else {
      console.error('Form is invalid');
    }
  }

  updateVmData() {
    const requestData = {
      ...this.vmForm.value,
      ...{
        id: this.predBotData.id,
        status:this.predBotData.status
      }
    };

    this.spinner.show();
    this.rest_api.updatePredefinedBotsVMHost(requestData).subscribe({
      next: (response) => {
        this.isDisplayOverlay = false;
        this.getVmList();
        this.spinner.hide();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Details Updated Succesfully' });

        this.resetForm();
        
      },
      error: (error) => {
        console.error('Update error:', error);
        this.spinner.hide();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update details.' });

      }
    });
  }

  onEnvironmentChange(value: string) {
    this.vmForm.get('environmentType').setValue(value);
  }

}
