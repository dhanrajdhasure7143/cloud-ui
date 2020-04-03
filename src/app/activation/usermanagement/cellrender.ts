
import {Component, OnInit} from "@angular/core";
import {ICellRendererAngularComp} from "@ag-grid-community/angular";
import { UsermanagementService } from 'src/app/_services/usermanagement.service';

interface roleListModel{
    "id": string; 
    "ext_id": string; 
    "name": string; 
    "appliationId": { 
        "appId": string; 
        "ext_id": string; 
        "name": string; 
        "description": any; 
        "meta": any; 
        "createdTimestamp": any; 
        "modifiedTimestamp": any; 
    }; 
    "meta": string; 
    "createdTimestamp": any; 
    "modifiedTimestamp": any; 
    "permission": any[];
}


@Component({
    selector: 'child-cell',
    template: `<select class="mySelect" (change)='onProductSelection($event)' >
    <option value="0" selected disabled hidden > 
         --Select-- 
      </option>
      
       <option *ngFor="let productd of products" [value]="productd.appId" >{{productd.name}}</option>
     </select>`,
     providers: [UsermanagementService]
    
})
export class Cellrender implements OnInit, ICellRendererAngularComp {
    public params: any;
    products:any=[];
    application_id:any;
    roleslist:roleListModel[];
ngOnInit(){
    let tenantId = localStorage.getItem("tenantName");
    let userId = localStorage.getItem("userName");
    this.userProducts(tenantId,userId);
    // this.products = [
    //     {
    //         "appId": "1",
    //         "ext_id": "11",
    //         "name": "Asimov",
    //         "description": null,
    //         "meta": null,
    //         "createdTimestamp": null,
    //         "modifiedTimestamp": null
    //     }
    // ];
    // this.roleslist = [
    //     {
    //         "id": "10",
    //         "ext_id": "11",
    //         "name": "Admin",
    //         "appliationId": {
    //             "appId": "1",
    //             "ext_id": "11",
    //             "name": "Asimov",
    //             "description": null,
    //             "meta": null,
    //             "createdTimestamp": null,
    //             "modifiedTimestamp": null
    //         },
    //         "meta": "fgghghfg",
    //         "createdTimestamp": null,
    //         "modifiedTimestamp": null,
    //         "permission": []
    //     },
    //     {
    //         "id": "11",
    //         "ext_id": "11",
    //         "name": "FlowAdmin",
    //         "appliationId": {
    //             "appId": "1",
    //             "ext_id": "11",
    //             "name": "Asimov",
    //             "description": null,
    //             "meta": null,
    //             "createdTimestamp": null,
    //             "modifiedTimestamp": null
    //         },
    //         "meta": "gddfgfhfgh",
    //         "createdTimestamp": null,
    //         "modifiedTimestamp": null,
    //         "permission": []
    //     }
    // ];
  }
  constructor( private userService: UsermanagementService){}
    agInit(params: any): void {
        this.params = params;
    }

    public onProductSelection(e) {
       this.application_id = e.target.value;
        let element = e.target.closest(".ag-row");
        let selected_row_userid:HTMLElement = element.querySelector("div[col-id='userId']");
        let selected_row_role_el:HTMLElement = element.querySelector("div[col-id='name']");
        this.userService.userRole(selected_row_userid.innerText, this.application_id).subscribe(
            data=>{
                this.roles(data,this.application_id)
            },
            err=>{
                this.roles(selected_row_role_el,this.application_id)
            }
        );
        this.roles(selected_row_role_el,this.application_id)
     } 
 

    refresh(): boolean {
        return false;
    }
    userProducts(tenantId,userId)
    {
 
    this.userService.userProducts(tenantId,userId).subscribe(data=>this.productlist(data), err=>this.productlist([]));
    }  
    productlist(data){
       this.products=data;
       
    } 
    
    roles(data,appId){  
        let role = "";
        switch(appId){
            case '1': role = "QA"; break;
        }
        data.innerText = role;
    }
}

