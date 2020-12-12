import  *as $  from 'jquery';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-superadminmetrics',
  templateUrl: './superadminmetrics.component.html',
  styleUrls: ['./superadminmetrics.component.scss']
})
export class SuperadminmetricsComponent implements OnInit {

  //top bar count
  couponscount: any=[];
  vaulttotalcount: any=[];
  tenantcount: any=[];
  subscriptionbarcount: any=[];

  //Product Roles & Permission
  rolespermissions: any=[];
  xaxislabel1='Product';
  yaxislabel1='Roles Count';

  // Permissions
  public permissions: any[];
  xaxislabel2='No. of Roles'
  yaxislabel2='No. of Permissions';

  // Subscription plan
  products:any=[];
  xaxislabel3='Product'
  yaxislabel3='No. of Subscriptions'
  xaxislabel4='Plans'
  yaxislabel4='No. of Plans'
  
  // tenant vs user
  tenantvsuser: any=[];
  xAxisLabel5='Tenant'
  yaxislabel5='No. of Users'

  // Secret name vs key count
  vaultkeycount: any=[];
  secretvskeycount:any;
  xAxisLabel6='Secret Name'
  yaxislabel6='Key Count'


  plansdata: any=[];
  coupons: any=[];
  tenantId: string;
  public planname: any;
  public productname: any;
  roleproductname:any=[];
  tabledata: any=[];
  tenantplansubscription: any[];  
  rolesdata: any=[];
  public dsss: any;
  public subscriptiontotolcount: any;
  sdfdfd: { name: string; value: any; }[];
  public rolesproduct: any=[];
  public rolesandproducts: any;

  

  constructor(private profileService:ProfileService) { }

  ngOnInit() {

$("#Permissionbarchart").hide();
$("#subscriptionsbarchart").hide();
$("#tenantsubscription").hide();

this.getRolesAndPermissions();
this.getsubscriptionAndProducts();
this.getSubscriptionsdetails();
this.getCouponsCount();
this.getVaultTotalCount();
this.getTenantCount();
this.getTenantvsUser();
this.getvaultkeycount();
this.getSubscriptionCount();
this.getRolesProducts();
this.getCouponsCountKpi();

  }

  getRolesAndPermissions(){
    this.profileService.getRolesAndPermissionKpi().subscribe(count=>{
      this.permissions=count
    })
  }
  
  getPermissions(event) {
    
    $("#Rolesbarchart").hide();
    $("#Permissionbarchart").show();
    let productname=event.name;
    let arr=this.permissions.filter(item=>item.product==productname)
    this.rolesdata=[];
    arr.forEach(element => {
      this.rolesdata.push({
        "name":element.role,
        "value":element.permissioncount
      })
     
    });
    this.dsss= this.rolesdata; 
  } 

  onClickBack(){
    $("#Rolesbarchart").show();
    $("#Permissionbarchart").hide();
  }

  onSelectProduct(event) {
    $("#productsbarchart").hide();
    $("#subscriptionsbarchart").show();

    this.productname=event.name;
    this.plansdata=[
      {
      "name":"Standard",
      "value":this.tenantplansubscription.filter(item=>item.plan=="Standard" && item.product==this.productname).length 
      },
      {
      "name":"Professional",
      "value":this.tenantplansubscription.filter(item=>item.plan=="Professional" && item.product==this.productname).length
      },
      {
      "name":"Enterprise",
      "value":this.tenantplansubscription.filter(item=>item.plan=="Enterprise" && item.product==this.productname).length
      }
      ]
    console.log(event);
  } 

  onClickSubscriptionBack(){
    $("#productsbarchart").show();
    $("#subscriptionsbarchart").hide();
  }

  onSelectSubscriptionplan(event) {
    $("#subscriptionsbarchart").hide();
    $("#tenantsubscription").show();
    this.planname=event.name;
    
      this.tabledata=this.tenantplansubscription.filter(item=>item.plan==this.planname && item.product==this.productname);
      
    console.log(event);
  } 

  onTenantLevelBack(){
    $("#subscriptionsbarchart").show();
    $("#tenantsubscription").hide();
  }

  getCouponsCount(){
    this.profileService.listofCuopons().subscribe(count=>{
      this.couponscount=count
    })
  }

  
getTenantCount(){
  this.profileService.getTenantCount().subscribe(tenant=>{
    this.tenantcount=tenant
  })
}

getTenantvsUser(){
  this.profileService.getTenantvsUser().subscribe(tenantvsuser=>{
    this.tenantvsuser=tenantvsuser
  })
}
  getvaultkeycount(){
    this.profileService.getvaultkeycount().subscribe(vaultkeycount=>{
      this.vaultkeycount=vaultkeycount
    })
  }

     getVaultTotalCount()
      {
        this.profileService.getAllSecretKeys().subscribe(vault=>{
          this.vaulttotalcount=vault
        })
      }

      getsubscriptionAndProducts(){
        this.profileService.getsubscriptionAndProducts().subscribe(subproducts=>{
          this.products=subproducts
        })
      }

      getSubscriptionCount(){
        this.profileService.getsubscriptionAndProducts().subscribe(subproducts=>{
          this.subscriptionbarcount=subproducts
          let result = this.subscriptionbarcount.filter(obj => {
            return obj.name === "2.0"
           })
          this.subscriptiontotolcount=result[0].value;
        })
      }
      
      getSubscriptionsdetails(){
        this.profileService.getSubscriptionsdetails().subscribe(subtenant=>{
          this.tenantplansubscription=subtenant
        })
      }
      

      getRolesProducts(){
        this.profileService.getAllApplications().subscribe(app=>{
          this.rolespermissions=app
        this.rolespermissions.forEach(element => {
          let arr=this.permissions.filter(item=>item.product==element.name).length
          this.rolesproduct.push({
            "name":element.name,
            "value":arr
          })
        });
        this.rolesandproducts= this.rolesproduct; 
        })
      }

      getCouponsCountKpi(){
        this.profileService.getCouponsCountKpi().subscribe(count=>{
          this.coupons=count
        })
      }   
}
