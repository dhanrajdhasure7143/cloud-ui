import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { User } from './../../_models/user';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import countries from 'src/app/../assets/jsons/countries.json';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProfileService } from 'src/app/_services/profile.service';
import { NotifierService } from 'angular-notifier';
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';
import { ProductlistService } from 'src/app/_services/productlist.service';
import {yearslist } from './../../../assets/jsons/yearlist.json';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import moment from 'moment';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { log } from 'console';
import * as $ from 'jquery';
import { TabsetComponent } from 'ngx-bootstrap';
import { CryptoService } from 'src/app/_services/crypto.service';



@Component({ 
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() public isInvite: boolean;
  @Input() public isAlerts: boolean;
  @Input() public isMyaccount: boolean;
  @Input() public isusers: boolean;
  @Input() public isCoupon: boolean;
  @Input() public isnotification: boolean;
  @Input() public isvaultMangment:boolean;
  // @ViewChild('staticTabs') staticTabs: TabsetComponent;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  public model: User;
  public yearList:any;
  config = {
    animated: false,
    ignoreBackdropClick: true
  };
  public cardModel:any={};
  public alertModel:any={};
  public cardDetails:any;
  public paymentToken:any;
  public isdefault:boolean=false;
  public searchvalue: any;
  public searchUser: any;
  public searchCoupon: any;
  public emailId: any[];
  public sentFromOne: any;
  public tableData: any=[];
  public formOne: any = {};
  public formTwoFactor: any = {};
  // public isEmailcheckForOTP: any;
  // public isSMScheckForOTP: any;
  countryInfo: any[] = [];
  public secretes: any[] = [{
    id: 1,
    key: '',
    value: ''
    
  }];

  isReedemBy:boolean=false;
  isReedemTimes:boolean=false;
  isAmount:boolean=false;
  public addDepartment: boolean = false;
  public departments: any;
  public password: any;
  public userManagement: any=[];
  public userManagementalerts: any=[];
  public userManagementresponse:any=[];
  public show: boolean = true;
  public eyeshow: boolean = true;
  public neweyeshow: boolean = true;
  public confeyeshow: boolean = true;
  public isOpened: any ;
  public showList:boolean =  true;
  public selectedIndex: any;
  public deletCardIndex: number;
  public defaultcard: number = 0;
  modifyprod:any;
  modalRef: BsModalRef;
  public stopcheckbox: any;
  public pricecheckbox: any;
  public plancheckbox: any;
  public feedbackbox: any;
  public paymentMode: any=[];
  public invoicedata: any=[];
  public notificationList: any;
  public dataid: any;
  public userId: any;
  subscribeddata: any;
  configalertdata:any;
  public userdata: any;
  public closeFlag: Boolean = false;
  public useremail: any;
  public myroleId:any;
  public myappId:any;
  public myappName:any;
  public ispublicMail:boolean=false;
  selectedroles: any = [];
  department: any;
  userDepartment: any;
  updateConfigData:any;
  listOfUserApplications: any = [];
  userManagementRole :any=[];
  userManagementApps :any=[];
  listOfroles: any=[];
  delData: any;
  blob: Blob;
  invoiceid: any;
  apps: any;
  userRole: any = [];
  public otherdepartment: any;
  stateInfo: any[] = [];
  cityInfo: any[] = [];
  allRoles: any[]=[];
  listOfpermissions: any = [];
  permissionList: any = [];
  tenantId: string;
  applications: any; 
  public permissionsList: any;
  public roleName: any;
  public roleDescription:any;
  public roledata:any;
  selectedpermissions :any = [];
  permidlist : any = [];
  amountOff:any;
  isPercentage:boolean=false;
  isSameDomain:boolean=false;
  selectedApp:any;
  selectedApplication:any;
  selectedpermidlist: any = [];
  couponDetails: any;
  couponNamename: any;
  couponIdId: any;
  durationTime: any;
  durationInMonths: any;
  percentageOffTot: any;
  data: any;
  allCoupons: any=[];
  mod: any;
  coupondata: any;
  testArry: any = [];
   allKeys : any = [];
   inviteAllRoles: any;
   public addRolePermissionsList: any;
   department1:any;
 
  
  /**alerts */
  isEmailcheckBoxValue:any;
  isPushNotificationcheckBoxValue:any;
  isSMScheckBoxValue:any;
  isIncidentcheckBoxValue:any;
  activitieslist:any = [];
  modulesList:any=[];
  selectValue:any = [];
  isChecked:any = [];
  result: void;
  checkedData: any;
  demo: any = [];
  secreteKey: any;
  key: any;
  application: any = [];
  listOfNames: any = [];
  listOfId: any = [];
  Follow_list: any;
  alertsapplication: any;
  alertsactivities:any=[];
  selectedtype:any;
  emailselected:any;
  smsselected:any;
  incidentselected:any;
  pushNotifications:any;
  pushEmailNotificationsTo:any;
  pushsmsNotificationsTo:any;
  alertsbody:any;
  channel: any[]=[];
  alertmodifybody:any;
  domain:any;
  p=0;
  c=0;
  cpp=0;
  rp=0;
  pp=0;
  em=0;
  sn=0;
  emailtemp=0;
  subtemp=0;
  phtemp=0;
  pmtemp=0;
  alertuserroles:any=[];
 public alertslistactivitiesdata:any=[];
 public updateUserRolesList:any=[];
  applicationames: any;
  notificationbody: { tenantId: string; };
  updatetext_to: any;
  updateIncident: any;
  updateApplication: any;
  updateType: any;
  updateActivities: any;
  updateMail: any;
  updatetemp:any;
  selectedalertdet:any;
  selectedRolesArry: any = [];
  permName: any;
  permissionDescription: any;
  permdata:any;
  currentPassword:any;
  newPassword:any;
  confirmPassword:any;
  role: string;
  availableRedeemptions: any;
  roleArray: any = [];
  rolesArryList: any[];
  roleListdata: any;
  pswdmodel:any = {};
  testRolesList: any = [];
  forever: any;
  islimited: boolean=false;
  redeemTimeslimit: any;
  closeDeleteForm: boolean = true;
  phnCountryCode: any;
  isRefresh: boolean = false;
  userStatus: any;
  status: any;
  roleresp: any;
  invite_product: any='';
  inviterolesid: any=[];
  selectedFile: any;
  upload_excel: string;
  inviteremailId: string;
  invitemultirole:boolean=false;
  currentUserId: any;
  datetime: any;
  datetimeinput:any;
  prevdate:any;
  redeemdate: any;
  public notificationreadlist:any;
  cards: any;
  templates: any=[];
  emailtemplateslist: any=[];
  emailtemplate: any;
  vaulConfigureList:any=[];
  viewdata: any;
  secreteDetails: { secreteKey: any; key: any; };
   public secretes1: any[] = [];
  public mydata = {
  };
  public updatesecreteobj={};

  secretkeyname:any;
  versiondata: any;
  updateSecretedata: any;
  mykeys: any=[];
  myvalue:  any=[];
  finalObj: any;
  input1: any;
  mailsubject:any;
  templateName:any;
  mailbody: any;
  templatedata: any;
  selectedtempdet: any;
  isadd: boolean=false;
  addpressed: boolean=false;
  modules: any;
  modtempcreated: any;
  modtempbody: any;
  modtempid: any;
  modtempname: any;
  modtempsub: any;
  modtemptenant: any;
  searchtemplate:any;
  configprods: any=[];
  selectedproduct: any;
  mypages: any=[];
  selectedmodule: any;
  myfields: any=[];
  seleftedFeild: any;
  selectedPage: any;
  selectedFeild: any;
  selectedvaultconfig: string;
  modprod: any;
  modmodule: any;
  modpage: any;
  modfield: any;
  modconfigId: any;
  isupdatecouponclicked: boolean=false;
  emailvalue: any;
  enableTwoFactorConfig: boolean;
  selectedsecret: any;
  modvaultId: any;
  searchDept:any;
  categories:any=[];
  deptName:any;
  dept:any;
  categoryname:any;
  emailRequired: boolean = false;
  tot: any=[];
  superadminnotificationList: any;
  customUserRole: any;
  userManagementEnabled: boolean = false;
  myAccountFull: boolean = false;
  myAccount_PaymentHistory_All: boolean = false;
  myAccount_PaymentMode_All: boolean = false;
  myAccount_Subsription_Update: boolean = false;
  myAccount_Subsription_Delete: boolean = false;
  myAccount_Subsription_All: boolean = false;
  couponid: any;
  couponduration: any;
  coupondurationInMonths: any;
  couponname: any;
  couponpercentOff: any;
  couponamountOff: any;
  couponmaxRedemptions: any;
  mindate: any;
  public usersalertsdata: any=[];
  userManagement_Users_Full: boolean = false;
  userManagement_Roles_Full: boolean = false;
  userManagement_Depart_Full: boolean = false;
  configuration_Alerts_Full: boolean = false;
  configuration_EmailTempt_Full: boolean = false;
  confuguration_SecureVault_Full: boolean = false;
  configuration_TwoFactor_Full: boolean = false;
  searchsub: string;
  searchpayment: string;
  searchmode: string;
  searchalert: string;
  searchvault: string;
  searchRole: string;
  searchPermission: string;
  searchvaultmng: string;
  testuserid: any;
  private spacialSymbolEncryption:string = '->^<-';
  secretarray: any=[];
  cardType:any;


  //dropdownSettings:IDropdownSettings;
  constructor(private sharedData: SharedDataService,
    private firstloginservice: FirstloginService,
    private modalService: BsModalService,
    private profileservice: ProfileService,
    private notifier: NotifierService,
    private router: Router,
    private productlistservice:ProductlistService,
    private cryptoService:CryptoService
 
  ) { }

  ngOnInit() {
    this.profileservice.getCustomUserRole(2).subscribe(role=>{

      this.customUserRole=role.message[0].permission;
      this.customUserRole.forEach(element => {
        if(element.permissionName.includes('UserManagement_All')){
          this.userManagementEnabled = true;
        }else if(element.permissionName.includes('MyAccount_All')){
          this.myAccountFull = true;
        }else if(element.permissionName.includes('MyAccount_Subscription_All')){
          this.myAccount_Subsription_All = true;
        }else if(element.permissionName.includes('MyAccount_PaymentMode_Full')){
          this.myAccount_PaymentMode_All = true;
        }else if(element.permissionName.includes('MyAccount_PaymentHistory_Full')){
          this.myAccount_PaymentHistory_All = true;
        }else if(element.permissionName.includes('MyAccount_Subscription_Update')){
          this.myAccount_Subsription_Update = true;
        }else if(element.permissionName.includes('MyAccount_Subscription_Delete')){
          this.myAccount_Subsription_Delete = true;
        }else if(element.permissionName.includes('UserManagement_Users_Full')){
         this.userManagement_Users_Full = true;
        }else if(element.permissionName.includes('UserManagement_Roles_Full')){
        this.userManagement_Roles_Full = true;
        }else if(element.permissionName.includes('UserManagement_Departments_Full')){
         this.userManagement_Depart_Full = true;
        }else if(element.permissionName.includes('Configuration_Alerts_Full')){
        this.configuration_Alerts_Full = true;
        }else if(element.permissionName.includes('Configuration_EmailTemplates_Full')){
        this.configuration_EmailTempt_Full = true;
        }else if(element.permissionName.includes('Configuration_SecureVault_Full')){
        this.confuguration_SecureVault_Full = true;
        }else if(element.permissionName.includes('Configuration_TwoFactor_Full')){
        this.configuration_TwoFactor_Full = true;
        }
                 
      });
     
    })

   this.mindate= moment().format("YYYY-MM-DD");

    this.selectedIndex = '';
    this.getAllPaymentmodes();
    this.getAllProducts();
    this.getAllKeys();
    this.emailvalue = "false";
    //this.formTwoFactor.enableTwoFactor = false;
    this.formTwoFactor.isEmailcheckForOTP = true;
    this.formTwoFactor.isSMScheckForOTP = false;
    this.getTwoFactroConfigurations();
    //this.formTwoFactor.company = "Epsoft";
  //   this.applications = [
  //     {id: 2, name: "2.0"},
  //     {id: 3, name: "ezflow"}
  // ];
  this.getAllSuperAdminNotifications();
  this.getListOfEmailTemplates();
    this.getAllPermissions();
    this.getListOfVaultconfigs();
    this.yearList=yearslist;
      this.getAllNotifications();
    this.profileservice.getUserApplications().subscribe(resp => {  
      this.apps = resp;
             this.apps.forEach(elementApps => {
          this.listOfUserApplications.push(elementApps.name)
        });
    })
      this.tenantId=localStorage.getItem('tenantName');
      
this.getAllUsersList();
this.getAlertUsersList();

this.getRoles();
this.getListofCoupons();
    // this.profileservice.getAllRoles(2).subscribe(resp => {
    //   this.allRoles = resp,
    //   console.log("resp is",resp)

    //     this.allRoles.forEach(elementRoles => {
          
    //              this.listOfroles.push(elementRoles.name)
    //     });
          
    // })
    this.profileservice.getUserRole(2).subscribe(role => {
      this.userRole = role.message;

    })
    this.countryInfo = countries.Countries;
    this.useremail=localStorage.getItem('userName');
    
  

/**alerts */
this.profileservice.applications().subscribe(resp => 
  {
    this.application = resp;
   
  this.application.forEach(element => {
    this.listOfNames.push(element)
    this.listOfId.push(element.app_id)
  });})
  
    

  }
  getAllUsersList(){

    this.currentUserId = localStorage.getItem("ProfileuserId");
    this.userManagement = [];
    this.profileservice.getTenantbasedusersDetails(this.tenantId).subscribe(resp=>{
     
        this.userManagementresponse = resp
           this.userManagementresponse.forEach(elementuser => {
             this.roleArray = [];
             elementuser.userId['applicationIdname']=elementuser.applicationId.name;
             this.rolesArryList = elementuser.rolesEntityList;
            
             this.rolesArryList.forEach(element => {
               this.roleArray.push(element.name);
               
             });;
             
          elementuser.userId['roleIdname']=this.roleArray;
          elementuser.userId['created_at']=elementuser.created_at;
          elementuser.userId['department']=this.department;
          if(elementuser.userId.enabled == 'true'){
            elementuser.userId['Status'] = 'Active'
          }else if(elementuser.userId.enabled == 'false'){
            elementuser.userId['Status'] = 'Inactive'
          }else{
            elementuser.userId['Status'] = 'Not Registered'
          }
         // if(this.currentUserId != elementuser.userId.userId)
          this.userManagement.push(elementuser.userId);
          // this.userManagement.sort(function(a,b){
          //   // Turn your strings into dates, and then subtract them
          //   // to get a value that is either negative, positive, or zero.
          //   return b.created_at - a.created_at;
          // });
          
        });
        
    });

  }

  getAlertUsersList(){
    this.currentUserId = localStorage.getItem("ProfileuserId");
    this.userManagementalerts = [];
    this.profileservice.getTenantbasedusersDetails(this.tenantId).subscribe(resp=>{
      
        this.userManagementresponse = resp
           this.userManagementresponse.forEach(elementuser => {
             this.roleArray = [];
             elementuser.userId['applicationIdname']=elementuser.applicationId.name;
             this.rolesArryList = elementuser.rolesEntityList;
            
             this.rolesArryList.forEach(element => {
               this.roleArray.push(element.name);
               
             });;
             
          elementuser.userId['roleIdname']=this.roleArray;
          elementuser.userId['created_at']=elementuser.created_at;
          elementuser.userId['department']=this.department;
          if(elementuser.userId.enabled == 'true'){
            elementuser.userId['Status'] = 'Active'
          }else if(elementuser.userId.enabled == 'false'){
            elementuser.userId['Status'] = 'Inactive'
          }else{
            elementuser.userId['Status'] = 'Not Registered'
          }
         // if(this.currentUserId != elementuser.userId.userId)
          this.userManagementalerts.push(elementuser.userId);
          
          this.usersalertsdata=this.userManagementalerts.filter(item=>item.firstName!=null && item.lastName!=null);
          // this.userManagement.sort(function(a,b){
          //   // Turn your strings into dates, and then subtract them
          //   // to get a value that is either negative, positive, or zero.
          //   return b.created_at - a.created_at;
          // });
          
        });
        
    });
  }
  getListofCoupons() {
    this.prevdate = new Date().getFullYear() + "-" +  new Date().getMonth()+1 + "-" + new Date().getDate() + "T" + "08:30"
    this.profileservice.listofCuopons().subscribe(resp=>{this.allCoupons=resp
      this.allCoupons.forEach(element => {
       element.availableRedeemptions=element.maxRedemptions-element.timesRedeemed;
       
        if(element.amountOff!=null)
        {
          element.percentOff=' - '
         
        }
        else{
        element.amountOff=' - '
        }
        if(element.maxRedemptions==null){
          element.maxRedemptions='No Limit'
        }
        
      });
  })
 
  }
  getAllKeys(){
    
    this.profileservice.getAllSecretKeys().subscribe(resp=>{
     this.allKeys=resp
        }
      );
    
  }
  viewSecreteData(keys,i,template){
  
   let secret=[]
  // this.secretarray
        this.viewdata=keys;
        let idCount=0
        for (const [key, value] of Object.entries(this.viewdata.data.data)) {
          
          let obj={}
          obj[`id`]=idCount++
          obj[`key`]=`${key}`
          obj[`value`]=`${value}`
          secret.push(obj)
          
        }
 
 this.secretarray=secret
    this.versiondata=this.viewdata.data.metadata.version;
    this.updateSecretedata=this.viewdata
    // this.mykeys= Object.keys(this.updateSecretedata.data.data)
    // this.myvalue=Object.values(this.updateSecretedata.data.data)
    
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));

  }
  
  updateSecret(){

  }
  
  addSecretupdate(){
    //this.secretes=[];
    this.isadd=true;
    this.addpressed=true;
    this.secretarray.push({
      id: this.secretarray.length + 1,
      key: '',
      value: ''
    }); 
  }

  removeSecretesId(i : number){
    this.secretarray.splice(i, 1);
  }
  //update secrete
  updateSecreteData(updateSecretedata){
   let obj={}
  //  console.log(this.secretarray);
    // this.secretes1.forEach(element => {
    //   this.updatesecreteobj[element.key] = element.value
    //   });

  for (let i = 0; i < this.secretarray.length; i++) {
    obj[this.secretarray[i].key]=this.secretarray[i].value
  }
  
    //this.updatesecreteobj[this.updateSecretedata] = this.updateSecretedata.data.data
   
    // this.finalObj=Object.assign(this.updatesecreteobj,obj)
    this.finalObj=obj;
  
    this.input1={
      "options": {
        "cas": this.versiondata
      },
      "data": this.finalObj
    }
     // this.updatesecreteobj[this.viewdata] = this.updateSecretedata.data.data
    
        this.profileservice.creatSecret(this.input1,updateSecretedata.keyname).subscribe(resp=>{this.data=resp
      this.getAllKeys();
      this.modalRef.hide();
        this.notifier.show({
          type: "success",
          message: "Updated Succesfully!"
        });
        this.secretes1=[];
      });

   this.mykeys= Object.keys(this.updateSecretedata.data.data)
   this.myvalue=Object.values(this.updateSecretedata.data.data)
   // updatesecreteobj[key] = this.updateSecretedata.data.data
   

  }
  close_modal(){
    this.modalRef.hide();
  }
  getAllPaymentmodes() {

    this.profileservice.listofPaymentModes().subscribe(response => {
     if(response.message==undefined){
       this.paymentMode = response 
        let result = this.paymentMode.filter(obj => {
         return obj.defaultSource === true
        })
        localStorage.setItem('cardId',result[0].id)
       localStorage.setItem('cardExpMonth',result[0].cardExpMonth)
       localStorage.setItem('cardExpYear',result[0].cardExpYear)
        localStorage.setItem('cardholdername',result[0].name)
       localStorage.setItem('cardLast4',result[0].cardLast4)
      }
        });
  }
   getAllCategories(){
    this.profileservice.getCategories().subscribe(resp => {
      this.categories = resp.data
    })
   }
  ngOnChanges() {
   
    if(this.isusers){
      this.getAllCategories();
    }
    if(this.isInvite){
      this.emailId=[];
      this.selectedroles=[];
      this.invite_product='Select Product';
     // this.application =[];
     // document.getElementsByTagName("form").namedItem("inviteform").reset();
      
    }
   
    if (this.isMyaccount) {
      this.userDetails();
     
    }
    this.getAllNotifications();

    if(this.isAlerts == true)
    {
      this.getAllAlertsActivities();
    }
  }

  getAllNotifications() {
    let userId =  localStorage.getItem("userName")
    this.tenantId=localStorage.getItem('tenantName');
    this.role=localStorage.getItem('userRole')
   this.notificationbody ={
      "tenantId":this.tenantId
   }
    this.profileservice.getNotifications(this.role,userId,this.notificationbody).subscribe(data => {
      this.notificationList = data
    })
  }
  getAllSuperAdminNotifications(){
    this.profileservice.getSuperadminNotifications().subscribe(data => {
      this.superadminnotificationList = data
    })
  }
  userDetails() {
    this.useremail = localStorage.getItem("userName");
    this.profileservice.getUserDetails(this.useremail).subscribe(data => {this.formOne = data     
      this.getAllDepartments()
      this. getAllStates();
      this.gatAllCities();
      this.isRefresh = !this.isRefresh;
      for (var i = 0; i < this.countryInfo.length; i++) {
        if (this.countryInfo[i].CountryName == this.formOne.country) {
          this.phnCountryCode = this.countryInfo[i].CountryCode
        
        }
      }
    })
   
  }
  loopTrackBy(index, term) {
    return index;
  }
  slideDown() {
    this.searchCoupon = '';
    this.searchsub='';
    this.searchpayment='';
    this.searchmode='';
    this.searchalert='';
    this.searchtemplate='';
    this.searchvault='';
    this.searchRole='';
    this.searchPermission='';
    this.searchUser='';
    this.searchDept='';
    this.searchvaultmng='';
    this.isSameDomain=false;
    this.userDetails();
    this.inviteAllRoles = '';
    
    this.invite_product="";
   
     //this.closeDeleteForm = false;
     this.selectedIndex = '';
     this.selectedalertdet = ''
     // this.emailId=[];
     // this.selectedroles=[];
     if(this.isInvite){
      this.myappName="";
       $("#excel").empty();
       this.invite_product="";
       $("#email").prop('disabled', false);
       $('.upload').prop('disabled', false);
       $("#product").prop('disabled', false);
       this.invitemultirole=false;
     document.getElementsByTagName("form").namedItem("inviteform").reset();
     }
     this.dataid = '';
     document.getElementById("foot").classList.add("slide-down");
     document.getElementById("foot").classList.remove("slide-up");
     if(this.staticTabs!=undefined){
      this.staticTabs.tabs[0].active = true;
     }
     
  }

 
  onChangeDepartment(selectedvalue) {
    // this.firstloginservice.getAllDepartments().subscribe(response => {
    //   this.departments = response;
    // });
    if (selectedvalue == "Others") {
      this.addDepartment = true;
    } else {
      this.addDepartment = false;
    }
  }

  // onChangeCountry(countryValue) {
  //   this.formOne.country = this.countryInfo[countryValue].CountryName;
  // }

  toggle() {
    this.show = !this.show;
  }

  updateAccount(form) {
    if (this.formOne.department == "Others") {

      this.formOne.department = this.otherdepartment;
    }
    let encrypt = this.spacialSymbolEncryption + this.cryptoService.encrypt(JSON.stringify(this.formOne));
    let reqObj = {"enc": encrypt};
    this.firstloginservice.updateUser(reqObj).subscribe(data => {
    this.notifier.show({
      type: "success",
      message: "Updated successfully!",
      id: "123"
    });
    this.addDepartment=false;
    this.getAllDepartments();
    this.userDetails();
    
    }, err => {
      this.notifier.show({
        type: "error",
        message: "Please try again!",
        id: "124"
      });
    });

  }
  // checkSuccessCallback(data:any){
  //   localStorage.setItem('formOne',JSON.stringify(this.formOne));
  // }

  selecteddata(data, index) {
    document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")
    this.subscribeddata = data;
   
    this.selectedIndex = index;
  }

  

  unsubscribeYes(index,template) {
    this.modalRef = this.modalService.show(template)
   
    
    document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")

  }
  unsubscribeNo(index) {
    this.selectedIndex = " ";
    
    document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")

  }

  unsubscribealertNo()
  {
    this.selectedalertdet= " ";
  }
  

  deletCard(data, index) {
  
    
    // this.closeFlag = true;
    // this.deletCardIndex = index;
    // document.getElementsByClassName("deletconfm")[index].classList.add("isdeletcard")
    // Swal.fire({
    //   title: 'Confirmation',
    //   // text: `Updated failed, Please try again.`,
    //   html: '<h4> Do you want to delete the selected card?</h4> ',
    //   type: 'warning',
    //   showCancelButton: true,
    //   allowOutsideClick: true,
    // }).then((result) => {
    //   if (result.value) {
        this.profileservice.deletePaymentMode(data.id).subscribe(data => { this.delData = data
          this.getAllPaymentmodes();
          this.notifier.show({
            type: "success",
            message: "Card deleted successfully"
          });
          document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")
        })
        // this.getAllPaymentmodes();
        
      // }
    // })
  }

  // deletCard(data, index) {
  //   this.closeFlag = true;
  //   this.deletCardIndex = index;
  //   document.getElementsByClassName("deletconfm")[index].classList.add("isdeletcard")
  // }
  // confrmDeleteCard(index) {

  //   this.profileservice.deletePaymentMode(index.id).subscribe(data => { this.delData = data })
  //   this.getAllPaymentmodes();


  // }
  cancelDeleteCard(index) {
    this.closeFlag = false;
       this.dataid = '';
    // document.getElementsByClassName("deletconfm")[index].classList.remove("isdeletcard")
  }

  defaultcardselect(data, index) {
    this.defaultcard = index;
    if (data.select == "Set Default") {
      data.select = "Default"
    } else {
      data.select = "Set Default"
    }
  }

  deletnotification(id) {
    this.dataid = id
  }
  canceldeleteNotification(index) {
    this.dataid = '';
  }

  subscriptiondata(data, index, template) {
    this.subscribeddata = data;
    this.modalRef = this.modalService.show(template)
    if(this.subscribeddata.subscriptionId==null||this.subscribeddata.subscriptionId==undefined){
      this.subscribeddata.subscriptionId="--"
    }
    
  }

  alertsdata(data,index,template)
  {
    this.configalertdata = data;
    this.modalRef = this.modalService.show(template)
  }


  selectedroledata(selRoleData, index, template){
    this.permidlist = [];
    this.roledata = selRoleData;
    this.selectedpermissions = selRoleData.permission;
    this.selectedpermissions.forEach(elementperm => {
       
      this.permidlist.push(elementperm.id)
      });
    this.selectedApp = selRoleData.appliationId.name;
    this.modalRef = this.modalService.show(template)
  }
  
  updateSelectedUserRole(selRoleData, index, template){
    this.userStatus = selRoleData.Status;
    // this.testArry = ['Admin', 'user', 'RPA Admin'];
    this.permidlist = [];
    this.roleListdata = selRoleData;
    this.testuserid=this.roleListdata.userId;
    this.testRolesList = this.roleListdata.roleIdname;
  
    this.selectedApp  = selRoleData.applicationIdname;
    this.department1 = this.roleListdata.department;
     
    this.modalRef = this.modalService.show(template)
  }


  selectedpermdata(selPermData, index, template){
    this.permdata = selPermData;

    this.selectedApp = selPermData.appliationId.name;
    this.modalRef = this.modalService.show(template)
  }
  selectedCoupondata(selCouponData, index, template){
this.isupdatecouponclicked=false;
       this.couponid=selCouponData.id
       this.couponduration=selCouponData.duration
       this.coupondurationInMonths=selCouponData.durationInMonths,
       this.couponname=selCouponData.name
       this.couponpercentOff=selCouponData.percentOff
       this.couponamountOff=selCouponData.amountOff
       this.couponmaxRedemptions=selCouponData.maxRedemptions

    this.coupondata=selCouponData;
    this.redeemdate = moment(selCouponData.expiresBy).format("YYYY-MM-DD")
 
    this.modalRef = this.modalService.show(template)
    if(selCouponData.amountOff != ' - ' && selCouponData.percentOff == ' - '){
      this.isPercentage=false;
        this.isAmount=true;
    }else {
      this.isPercentage=true;
        this.isAmount=false;
    }

  }
  infoModelSubmit(data) {
   
    localStorage.setItem("selectedproductId",data.name)
    this.modalRef.hide();
    this.slideDown();
    this.router.navigate(['/activation/payment/chooseplan']);
  }

  getinvoiceDate(createDate){
    return moment(createDate).add(1, 'months').format('MM/DD/YYYY')
   }


  invoicedownload(invoicedata) {
    this.invoiceid = invoicedata.invoiceId;
    this.profileservice.invoicedownload(this.invoiceid).subscribe(data => {
      const urlCreator = window.URL;
      const blob = new Blob([data], {
        type: 'application/pdf',
      });
      const url = urlCreator.createObjectURL(blob);
      const a: any = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = invoicedata.invoiceNumber + '.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
      // this.notifier.show({
      //   type: "success",
      //   message: "Downloading....",
      //   id: "123"
      // });
    }, err => {
      this.notifier.show({
        type: "error",
        message: "Download failed!",
        id: "123"
      });
    }
    )
  }

  getAllSubscrptions() {
   
      this.profileservice.listofinvoices().subscribe(response => { this.invoicedata = response.data 
     this.invoicedata.forEach(element => {
      this.tot.push(element.amount)
     });
       });
   
    this.profileservice.listofsubscriptions().subscribe(response => { 
      this.tableData = response 
      this.tableData.forEach(element => {
        if(element.name==='IAP-2.0'){
          element.name=element.name.substring(4);
      }  
    });
  });
}

  getAllInvoices() {
    this.profileservice.listofinvoices().subscribe(response => { this.invoicedata = response.data });
  }

  onKeydown(event) {
    let numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace","Tab"]
    let temp = numArray.includes(event.key); //gives true or false
    if (!temp) {
      event.preventDefault();
    }
  }

  getAllStates() {
    // this.formOne.country = this.countryInfo[countryValue].CountryName;
    for (var i = 0; i < this.countryInfo.length; i++) {
      if (this.countryInfo[i].CountryName == this.formOne.country) {
        this.stateInfo = this.countryInfo[i].States;
      }
    }
  }
  gatAllCities() {
    for (var i = 0; i < this.stateInfo.length; i++) {
      if (this.stateInfo[i].StateName == this.formOne.state) {
        this.cityInfo = this.stateInfo[i].Cities;
      }
    }
  }

  onChangeCountry(countryValue) {
    this.isRefresh = !this.isRefresh;
    // this.formOne.country = this.countryInfo[countryValue].CountryName;
    for (var i = 0; i < this.countryInfo.length; i++) {
      if (this.countryInfo[i].CountryName == countryValue) {
        this.phnCountryCode = this.countryInfo[i].CountryCode
        this.stateInfo = this.countryInfo[i].States;
      }
    }
  }
  onChangeState(stateValue) {
    for (var i = 0; i < this.stateInfo.length; i++) {
      if (this.stateInfo[i].StateName == stateValue) {
        this.cityInfo = this.stateInfo[i].Cities;
      }
    }
  }

  lettersOnly(event): boolean {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
  }
    onselectInvoiceTab(event){
      this.getAllInvoices(); 
    }
    onselectSubscrptionTab(){
      this.getAllSubscrptions();
      this.selectedIndex= " ";
    }
    onselectPaymentModeTab(){
     this.getAllPaymentmodes();
    }
    getAllDepartments(){
      this.profileservice.getDepartments().subscribe(resp => {
        this.departments = resp
      })
    }

    addPaymentCards(template){
      this.modalRef = this.modalService.show(template,this.config)
    }

    addAlert(template){
      this.isPushNotificationcheckBoxValue=true
      this.isEmailcheckBoxValue=false
      this.isSMScheckBoxValue=false
      this.isIncidentcheckBoxValue=false
      this.activitieslist=[];
      this.modalRef = this.modalService.show(template,this.config)
    }
    addVault(template){
      this.mypages=[];
      this.modulesList=[];
     this.myfields=[];
      this.modalRef = this.modalService.show(template,this.config)
    } 
    addTemplate(template){
      this.modalRef = this.modalService.show(template,this.config)
    }
    alertsdeletedata(data,index){
      this.selectedalertdet=index

  }
  updateselecttedalertdata(data,index,template){ 
    
    // console.log(data)   
    // if(data.app_name=="2.0"){
      this.onChange(2)
    // }
    this.alertslistactivitiesdata=data;
     
     this.updateApplication=data.app_name
     this.updateType=data.type
     this.updateActivities=data.activity_name
     this.updateMail=data.mail_to
     this.updatetext_to=data.text_to
     this.updateIncident=data.incident_type
     this.updatetemp = data.email_template
    let channelsplit=data.channel.split(',')
   
    channelsplit.forEach(channelname => {
     
      if(channelname&&channelname=='Notification')
      {
        this.isPushNotificationcheckBoxValue=true;
      }
      if(channelname&&channelname==' Email')
      {
        this.isEmailcheckBoxValue=true;
      }
      if(channelname&&channelname=='Email')
      {
        this.isEmailcheckBoxValue=true;
      }
      if(channelname&&channelname==' SMS')
      {
        this.isSMScheckBoxValue=true;
      }
      if(channelname&&channelname=='SMS')
      {
        this.isSMScheckBoxValue=true;
      }
      if(channelname&&channelname==' Incident')
      {
        this.isIncidentcheckBoxValue=true;
      }
      if(channelname&&channelname=='Incident')
      {
        this.isIncidentcheckBoxValue=true;
      }
    });
    
    this.modalRef = this.modalService.show(template)
  }
  updateAlertCancel()
  {
    // this.isSMScheckBoxValue=false;
    // this.isPushNotificationcheckBoxValue=false;
    // this.isSMScheckBoxValue=false;
    this.modalRef.hide();
    this.getAllAlertsActivities();
  }
  updateUserRoleCancel(){
    this.modalRef.hide();
  }
  modifyalert(alertslistactivitiesdata){
    this.useremail=localStorage.getItem('userName');
    let alertconfiguration=''
   
      if(this.isPushNotificationcheckBoxValue==true)
      {
        alertconfiguration+='Notification'
        alertconfiguration+=', '
        
      }
      if(this.isEmailcheckBoxValue==true)
      {
        alertconfiguration+='Email'
        alertconfiguration+=', '
      }
      if(this.isSMScheckBoxValue==true)
      {
        alertconfiguration+='SMS'
        alertconfiguration+=', '
      }
      if(this.isIncidentcheckBoxValue==true)
      {
        alertconfiguration+='Incident'
        alertconfiguration+=', '
      }
      if(this.isEmailcheckBoxValue==false)
      {
        this.updateMail=null
      } 
      if(this.isSMScheckBoxValue==false)
      {
        this.updatetext_to=null
      }
      if(this.isIncidentcheckBoxValue==false)
      {
        this.updateIncident=null
      }
    
      var notificationby = alertconfiguration.substring(0, alertconfiguration.length-2);
    
        this.alertmodifybody = {
          "id": alertslistactivitiesdata.id,
          "app_name": this.updateApplication,
          "type": this.updateType,
          "activity_name": this.updateActivities,
          "channel": notificationby,
          "mail_to":  this.updateMail,
          "text_to": this.updatetext_to,
          "incident_type": this.updateIncident,
          "email_template":this.updatetemp
          
      }
     
        this.profileservice.modifyAlert(this.alertmodifybody,this.useremail).subscribe(resp=>{
          this.notifier.show({
            type: "success",
            message: "Alert updated successfully"
          });
        this.modalRef.hide();
        this.getAllAlertsActivities();
       //  this.configurealertform.reset();
          }, err => {
            this.notifier.show({
              type: "error",
              message: "Failed to update alert"
            });
          });
    }
    alertDelYes(data,index){
        this.profileservice.deleteAlert(data).subscribe(resp=>{
          // console.log(resp)
          this.getAllAlertsActivities();
          // let type='success';
          // let message='Alert deleted successfully!'
          // this.notifier.notify(type,message,data);
          this.notifier.show({
            type: "success",
            message: "Alert deleted successfully"
          });
          this.selectedalertdet= " ";
        //   Swal.fire({
        //     title: 'Success!',
        //     text: `Alert deleted successfully.`,
        //     type: 'success',
        //     showCancelButton: false,
        //     allowOutsideClick: true
        //   }) 
        // },err => {
          },err=>{
            this.getAllAlertsActivities();
          });
         this.getAllAlertsActivities();
    }
    subscriptionCancelModalSubmit(template)
  {
    this.profileservice.cancelSubscription(this.subscribeddata).subscribe(data => {
      this.getAllSubscrptions();
      this.modalRef.hide();
      this.router.navigate(['/activation/payment/chooseplan']);
         if(data==null){
      this.notifier.show({
        type: "success",
        message: "Subscription cancelled successfully!"
      });
    }
    else if(data.message=='Cancellation Abrupted!!'){
      this.notifier.show({
        type: "error",
        message: "Subscription cancelled in progress!"
      });
    }
    }, err => {
    });
   // this.unsubscribeYes(this.selectedIndex,template);
  }
  changePlanCancel()
  {
    this.modalRef.hide();
    this.getAllSubscrptions();
  }
  CancelSubform()
  {
    this.modalRef.hide();
    this.getAllSubscrptions();
    
  }

    addrole(template){
      this.modalRef = this.modalService.show(template,this.config)
    }
    adddept(template){
      this.modalRef = this.modalService.show(template, this.config)
    }
    addpermission(template){
      this.modalRef = this.modalService.show(template,this.config)
    }

    createCoupon(createCoupon){
      this.modalRef = this.modalService.show(createCoupon,this.config)
    }
    createSecret(createSecret){
      this.modalRef = this.modalService.show(createSecret,this.config)
    }
    
    addSecret(){
      this.secretes.push({
        id: this.secretes.length + 1,
        key: '',
        value: ''
        
      });
    }
    removeSecrete(i : number){
      this.secretes.splice(i, 1);
    }
    cancelAddRole(){
      this.modalRef.hide();
      this.roleName = "";
      this.roleDescription = "";
      this.selectedpermidlist = [];
      this.selectedApplication = "";
      this.addRolePermissionsList = '';
    }
    cancelAddPermission(){
      this.modalRef.hide();
    }
    cancelCreateCopon(){
      this.modalRef.hide();
    }
    cancelAddSecrete(){
      this.modalRef.hide();
      
    }

   
    cancelAddCard(){
      this.modalRef.hide();
      this.cardModel={}
    }

    onChangeCardType(cardNumber) {
      var creditCardType = require("credit-card-type"); 
      this.cards = creditCardType(cardNumber);
     if(this.cards.length=1){
      this.cardType=this.cards[0].type;
     }
    }
    
    addNewCard(){
      this.cardDetails={
          "name":this.cardModel.cardHoldername,
          "number":this.cardModel.cardNumber,
          "exp_month":this.cardModel.cardmonth,
          "exp_year":this.cardModel.cardyear,
          "cvc":this.cardModel.cvvNumber
        }
        let encrypt = this.spacialSymbolEncryption + this.cryptoService.encrypt(JSON.stringify(this.cardDetails));
        let reqObj = {"enc": encrypt};
      this.productlistservice.getMyAccountPaymentToken(reqObj).subscribe(res=>{
        this.paymentToken=res;
        if(this.paymentToken.errorMessage==="Failed to generate payment token"){
          this.notifier.show({
            type: "error",
            message: "Please enter valid card details"
          });
        }
        if(this.paymentToken.message==="Card already exists"){
          this.notifier.show({
            type: "error",
            message: "Card already exists."
          });
          this.modalRef.hide();
        } 
        else {
          
      
      this.profileservice.addNewCard(this.paymentToken.message,this.isdefault).subscribe(res=>{
          // console.log('res',res);
          this.getAllPaymentmodes();
          if(res===null){
            this.notifier.show({
              type: "success",
              message: "Card added successfully!"
            });
            this.modalRef.hide();
            this.cardModel={};


          }
          if(res.errorMessage==="Failed to create payment method"){
            this.notifier.show({
              type: "error",
              message: "Failed to add card."
            });
            this.modalRef.hide();
            this.cardModel={};
          }

      })
    }
      }),err=>{
        this.notifier.show({
          type: "error",
          message: "Please enter valid card details"
        });
      }
  
      // this.profileservice.addNewCard(token).subscribe(res=>{})
      // api call
     // this.cardModel={}
    }
