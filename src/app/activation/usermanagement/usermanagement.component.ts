import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { OPAUser } from 'src/app/_models/OPAUser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { Cellrender } from 'src/app/activation/usermanagement/cellrender';

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
    public model = new OPAUser();
    public rowSelection;
    public isRowSelectable;
    public defaultColDef;
    private dataArray: any[] = [];
    public recordsSize = 15;
    public frameworkComponents;
    public rolesList: any = [];
    selectedRowUserId: void;
    modifyModel: any = {};
    isRoleStatus: String;
    isAvailable: boolean;
    admin: any;
    columnDefs = [
        {
            headerName: 'Email_ID', field: 'userId', filter: true,
            checkboxSelection: true, width: 300,
        },
        { headerName: 'First Name', field: 'firstName', filter: true },
        { headerName: 'Last Name', field: 'lastName', filter: true },
        { headerName: 'Organization', field: 'company', filter: true },
        { headerName: 'Department', field: 'department', filter: true },
        { headerName: 'Products', field: 'products', filter: true, cellRenderer: "childMessageRenderer" },
        { headerName: 'Roles', field: 'name', filter: true }
    ];

    rowData: any = [];
    userId: any;

    modules = AllCommunityModules;
    ngOnInit() {

        this.rowData =[
            { userId: 'venkata.simhadri@epsoftinc.com', firstName: 'Gopi', lastName: 'Palla', company: 'Epsoft', department: 'Devlopement', products: '', name: '' },
            { userId: 'sshivasimhadri@epsoftinc.com', firstName: 'Shiva', lastName: 'Simhadri', company: 'Epsoft', department: 'Devlopement', products: '', name: '' },
            { userId: 'deepak.pilla@epsoftinc.com', firstName: 'Deepak', lastName: 'Pilla', company: 'Aiotal', department: 'Managment', products: '', name: '' },
            { userId: 'ranjith.sigiri@epsoftinc.com', firstName: 'Ranjith', lastName: 'Sigiri', company: 'Epsoft', department: 'Devlopement', products: '', name: '' },
            { userId: 'jaswanth.madala@epsoftinc.com', firstName: 'Jaswanth', lastName: 'Madala', company: 'Aiotal', department: 'Devlopement', products: '', name: '' },
            { userId: 'veena.rebba@epsoftinc.com', firstName: 'Veena', lastName: 'Rebba', company: 'Aiotal', department: 'Pmo', products: '', name: '' },
            { userId: 'nagalakshmi.parimi@epsoftinc.com', firstName: 'Nagalakshmi', lastName: 'parimi', company: 'Epsoft', department: 'Qa', products: '', name: '' },
            { userId: 'satya.rayudu@epsoftinc.com', firstName: 'Ravi', lastName: 'Rayudu', company: 'Epsoft', department: 'Devlopement', products: '', name: '' },
            { userId: 'geetharam.dadi@epsoftinc.com', firstName: 'Geetharam', lastName: 'Dadi', company: 'Epsoft', department: 'Managment', products: '', name: '' },
            { userId: 'salma.shaik@epsoftinc.com', firstName: 'salma', lastName: 'Shaik', company: 'Aiotal', department: 'Devlopement', products: '', name: '' },
            { userId: 'rahima.mahammad@epsoftinc.com', firstName: 'Rahima', lastName: 'Sulthana', company: 'Aiotal', department: 'Ba', products: '', name: '' },
        ];

    }
    constructor(private http: HttpClient, private userService: UsermanagementService, 
        public modal: BsModalService) {

        this.frameworkComponents = { childMessageRenderer: Cellrender }
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
  
        this.userService.updateRole(this.modifyModel).subscribe(data => this.checkSuccessCallback(data));
    }
    checkSuccessCallback(data) {
       
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

        this.modifyModel={};
        this.fetchallusers();
    }
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
        this.gridApi.setDomLayout('autoHeight');

    }


}