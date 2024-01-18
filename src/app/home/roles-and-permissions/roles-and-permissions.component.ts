import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-roles-and-permissions',
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.scss']
})
export class RolesAndPermissionsComponent implements OnInit {

  data: any = [];
  result: any = [];
  productValue: any = [];
  roleValue: any = [];
  roleData: any = [];
  productName: any;
  selectedRole: any = [];
  rolesData: any = [];
  permissionsValue: any = [];
  permissions: any = [];
  tenantId: string;
  email: string;
  appSelectedId: any;
  roles: any;
  constructor(public userService: UserService, ) { }
  ngOnInit() {

    //   this.data = [
    //   {
    //     'name' : 'Asimov',
    //     'id': '1'
    //   },
    //   {
    //     'name' : 'Ezflow',
    //     'id': '2'
    //   }
    // ]


    this.tenantId = localStorage.getItem("tenantName")
    this.email = localStorage.getItem("userName");

    this.userService.getUserApplications().subscribe(data => this.successGetApps(data));

  }
  successGetApps(data) {
    this.result = [];
    this.permissions = [];
    this.selectedRole = [];

    data.forEach(element => {
      this.result.push(element)

    })

  
  }


  onChangeproduct(selectedProduct) {

    this.selectedRole = [];
    this.permissions = [];
    this.productName = selectedProduct;

    this.result.forEach(element => {
      if (element.name == selectedProduct) {
        this.appSelectedId = element.appId
      
        this.userService.getSelectedRole(element.appId).subscribe(data => this.successRoles(data));
        this.appSelectedId = element.appId
      
      }
    })
    //   if(selectedProduct == ){
    //     this.roleData = [
    //       {
    //         'roleName' : 'Admin'
    //       },
    //       {
    //         'roleName' : 'User'
    //       }
    //     ]
    //     console.log(this.roleData[0].roleName);
    //     // selectedRole = roleData[0].roleName
    //     this.roleData.forEach(element => {
    //       this.selectedRole.push(element.roleName)
    //     });
    //     console.log(this.selectedRole);

    //   }else{
    //     this.roleData = [
    //       {
    //         'roleName' : 'User'
    //       },
    //       {
    //         'roleName' : 'Admin'
    //       }
    //     ]
    //     this.roleData.forEach(element => {
    //       this.selectedRole.push(element.roleName)
    //     });
    //   }
  }

  successRoles(roleData) {
    this.selectedRole = [];
    this.permissions = [];
    this.roles = roleData;
       roleData.forEach(element => {
      this.selectedRole.push(element.name)
      this.rolesData.push(element)
    });
  }
  onChangerole(event) {
    this.permissions = [];
   
    this.roles.forEach(element => {
      if (event == element.name) {


        element.permission.forEach(ele => {
          this.permissions.push(ele.permissionName)
        })

        // this.permissionsValue.forEach(elemnt => {
        //   this.permissions.push(elemnt.permissionName)
        // })
       
      }
    })




  }


}