/**alert */
cancelAlert(){
  this.modalRef.hide();
  this.alertModel={}
}
cancelVaultconfig(){
  this.modalRef.hide();
 
}
    setAsDefaultCard(selectedCardData){
      const cardId=selectedCardData.id
      Swal.fire({
        title: 'Confirmation',
        // text: `Updated failed, Please try again.`,
        html: '<h4> Do you want to set this card as default?</h4> ',
        type: 'warning',
        showCancelButton: true,
        allowOutsideClick: true,
      }).then((result) => {
        if (result.value) {
          this.profileservice.setasDefaultCard(cardId).subscribe(res=>{
         
            Swal.fire({
              title: 'Success',
              text: "Default card is set successfully.",
              // Default card is set successfully!!
              type: 'success',
              showCancelButton: false,
              allowOutsideClick: true
            })
            this.getAllPaymentmodes(); 
          },err=>{
            Swal.fire({
              title: 'Error!',
              text: 'Please try again.',
              type: 'error',
              showCancelButton: false,
              allowOutsideClick: true
            })
          })
          // this.getAllPaymentmodes();
        }
      })
      
    }
    onChangeRole(selectedvalue) {
         this.allRoles.forEach(elementrole => {
        if(elementrole.name==selectedvalue)
        {
         this.myroleId=elementrole.id;
        }
      });
    }
    onChangeApp(selectedvalue) {
     this.apps.forEach(elementrole => {
     if(elementrole.name==selectedvalue)
     {
      this.myappId=elementrole.id;
      this.myappName = elementrole.name;
     }
   });
 }
 myemailFunction()
 {
   this.isSameDomain = false;
   this.emailRequired = false;
  $("#excel").empty();
  this.selectedFile=null;
  $("#email").on("input", function(){
    // Print entered value in a div box
    $('.upload').prop('disabled', true);
    var el = document.getElementById('email'); 
    el.addEventListener('keydown', function(event) { 
      // Checking for Backspace. 
      if (event.keyCode == 8) { 
          //alert('Backspace is Pressed!'); 
          $('.upload').prop('disabled', false);
      }  
      if (event.keyCode == 46) { 
        $('.upload').prop('disabled', false);
    } 
  });
});
 }
    inviteUser(userId,inviteeId,form){
      this.isSameDomain = false;
       let stringToSplit = localStorage.getItem("userName");
       let x = stringToSplit.split("@");
             this.domain = x[1];
            var inviteeList = [];
           
            if((inviteeId == undefined || inviteeId == null) && this.selectedFile == undefined){
              this.emailRequired = true;
              return
            }
            if(this.upload_excel == null && inviteeId !== undefined){
             inviteeList = inviteeId.split(",");
          
             for(var i = 0; i<inviteeList.length; i++){
      
              //         if(inviteeList[i].endsWith('@gmail.com') ||inviteeList[i].endsWith('@yahoo.com') || 
              //         inviteeList[i].endsWith('@hotmail.com') || inviteeList[i].endsWith('@rediffmail.com')){
              //        this.ispublicMail=true;
              //        return
                
                     if(!(inviteeList[i].endsWith(this.domain))){
                     
                    this.isSameDomain = true;
                     return
                    }
                      
             
            }
      // console.log("fksdjflkasd", inviteeList);
      
             }  
   
      const payload = new FormData();

      if(this.selectedFile==undefined){
     
       // const payload = new FormData();
        //payload.append('inviterMailId', userId);
        payload.append('inviteeMailId', inviteeId);
        payload.append('userRoles', this.selectedroles);
       // console.log("payload",payload)
      }
      else
      {
      
        this.emailRequired = false;
        //payload.append('inviterMailId', userId);
        this.myappName="2.0"
        payload.append('file', this.selectedFile, this.selectedFile.name);
        //payload.append('userRoles', this.selectedroles);
       // console.log("payload",payload)
      }

  
    
   this.profileservice.restrictUserInvite(this.myappName).subscribe(invres=>{
    if(invres.message == "No user allowed for the product"){
    Swal.fire({
      title: 'Warning',
      text: "No subscriptions found for the product!",
      type: 'error',
      showCancelButton: false,
      allowOutsideClick: true
    })
    this.inviteAllRoles = '';
  
  }
  if(invres.message == "No user allowed for the product"){
    Swal.fire({
      title: 'Warning',
      text: "No subscriptions found for the product!",
      type: 'error',
      showCancelButton: false,
      allowOutsideClick: true
    })
    this.inviteAllRoles = '';
  
  }
  else if(invres.allowedUsers){
    payload.append('allowedUserCount', invres.allowedUsers)
    this.profileservice.inviteUser(userId,payload).subscribe(res=>{
      this.data=res
      if(this.data.body.message == "Invite Mail sent successfully"){
      Swal.fire({
        title: 'Success',
        text: "Invite mail sent successfully!",
        type: 'success',
        showCancelButton: false,
        allowOutsideClick: true
      })
    this.inviteAllRoles = '';

      this.upload_excel=""
      this.myappName=""
      this.selectedFile=null
      $("#excel").empty();
      $('.upload').prop('disabled', false);
      $("#email").prop('disabled', false);
      $("#product").prop('disabled', false);
      this.invitemultirole=false;
    }
      else if(this.data.body.errorMessage == "Failed to read content of the upload file"){
        Swal.fire({
          title: 'Error',
          text:this.data.body.errorMessage,
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })
    this.inviteAllRoles = '';

        this.upload_excel=""
        this.selectedFile=null
        this.myappName=""
        $("#excel").empty();
        $('.upload').prop('disabled', false);
        $("#email").prop('disabled', false);
        $("#product").prop('disabled', false);
        this.invitemultirole=false;
    }else if(this.data.body.errorMessage == "Uploaded file is empty/incorrect. Please verify the data entered in file"){
        Swal.fire({
          title: 'Error',
          text:this.data.body.errorMessage,
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })
    this.inviteAllRoles = '';

        this.upload_excel=""
        this.selectedFile=null
        this.myappName=""
        $("#excel").empty();
        $('.upload').prop('disabled', false);
        $("#email").prop('disabled', false);
        $("#product").prop('disabled', false);
        this.invitemultirole=false;
    }
    else if(this.data.body.errorMessage == "Uploaded file is not supported"){
      Swal.fire({
        title: 'Error',
        text:this.data.body.errorMessage,
        type: 'error',
        showCancelButton: false,
        allowOutsideClick: true
      })
    this.inviteAllRoles = '';

      this.upload_excel=""
      this.myappName=""
      this.selectedFile=null
      $("#excel").empty();
      $('.upload').prop('disabled', false);
      $("#email").prop('disabled', false);
      $("#product").prop('disabled', false);
      this.invitemultirole=false;
    }
    else if(this.data.body.errorMessage == "Inviter not present"){
      Swal.fire({
        title: 'Error',
        text:this.data.body.errorMessage,
        type: 'error',
        showCancelButton: false,
        allowOutsideClick: true
      })
    this.inviteAllRoles = '';

      this.upload_excel=""
      this.myappName=""
      this.selectedFile=null
      $("#excel").empty();
      $('.upload').prop('disabled', false);
      $("#email").prop('disabled', false);
      $("#product").prop('disabled', false);
      this.invitemultirole=false;
    }else if(this.data.body.errorMessage == "Inviter tenant not present"){
      Swal.fire({
        title: 'Warning',
        text: this.data.body.errorMessage,
        type: 'warning',
        showCancelButton: false,
        allowOutsideClick: true
      })
    this.inviteAllRoles = '';

      this.upload_excel=""
      this.myappName=""
      this.selectedFile=null
      $("#excel").empty();
      $('.upload').prop('disabled', false);
      $("#email").prop('disabled', false);
      $("#product").prop('disabled', false);
      this.invitemultirole=false;
    }else if(this.data.body.message === "Invitee already exists"){
      Swal.fire({
        title: 'Warning',
        text: this.data.body.message,
        type: 'warning',
        showCancelButton: false,
        allowOutsideClick: true
      })
    this.inviteAllRoles = '';

      this.upload_excel=""
      this.myappName=""
      this.selectedFile=null
      this.myappName=""
      $("#excel").empty();
      $('.upload').prop('disabled', false);
      $("#email").prop('disabled', false);
      $("#product").prop('disabled', false);
      this.invitemultirole=false;
    }else if(this.data.body.message === "You are trying to invite invalid Domain/Product. Please verify the file and re upload with valid data."){
      Swal.fire({
        title: 'Warning',
        text: "You are trying to invite invalid Domain/Product!",
        type: 'warning',
        showCancelButton: false,
        allowOutsideClick: true
      })
    this.inviteAllRoles = '';

      this.upload_excel=""
      this.myappName=""
      this.selectedFile=null
      this.myappName=""
      $("#excel").empty();
      $('.upload').prop('disabled', false);
      $("#email").prop('disabled', false);
      $("#product").prop('disabled', false);
      this.invitemultirole=false;
    }else if(this.data.body.message === "Only few users are invited, please upgrade plan to invite others"){
      Swal.fire({
        title: 'Warning',
        text: this.data.body.message,
        type: 'warning',
        showCancelButton: false,
        allowOutsideClick: true
      })
    this.inviteAllRoles = '';

      this.upload_excel=""
      this.myappName=""
      this.selectedFile=null
      this.myappName=""
      $("#excel").empty();
      $('.upload').prop('disabled', false);
      $("#email").prop('disabled', false);
      $("#product").prop('disabled', false);
      this.invitemultirole=false;
    }
    else{
      Swal.fire({
        title: 'Error',
        text: this.data.body.message,
        type: 'error',
        showCancelButton: false,
        allowOutsideClick: true
      })
    this.inviteAllRoles = '';

      this.upload_excel=""
      this.myappName=""
      this.selectedFile=null
      $("#excel").empty();
      $('.upload').prop('disabled', false);
      $("#email").prop('disabled', false);
      $("#product").prop('disabled', false);
      this.invitemultirole=false;
    }
    },err=>{

      Swal.fire({
        title: 'Error',
        text: `Unable to send invitation link !!`,
        type: 'error',
        showCancelButton: false,
        allowOutsideClick: true
      })
    this.inviteAllRoles = '';

      this.upload_excel=""
      this.myappName=""
      this.selectedFile=null
      $("#excel").empty();
      $('.upload').prop('disabled', false);
      $("#email").prop('disabled', false);
      $("#product").prop('disabled', false);
      this.invitemultirole=false;
    })
  }else{
    Swal.fire({
      title: 'Error',
      text: "Inivation not sent due to technical issue.",
      type: 'error',
      showCancelButton: false,
      allowOutsideClick: true
    })
    this.inviteAllRoles = '';

    this.upload_excel=""
    this.myappName=""
    this.selectedFile=null
    $("#excel").empty();
    $('.upload').prop('disabled', false);
    $("#email").prop('disabled', false);
    $("#product").prop('disabled', false);
    this.invitemultirole=false;
  }
  },err=>{

    Swal.fire({
      title: 'Error',
      text: `Inivation not sent due to technical issue.`,
      type: 'error',
      showCancelButton: false,
      allowOutsideClick: true
    })
    this.inviteAllRoles = '';

    this.upload_excel=""
    this.myappName=""
      this.selectedFile=null
      $("#excel").empty();
      $('.upload').prop('disabled', false);
      $("#email").prop('disabled', false);
      $("#product").prop('disabled', false);
      this.invitemultirole=false;
  })
    //   let body = [];
    //   this.selectedroles.forEach(roleid => {
    //     let obj = {
    //       "id" : roleid,
    //       "appliationId" : {
    //         "appId" : this.myappId
    //       }
    //     }
    //     body.push(obj);
     
    // });
    // console.log("invite input ",body)
    // let  body = {
    //     "id": this.myroleId,
    //     "appliationId": {
    //     "appId": this.myappId
    //     }}
       
    form.resetForm();
 
    }
