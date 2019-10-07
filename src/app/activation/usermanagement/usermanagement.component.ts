import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { OPAUser } from 'src/app/_models/OPAUser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss'],
  providers: [UsermanagementService]
})
export class UsermanagementComponent implements OnInit {

  private opaUser: Observable<any[]>;
  modalRef: BsModalRef;
  private gridApi;
  private gridColumnApi;
  public rowData: any[] = [];
  public model = new OPAUser();
  public columnDefs;
  public rowSelection;
  public isRowSelectable;
  public defaultColDef;
  private dataArray: any[] = [];
  public recordsSize = 15;

  public rolesList: any = [];
  selectedRowUserId: void;
  modifyModel: any = {};
  // tslint:disable-next-line:ban-types
  isRoleStatus: String;
  isAvailable: boolean;
  // constructor() { }

  ngOnInit() {

    this.userService.fetchallroles().subscribe(data => { this.rolesList = data || []; this.rolesList.sort(); });
  }

  constructor(private http: HttpClient, private userService: UsermanagementService, public modal: BsModalService) {
    // this.setUserRoleConfig();
    this.columnDefs = [
      // {
      //   headerName: 'Tenant',
      //   field: 'tenantId',
      //   headerCheckboxSelection: true,
      //   checkboxSelection: true,
      //   width: 50,
      // },
      {
        headerName: 'User',
        field: 'userId',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
      },
      {
        headerName: 'Role',
        field: 'roleName',
        width: 50,
      }
    ];
    this.rowSelection = 'multiple';
    // this.defaultColDef = { width: 200 };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.fetchallusers();
    this.gridApi.setDomLayout('autoHeight');
    params.api.sizeColumnsToFit();
  }

  showRecords(size) {
    this.gridApi.paginationSetPageSize(Number(size));
    this.gridApi.setDomLayout('autoHeight');
    this.gridApi.sizeColumnsToFit();
  }

  onRowSelected(event) { }

  fetchallusers() {
    const id = '11e1bc8a-5c40-4e90-b3c9-8850f33977c6';
    this.userService.fetchallusers(id).subscribe(opaUser => this.rowData = opaUser || []);
  }

  onSelectionChanged(event) {
    this.dataArray = [];
    event.api.getSelectedNodes().forEach(element => {
      this.dataArray.push(element.data);
      this.selectedRowUserId = this.dataArray[0].userId;
    });
  }

  setGridLayout(size) {
    this.gridApi.paginationSetPageSize(Number(size));
  }

  onclickAdd(template: TemplateRef<any>) {
    if (this.dataArray.length > 0) {
      this.modalRef = this.modal.show(template);
      this.modifyModel.userId = this.selectedRowUserId;
    } else {
      Swal.fire({
        type: 'info',
        text: 'Please select a record'
      });
    }
  }

  onclickUpdate() {
    this.modifyModel.tenantId = this.dataArray[0].tenantId;
    console.log(this.modifyModel);
    this.userService.updateRole(this.modifyModel).subscribe(data => this.checkSuccessCallback(data));
  }
  checkSuccessCallback(data) {
    console.log(data.message);
    this.isRoleStatus = data.message;
    if (this.isRoleStatus === 'Successfully updated user in OPA') {
      Swal.fire({
        type: 'success',
        text: 'Successfully Updated'
      });
      this.isAvailable = true;
      this.modalRef.hide();
      this.reset();
    } else {
      Swal.fire({
        type: 'error',
        text: 'Failed to Updated'
      });
      this.isAvailable = false;
      this.reset();
    }
  }

  reset() {
    // tslint:disable-next-line:no-unused-expression
    this.modifyModel;
    this.fetchallusers();
  }

}
