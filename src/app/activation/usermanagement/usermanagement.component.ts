import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { OPAUser } from 'src/app/_models/OPAUser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsermanagementService } from 'src/app/_services/usermanagement.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

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
    //public rowData: any[] = [];
    public model = new OPAUser();
    //public columnDefs;
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
    admin: any;

    //constructor() { }

    columnDefs = [
        {
            headerName: 'User ID', field: 'userId', filter: true,
            checkboxSelection: true, width: 300,
        },
        { headerName: 'First Name', field: 'firstName', filter: true },
        { headerName: 'Last Name', field: 'lastName', filter: true },
        { headerName: 'Organization', field: 'company', filter: true },
        { headerName: 'Department', field: 'department', filter: true },
        { headerName: 'Role', field: 'Role', filter: true },
        // this.rowSelection = 'multiple'

    ];

    rowData: any = [];
    userId: any;

    modules = AllCommunityModules;
    ngOnInit() {
        //  this.rowData = [
        //   { Email: 'gopi.palla@epsoftinc.com',    f_name: 'Gopi',   l_name: 'Palla',       organisation:'Epsoft',     department:'Devlopement',     Role:'Admin'},
        //   { Email: 'sshivasimhadri@epsoftinc.com', f_name: 'Shiva',  l_name: 'Simhadri',    organisation:'Epsoft',    department:'Devlopement',     Role:'Admin'},
        //   { Email: 'deepak.pilla@epsoftinc.com',    f_name: 'Deepak', l_name: 'Pilla',      organisation:'Aiotal',    department:'Managment',       Role:'Admin' },
        //   { Email: 'ranjith.sigiri@epsoftinc.com', f_name: 'Ranjith',l_name: 'Sigiri',      organisation:'Epsoft',    department:'Devlopement' ,    Role:'User'},
        //   { Email: 'jaswanth.madala@epsoftinc.com',f_name: 'Jaswanth',l_name: 'Madala',     organisation:'Aiotal',    department:'Devlopement',     Role:'User' },
        //   { Email: 'veena.rebba@epsoftinc.com' ,   f_name: 'Veena',      l_name: 'Rebba',   organisation:'Aiotal',    department:'Pmo',             Role:'Admin'},
        //   { Email: 'nagalakshmi.parimi@epsoftinc.com',f_name:'Nagalakshmi', l_name:'parimi',organisation:'Epsoft',    department:'Qa',              Role:'User'},
        //   { Email: 'satya.rayudu@epsoftinc.com',   f_name: 'Ravi',       l_name: 'Rayudu',  organisation:'Epsoft',    department:'Devlopement',     Role:'User' },
        //   { Email: 'geetharam.dadi@epsoftinc.com' ,f_name: 'Geetharam',  l_name: 'Dadi',    organisation:'Epsoft',    department:'Managment',       Role:'User'},
        //   { Email: 'salma.shaik@epsoftinc.com',    f_name: 'salma',      l_name: 'Shaik',   organisation:'Aiotal',     department:'Devlopement',    Role:'User' },
        //   { Email: 'rahima.mahammad@epsoftinc.com',f_name: 'Rahima',     l_name: 'Sulthana',organisation:'Aiotal',    department:'Ba' ,             Role:'Admin'},


        //  ];
        //  this.userService.usersDetails().subscribe(opaUser => this.rowData = opaUser || []);
        let tenantId = localStorage.getItem("company");
        let userId = localStorage.getItem("userName");
        this.userService.usersDetails(tenantId, userId).subscribe(data => {
        this.rowData = data || []
            console.log("users", this.rowData);
            var orginalData = [];
            this.rowData.forEach(function (value) {
                if (value.firstName === null) {
                    value.firstName = "-- --"
                    orginalData.push(value);
                }
                if (value.lastName === null) {
                    value.lastName = "-- --"
                    orginalData.push(value);
                }
                if (value.company === null) {
                    value.company = "-- --"
                    orginalData.push(value);
                }
                if (value.department === null) {
                    value.department = "-- --"
                    orginalData.push(value);
                }
            })
        })
    };


    constructor(private http: HttpClient, private userService: UsermanagementService, public modal: BsModalService) {
        // this.setUserRoleConfig();
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
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
        this.gridApi.setDomLayout('autoHeight');
        //this.getOrganizations();
    }


}