//create secrets
createNewSecret(form:NgForm){
             
            this.secretes.forEach(element => {
                    this.mydata[element.key] = element.value
              });  
      let input={
      "options": {
        "cas": 0
      },
      
      "data": this.mydata
    }

 this.profileservice.creatSecret(input,this.secretkeyname).subscribe(resp=>{this.data=resp
  this.getAllKeys();
  this.modalRef.hide();
    this.notifier.show({
      type: "success",
     
      message: "Created Succesfully!"
    });
      
        });
form.resetForm();
   
}
 

  
    myFunction(role) { 
      this.isOpened = role.id;
      // console.log(role);
      }
      
      hideroleslist(index){
      this.isOpened=''
      }

      numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 6 && (charCode < 2 || charCode >57)) {
          return false;
        }
        return true;
      }

      roleDelYes(role,index){
          this.profileservice.deleteRole(role).subscribe(response => {
          this.getRoles();
          Swal.fire({
            title: 'Success',
            text: `Role deleted successfully!`,
            type: 'success',
            showCancelButton: false,
            allowOutsideClick: true
          }) 
          }, err => {
          });
          document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")
    

}
deleteUserYes(user,index){
 
  this.selectedIndex = '';
  this.profileservice.deleteSelectedUser(user).subscribe(resp =>{

    this.getAllUsersList();

    Swal.fire({
      title: 'Success',
      text: resp.message,
      type: 'success',
      showCancelButton: false,
      allowOutsideClick: true
    })


    

  }, err =>{

    Swal.fire({
      title: 'Error',
      text: `User Not Found`,
      type: 'error',
      showCancelButton: false,
      allowOutsideClick: true
    })


  })
  


}

permDelYes(permission,index){
  this.profileservice.deletePermission(permission).subscribe(response => {
    this.getAllPermissions();
    this.notifier.show({
      type: "success",
      message: "Deleted successfully!"
    });
 
  }, err => {
  });
  this.selectedIndex = " ";
  document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")


}
couponDelYes(coupon,index){
  this.profileservice.deleteCoupon(coupon).subscribe(resp=>{
    this.getListofCoupons();
      this.notifier.show({
      type: "success",
      message: "Coupon deleted successfully!!"
    });
    

  },err => {
  });
  document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")

}


  getRoles(){
  if(localStorage.getItem('userRole')!=null && localStorage.getItem('userRole').includes('Platform Admin')){
   this.profileservice.getAllRolesForSuperAdmin().subscribe(resp => {
   this.allRoles = resp.sort(function(obj1, obj2) {
      return obj1.id - obj2.id;
  });

   this.allRoles.forEach(elementRoles => {
       
   this.listOfroles.push(elementRoles.name)
   });
                
   })
   }else {
     this.profileservice.getAllRoles(2).subscribe(resp => {
            this.allRoles = resp;
          
            this.allRoles.forEach(elementRoles => {
                  
            this.listOfroles.push(elementRoles.name)
            });
                
          })
      
       }
      }
        roledel(data,index){
              document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")
             }
             paymodedel(data,index){
              this.selectedIndex = index;
              document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")
             }
             userDel(data,index){
              this.selectedIndex = index;
              document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")

             }

             permdel(data,index){
              this.selectedIndex = index;
              document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")
             }
             couponDel(data,index){
              document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")

             }

      // onItemSelect(item: any) {
      //         console.log(item);
      // }
      // onSelectAll(items: any) {
      //      console.log(items);
      // }
      
      getAllPermissions() {
        
        this.profileservice.getAllPermissions().subscribe(data => {
          this.permissionsList = data;
       
        })
      }

      permissionsByapp(id){
        this.profileservice.getPermissionsByAppID(id).subscribe(data => {
          this.addRolePermissionsList = data;
         

          
        })
      }

      modifyUserRole(resp){
        this.searchUser = '';
        this.selectedRolesArry = [];
        let arr = [];
      
        this.status = this.userStatus;

        arr = this.testRolesList;
       
        for(var i = 0; i< arr.length; i++){
          for(var j = 0; j<this.allRoles.length; j++){
            if(arr[i] == this.allRoles[j].name){
              this.selectedRolesArry.push(this.allRoles[j].id)
            }
          }
          
        }
        let body = {
          "userId":resp.userId,
       "appId":this.allRoles[0].appliationId.id,
       "appName":resp.applicationIdname,
       "rolesList":this.selectedRolesArry,
       "status": this.status,
       "department":this.department1
       }
       
       this.profileservice.modifyUserRole(body).subscribe(resp => {

        this.modalRef.hide();
        this.getAllUsersList();
        Swal.fire({ 
          title: 'Success',
          text: `Updated successfully !!`,
          type: 'success',
          showCancelButton: false,
          allowOutsideClick: true
        })
      
        
       },err=>{

        Swal.fire({
          title: 'Error',
          text: `Unable to update the role !!`,
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })

      })
        
        
      }
      modifyrole(rolesdata){
       for(var i=0;i<this.applications.length;i++){
         if(this.applications[i].name == this.selectedApp ){
           this.selectedApp = this.applications[i].id
         }
       }
        let rolesbody = {"id":rolesdata.id,  
        "name": rolesdata.name,
          "description":rolesdata.description,
          "displayName":rolesdata.name,
          "appliationId":{
             "id":this.selectedApp
          
       },
          "permissionId":  this.permidlist
       
       }
   
       this.profileservice.modifyRole(rolesbody).subscribe(modifyresp => {
        this.modalRef.hide();
        this.getRoles();
        Swal.fire({
          title: 'Success',
          text: `Role updated successfully!`,
          type: 'success',
          showCancelButton: false,
          allowOutsideClick: true
        }) 
      })
      
    }

    modifyperm(permdata){
      for(var i=0;i<this.applications.length;i++){
        if(this.applications[i].name == this.selectedApp ){
          this.selectedApp = this.applications[i].id
        }
      }
       let permbody = {
        "id" :permdata.id,
        "permissionName": permdata.permissionName,
        "description": permdata.description,
        "appliationId":{
        "id":this.selectedApp}
      }
  
      this.profileservice.modifyPermission(permbody).subscribe(permmodifyresp => {
       this.modalRef.hide();
       this.getAllPermissions();
       if(permmodifyresp.message==="Permission already exist with given name"){
        this.notifier.show({
          type: "error",
          message: "Permission already exists with given name!"
        });
       }else{
       this.notifier.show({
        type: "success",
        message: "Updated successfully!"
      });
      }
     })
     
   }

    modifycoupon(couponData){
      this.isupdatecouponclicked=true;
 // this.close_modal();

      if(this.isPercentage){
        couponData.percentOff = this.couponpercentOff
        couponData.amountOff = null
      }else if(this.isAmount){
        couponData.percentOff = null
        couponData.amountOff = this.couponamountOff
      }
      let modifycouponinput = {
        "currency": "usd",
         "couponid":this.couponid,
        "duration":this.couponduration,
        "durationInMonth":this.coupondurationInMonths,
        "name": this.couponname,
        "percent_off": couponData.percentOff,
        "amount_off":couponData.amountOff,
        "redeem_by": moment(this.redeemdate, "YYYY-M-DTH:mm").valueOf()/1000,
        "redmee_times": this.couponmaxRedemptions
      }
      
this.profileservice.modifyCoupon(modifycouponinput).subscribe(resp=>{
  this.modalRef.hide();
  this.getListofCoupons();
  this.notifier.show({
    type: "success",
    message: "Coupon updated successfully!!"
  });
 
})

    }
    createNewRole(){

      let addRoleBody = {  
      "name":this.roleName,
      "description":this.roleDescription,
      "displayName":this.roleName,
      "appliationId":{
         "id": this.selectedApplication
      
   },
      "permissionId": this.selectedpermidlist
   }

   this.profileservice.createRole(addRoleBody).subscribe(modifyresp => {
     this.roleresp=modifyresp;
    this.modalRef.hide();
    this.getRoles();
    if(this.roleresp.message!='Role already exists'){
      Swal.fire({
        title: 'Success',
        text: `Role created successfully!`,
        type: 'success',
        showCancelButton: false,
        allowOutsideClick: true
      }) 
    }
    else
    {
      Swal.fire({
        title: 'Error',
        text: `Role already exists!`,
        type: 'info',
        showCancelButton: false,
        allowOutsideClick: true
      }) 

    }
    
  })
  this.roleName = "";
  this.roleDescription = "";
  this.selectedpermidlist = [];
  this.selectedApplication = "";
  
    }

    createNewPermission(){

      let addpermission = {
        "permissionName": this.permName,
        "description": this.permissionDescription,
        "appliationId":{
        "id":this.selectedApplication
         }
        }
    
      this.profileservice.createPermission(addpermission).subscribe(createpermresp => {
        this.modalRef.hide();
        this.getAllPermissions();
        this.notifier.show({
          type: "success",
          message: "Saved successfully!"
        });
      })
      this.permName = "";
      this.permissionDescription = "";
      this.selectedApplication = "";
    }
    onChangeRadio(value){
      if(value=='percentageOff'){
        this.isPercentage=true;
        this.isAmount=false;
      }
      else{
        this.isAmount=true;
        this.isPercentage=false;
      }
    
  
    }
    onSelected(value){
      
      if(value!=null ){
       this.islimited=true;
  this.isReedemBy=true;
      }
  //     else{
  //       this.isReedemTimes=true;
  //     }
    }
   
    createNewCoupon(form:NgForm){
     
      this.datetimeinput = moment(this.datetime, "YYYY-M-DTH:mm").valueOf()
       this.couponDetails={
        couponNamename:this.couponNamename,
        couponIdId:this.couponIdId,
        durationTime:this.durationTime,
        percentageOffTot:this.percentageOffTot,
        amountOff:this.amountOff,
        redeemTimeslimit:this.redeemTimeslimit
          }         
        
          if(this.percentageOffTot!=null){
            this.amountOff=0;
          }
          else {
            this.percentageOffTot=0
                      }
                      
         
      let inputamount={
         "currency": "usd",
         "couponid":this.couponIdId,
        "duration": this.durationTime,
        "durationInMonth":this.durationInMonths,
        "name": this.couponNamename,
        "percent_off": this.percentageOffTot,
        "amount_off":this.amountOff,
        "redeem_by": (this.datetimeinput/1000)+86399,
        "redmee_times": this.redeemTimeslimit
      }
    //   let input= {"currency":"usd",
    //   "couponid":this.couponIdId,
    //   "duration":this.durationTime,
    //   "name":this.couponNamename,
    //   "amount_off":this.amountOff,
    //   "redeem_by":1602050743,
    //   "redmee_times":3
    // }
   
      this.profileservice.createCoupon(inputamount).subscribe(resp=>{this.data=resp
        this.modalRef.hide();
        if(resp.message==="Coupon Code already exists"){
          this.notifier.show({
            type: "error",
            message: "Please try again with another Coupon ID"
          });
        }else{
        this.notifier.show({
          type: "success",
          message: "created coupon successfully!!"
        });}
           this.getListofCoupons();
            });

            
          //  form.resetForm();
    }
    /** alerts */
    saveConfig(form:NgForm) {
      this.tenantId=localStorage.getItem('tenantName');
      this.useremail=localStorage.getItem('userName');
     

      let alertconfiguration=''
      if(this.isPushNotificationcheckBoxValue==true)
      {
        alertconfiguration+='Notification'
        alertconfiguration+=', '
        
      }
      if(this.isEmailcheckBoxValue==true)
      {
        alertconfiguration+='Email'
        alertconfiguration+=', '
      }
      if(this.isSMScheckBoxValue==true)
      {
        alertconfiguration+='SMS'
        alertconfiguration+=', '
      }
      if(this.isIncidentcheckBoxValue==true)
      {
        alertconfiguration+='Incident'
        alertconfiguration+=', '
      }
      if(this.isEmailcheckBoxValue==false)
      {
        this.emailselected=null
      } 
      if(this.isSMScheckBoxValue==false)
      {
        this.smsselected=null
      }
      if(this.isIncidentcheckBoxValue==false)
      {
        this.incidentselected=null
      }
     var notificationby = alertconfiguration.substring(0, alertconfiguration.length-2);
           this.alertsbody ={
          "activity_names" : this.alertsactivities,
          "app_name": this.applicationames,
          "channel": notificationby,
          "incident_type": this.incidentselected,
          "mail_to": this.emailselected,
          "tenant_id": this.tenantId,
          "text_to": this.smsselected,
          "type": this.selectedtype,
          "email_template": this.emailtemplate
        }
    
               this.profileservice.saveConfig(this.alertsbody).subscribe(res =>  {
            this.notifier.show({
              type: "success",
              message: "Alert saved successfully"
            });
      //       this.alertsapplication="";
      // this.alertsactivities=[];
      // this.selectedtype="";
      // this.isEmailcheckBoxValue=false;
      // this.isSMScheckBoxValue=false;
      // this.isPushNotificationcheckBoxValue=false;
      // this.isIncidentcheckBoxValue=false;
      // this.smsselected="";
      // this.emailselected="";
      // this.incidentselected="";
           this.modalRef.hide();
           this.getAllAlertsActivities();
         //  this.configurealertform.reset();
            }, err => {
              this.notifier.show({
                type: "error",
                message: "Failed to save alert"
              });
            });
            form.resetForm();
      }

      getAllAlertsActivities() {
        this.alertslistactivitiesdata=[]
  this.tenantId=localStorage.getItem('tenantName');
  this.alertuserroles=localStorage.getItem('userRole');
   this.profileservice.listofactivities(this.tenantId,this.alertuserroles).subscribe(alertresponse => {
      this.alertslistactivitiesdata = alertresponse
         });
  }

      saveClick(item,e){
     
      }
      onChange(product){
     // console.log("application",this.application)
    
       this.profileservice.alertsConfig(product).subscribe(res => this.successCallback(res))
        this.application.forEach(element => {
          if(element.id==product){
            //console.log("element",element)
            this.applicationames=element.displayName
            //console.log("Activities fjdbfdsfbd",this.alertsactivities);
          }
          
        });
      

   
      }
      successCallback(data) {
       // console.log("data",JSON.parse(data))
       this.activitieslist = data
              data.forEach(element => {
          if(element.userSelected)
          this.selectValue.push(element.notification_id)      
        });
      }
      onChangeprod(pro){
        this.selectedproduct=pro;
        this.modulesList=[];
        this.profileservice.getmodulesbyProduct(pro).subscribe(data => 
          {
           
            data.forEach(element => {

              this.modulesList.push(element.module)
            });
           
            
          })
   
      }
      changeModule(module){
        this.selectedmodule=module;
      
        var input={
             "module": module,
             "product": this.selectedproduct
         
        }
        this.profileservice.getpagesfromModule(input).subscribe(resp =>{
          this.mypages=[];
          resp.forEach(element => {
            this.mypages.push(element.page)
            
          });
       
        })

      }
      changePage(page){
        this.selectedPage=page;
        
        var input={
          "module": this.selectedmodule,
          "page":page,
          "product": this.selectedproduct
      
     }
     this.profileservice.getFieldsfromPage(input).subscribe(resp=>{
      this.myfields=[];
       resp.forEach(element => {
         this.myfields.push(element.field)
         
       });
     })
    
      }
      chanageFeild(feild){
        this.selectedFeild=feild;
      }
      saveVaultConfig(form:NgForm){
        let firstname=localStorage.getItem("firstName");
        let lastname=localStorage.getItem("lastName");
        let created_by=firstname+" "+lastname
        var input={
          "createdBy": created_by,
          "field": this.selectedFeild,
          "module": this.selectedmodule,
          "page": this.selectedPage,
          "product": this.selectedproduct,
          "tenantId": this.tenantId
        }
        this.profileservice.saveVaultConfig(input).subscribe(resp=>{
          this.modalRef.hide();
          this.getListOfVaultconfigs();
          this.notifier.show({
            type: "success",
            message: "Vault Configured successfully!"
          });
          },err=>{
            this.getListOfVaultconfigs();
          });
          form.resetForm();
       
      }
      vaultconfigdelete(data,index){
        document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")
        this.selectedvaultconfig = index;
      }
      vaultconfigDelYes(data,index){
      
        var input={
          "id":data.id,
          "field": data.field,
          "module": data.module,
          "page": data.page,
          "product": data.product,
          "tenantId": this.tenantId
        }
        this.selectedvaultconfig=" ";
        document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")
       // this.modalRef.hide();
     

        this.profileservice.deleteVaultConfig(input).subscribe(data1 => {
         
        
         if(data1.message === "Deleted Successfully"){
          this.notifier.show({
            type: "success",
            message: "Vault configuration deleted!"            
          })
          this.getListOfVaultconfigs();
          }else {
           this.notifier.show({
              message: `Failed to delete vault configuration`,
              type: 'error'
            }) 
          }
        })
      }
      vaultconfigdelno(index){
        this.selectedvaultconfig=" ";
        document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")
        }
        updateVaultconfig(form:NgForm){
          let firstname=localStorage.getItem("firstName");
          let lastname=localStorage.getItem("lastName");
          let modified_by=firstname+" "+lastname
          var input={
            "id": this.modvaultId,
            "tenantId": this.tenantId,
            "product": this.modprod,
            "module": this.modmodule,
            "page": this.modpage,
            "field": this.modfield,
            "modifiedBy": modified_by
          }
          this.profileservice.updateVaultConfig(input).subscribe(resp =>{
            this.modalRef.hide();
          this.getListOfVaultconfigs();
          this.notifier.show({
            type: "success",
            message: "Vault updated successfully"
          });
          },err=>{
            this.getListOfVaultconfigs();
          });
          form.resetForm();

        
        }
        secretdelete(data,index){
         
       // document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")
          this.selectedsecret = index;
        }
          secretDelYes(data,data2,index){
    
        
            this.selectedsecret=" ";
            let versionsList=data2.data.metadata.version;
          const s=  Array.from({length: versionsList}, (_, i) => i + 1)
          let input={
              "versions":s
            }
          
      
         this.profileservice.deleteSecret(input,data).subscribe(resp=>{
          this.getAllKeys();
          if(resp.message === "secret deleted"){
           
              this.notifier.show({
                type: "success",
                message: "Vault Secret deleted successfully."            
              })
           this.getAllKeys();
              }else {
               this.notifier.show({
                  message: `Failed to delete vault Secret.`,
                  type: 'error'
                }) 
              }
         })
              
           }


          secretdelno(index){
            this.selectedsecret=" ";
            document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")
            }
      changeActivity()
      {
        //this.modifyactivities=this.activitieslist
      
      }
      onblur(){
        this.ispublicMail = false;
        this.isSameDomain = false;
      }


      deleteNotification(data,index){
       
        this.profileservice.deleteNotification(data).subscribe(resp=>{
          // console.log(resp)
          this.getAllNotifications();
          this.notifier.show({
            type: "success",
            message: "Notification deleted successfully!"
          });
          this.dataid = '';
          },err=>{
            this.getAllNotifications();
          });
         this.getAllNotifications();
    }

    deletesuperadminnotification(data){
      this.profileservice.deletesuperadminNotifications(data).subscribe(resp=>{
        // console.log(resp)
        this.getAllSuperAdminNotifications();
        this.notifier.show({
          type: "success",
          message: "Notification deleted successfully!"
        });
        this.dataid = '';
        this.getAllSuperAdminNotifications();
        },err=>{
          this.getAllSuperAdminNotifications();
        });
       this.getAllSuperAdminNotifications();
    }

   
      passwordChange(form:NgForm){
        let pswdbody = {
          "confirmPassword": this.pswdmodel.confirmPassword,
          "currentPassword": this.pswdmodel.currentPassword,
          "newPassword":this.pswdmodel.confirmPassword,
          "userId": localStorage.getItem('userName')
        }
      this.profileservice.changePassword(pswdbody).subscribe(res => {
      // this.pswdmodel = {};
        this.notifier.show({
          type: "success",
          message: "Password Updated successfully!",
          id: "123"
        });
      }, err => {
        // console
        this.notifier.show({
          type: "error",
          message: "Please check your current password!",
          id: "124"
        });})
      form.resetForm();
      }

      curreyetoggle() {
        this.eyeshow = !this.eyeshow;
      }
      neweyetoggle() {
        this.neweyeshow = !this.neweyeshow;
      }
      confeyetoggle() {
        this.confeyeshow = !this.confeyeshow;
      }

      getAllProducts(){
        this.profileservice.getAllApplications().subscribe(response => {
          this.applications = response
          // this.applications.forEach(element => {
          //   this.productname.push(element.id)
          //  // console.log("All applications",element.id)
          // });
          
        });
        this.profileservice.fetchAllProds().subscribe(myresp=>{
          
          myresp.forEach(element => {
            this.configprods.push(element.product)

          });
        })
      }
      onFileSelected(event)
      {
        this.emailRequired = false;
        $("#excel").empty();
        $("#email").prop('disabled', true);
        $("#product").prop('disabled', true);
        this.invitemultirole=true;
        this.selectedFile=<File>event.target.files[0]
      
      // $("#excel").val(this.selectedFile.name)
       $("#excel").append(this.selectedFile.name);
      }

      notificationclick(id)
      {
        let userId =  localStorage.getItem("userName")
        this.tenantId=localStorage.getItem('tenantName');
        this.role=localStorage.getItem('userRole')
       this.notificationbody ={
          "tenantId":this.tenantId
       }
      
       if(this.notificationList.find(ntf=>ntf.id==id).status!='read'){
        this.profileservice.getReadNotificaionCount(this.role,userId,id,this.notificationbody).subscribe(data => {
          this.notificationreadlist = data
          this.notificationList.find(ntf=>ntf.id==id).status='read'
         //document.getElementById('msg_'+id).style.color="grey"
         //document.getElementById('date_'+id).style.color="grey"
         //document.getElementById(id).style.cursor="none"
         
        })
       
      }
      }
      notificationsuperadminclick(id)
      {
        let userId =  localStorage.getItem("userName")
        this.tenantId=localStorage.getItem('tenantName');
        this.role=localStorage.getItem('userRole')
       this.notificationbody ={
          "tenantId":this.tenantId
       }
    
       let notificationid=id;
       if(this.superadminnotificationList.find(ntf=>ntf.id==notificationid).status!='read'){
        this.profileservice.getReadNotificaionCount(this.role,userId,id,this.notificationbody).subscribe(data => {
          this.notificationreadlist = data
          this.superadminnotificationList.find(ntf=>ntf.id==notificationid).status='read'
         //document.getElementById('msg_'+id).style.color="grey"
         //document.getElementById('date_'+id).style.color="grey"
         //document.getElementById(id).style.cursor="none"
    
        })
       
      }
      }

      getListOfEmailTemplates()
      {
        this.profileservice.getEmailTemplates().subscribe(data => {
          this.emailtemplateslist=data
        
        })
      }
      getListOfVaultconfigs(){
        this.profileservice.getVaultConfigurations(this.tenantId).subscribe(data =>
          {
            this.vaulConfigureList=data
           
          })

      }
      savetemplate(form:NgForm)
      {
        let templateip = {

          "templateBody": this.mailbody,
          "templateName": this.templateName,
          "templateSubject": this.mailsubject
  
        }
        this.profileservice.saveTemplate(templateip).subscribe(data => {
          this.getListOfEmailTemplates();
          this.modalRef.hide();
         if(data.message === "Email template saved successfully"){
          this.notifier.show({
            type: "success",
            message: "Template saved successfully"            
          })
           
          }else {
           this.notifier.show({
              message: `Template name already exists`,
              type: 'error'
            }) 
          }
        })
        form.resetForm();
      }

      selectedtemplate(data, index, template) {
    
        this.templatedata = data;
        this.modtempcreated=data.createdBy;
        this.modtempbody=data.templateBody;
        this.modtempid=data.templateId;
        this.modtempname=data.templateName;
        this.modtempsub=data.templateSubject;
        this.modtemptenant=data.tenantId;
        this.modalRef = this.modalService.show(template)
       
      }
      selectedVaultConfig(data,i,template){
        this.onChangeprod(data.product);
        
        var input={
          "module": data.module,
          "product": data.product
      
     }
     this.profileservice.getpagesfromModule(input).subscribe(resp =>{
      this.mypages=[];
      
       resp.forEach(element => {
         this.mypages.push(element.page)
         
       });
    
     })
     var input1={
      "module": data.module,
      "page":data.page,
      "product": data.product
  
 }
 this.profileservice.getFieldsfromPage(input1).subscribe(resp=>{
  this.myfields=[];
   resp.forEach(element => {
     this.myfields.push(element.field)
     
   });
 })

       
        this.templatedata = data;
        this.modvaultId=data.id;
        this.modprod=data.product;
        this.modmodule=data.module;
        this.modpage=data.page;
        this.modfield=data.field;
        this.modconfigId=data.id;
        this.modalRef = this.modalService.show(template)
       

      }
      emailtempdelete(data,index){
        document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")
        this.selectedtempdet = index;
      }
      tempdelno(index){
      this.selectedtempdet=" ";
      document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")
      }

      tempDelYes(data,index){
        this.selectedtempdet=" ";
        document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")
       // this.modalRef.hide();
        this.profileservice.deleteTemplate(data).subscribe(data => {
          this.getListOfEmailTemplates();
         if(data.message === "Template deleted successfully"){
          this.notifier.show({
            type: "success",
            message: "Template deleted successfully"            
          })
           
          }else {
           this.notifier.show({
              message: `Failed to delete template`,
              type: 'error'
            }) 
          }
        })
       
      }
      cancelEmail(){
        this.modalRef.hide();
      }
      cancelUpdateVaultConfig(){
        this.modalRef.hide();
      }

      updateemailtemplate(){
        let modtempip={
          "createdBy": this.modtempcreated,
          "templateBody": this.modtempbody,
          "templateId": this.modtempid,
          "templateName": this.modtempname,
          "templateSubject": this.modtempsub,
          "tenantId": this.modtemptenant
        }
         this.profileservice.modifyTemplate(modtempip).subscribe(data => {
          this.getListOfEmailTemplates();
          this.modalRef.hide();
         if(data.message === "Template updated successfully"){
          this.notifier.show({
            type: "success",
            message: "Template updated successfully"            
          })
           
          }else {
           this.notifier.show({
              message: `Failed to update template`,
              type: 'error'
            }) 
          }
        })

      }
      
      
      twoFactorAuthConfig(form:NgForm){
        var tentName = localStorage.getItem('tenantName');
        
    //this.formTwoFactor.company = "Epsoft";
    if(this.emailvalue == 'true'){
      this.enableTwoFactorConfig = true;
    }else if(this.emailvalue == 'false'){
      this.enableTwoFactorConfig = false;
    }
        let twoFactorAuthBody = {
          "twoFactorEnabled": this.enableTwoFactorConfig ,
          "emailEnabled":this.formTwoFactor.isEmailcheckForOTP,
          "smsEnabled": this.formTwoFactor.isSMScheckForOTP,
        }
    
      this.profileservice.twoFactorConfig(twoFactorAuthBody, tentName).subscribe(res => {
      // this.pswdmodel = {};
      this.getTwoFactroConfigurations()
      if(res.errorCode){
        this.notifier.show({
          type: "error",
          message: res.errorMessage,
          id: "123"
        });
      }else{
        this.notifier.show({
          type: "success",
          message: "Configuration Updated successfully",
          id: "123"
        });
      }
      }, err => {
        // console
        this.notifier.show({
          type: "error",
          message: "Failed To Update Two Factor Authentication Configurations!",
          id: "124"
        });})
      form.resetForm();
      }
      
      getTwoFactroConfigurations(){
        
      let userId = localStorage.getItem("userName");
      this.profileservice.getTwoFactroConfig(userId).subscribe(res=>{

        if(!res.message){
          if(res.twoFactorEnabled == true){
            this.emailvalue = "true";
          }else{
            this.emailvalue = "false";
          }
        //  this.formTwoFactor.enableTwoFactor = res.twoFactorEnabled;
          this.formTwoFactor.isEmailcheckForOTP = res.emailEnabled;
          this.formTwoFactor.isSMScheckForOTP = res.smsEnabled;
        }        
      });
    }
    onEmailChange(){
      this.isSameDomain = false;
      this.emailRequired = false;
    }
    onselectincident(){
      this.incidentselected=undefined;
    }
    onselectsms(){
      this.smsselected=undefined;
    }
    onselectemail(){
      this.emailtemplate=undefined;
      this.emailselected=undefined;
    }
    createNewDept(form:NgForm){
      let body = {
        "categoryName": this.deptName
      }
      this.profileservice.createCategory(body).subscribe(resp => {
               this.modalRef.hide();
        this.getAllCategories();
        if(resp.message === "Successfully created the category"){
          this.notifier.show({
            type: "success",
            message: "Department created successfully!"
          });
        }else {
          this.notifier.show({
            type: "error",
            message: "Failed to create department",
          });
        }
      })
      form.resetForm();
    }
    viewDept(category, template){
      this.categoryname=category.categoryName;
      this.dept=category;
      this.modalRef = this.modalService.show(template)
    }
    modifydept(){
      let catbody = {
        "categoryId": this.dept.categoryId,
        "categoryName": this.categoryname
      }
      this.profileservice.updateCategory(catbody).subscribe(resp => {
        
        this.modalRef.hide();
        this.getAllCategories();
        if(resp.message === "Successfully updated the category"){
          this.notifier.show({
            type: "success",
            message: "Department modified successfully!"
          });
        }else {
          this.notifier.show({
            type: "error",
            message: "Failed to modify department",
          });
        }
      })
    }
    depdel(data,index){
      this.selectedIndex = index;
      document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")

     }
     deletedepYes(data,index){
       let delbody={
        "categoryId": data.categoryId,
        "categoryName": data.categoryName
      }
     
       this.profileservice.deleteCategory(delbody).subscribe(resp => {
         this.getAllCategories();
         if(resp.message==="Successfully deleted the category"){
          this.notifier.show({
            type: "success",
            message: "Department deleted successfully!"
          });
          this.selectedIndex= " ";
         }else{
          this.notifier.show({
            type: "error",
            message: "Failed to delete department",
          });
         }
      //  document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")
       })
     }
     cancelAddDept(){
       this.modalRef.hide();
     }
    onInviteProduct(event){

      this.inviteAllRoles = this.allRoles;
    }
    
    inputNumberOnly(event){
      let numArray= ["0","1","2","3","4","5","6","7","8","9","Backspace","Tab"]
      let temp =numArray.includes(event.key); //gives true or false
     if(!temp){
      event.preventDefault();
     } 
    }
    
    lettersAndNumbers(event): boolean {
      var regex = new RegExp("^[a-zA-Z0-9 ]+$");
      var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
    }
    lettersAndNumbers1(event): boolean {
      var regex = new RegExp("^[0-9a-zA-Z\s\r\n., ]+$");
      var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
    }
    inputlettersEmail(event): boolean {
      var regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
      var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
    }
}
