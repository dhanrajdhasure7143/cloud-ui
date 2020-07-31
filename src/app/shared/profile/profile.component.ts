import { Component, OnInit, Input } from '@angular/core';
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
import { Observable } from 'rxjs';
import { log } from 'console';



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
  public emailId: any;
  public sentFromOne: any;
  public tableData: any[];
  public formOne: any = {};
  countryInfo: any[] = [];
  isReedemBy:boolean=false;
  isReedemTimes:boolean=false;
  isAmount:boolean=false;
  public addDepartment: boolean = false;
  public departments: any;
  public password: any;
  public userManagement: any=[];
  public userManagementresponse:any=[];
  public show: boolean = true;
  public isOpened: any ;
  public showList:boolean =  true;
  public selectedIndex: number;
  public deletCardIndex: number;
  public defaultcard: number = 0;
  modalRef: BsModalRef;
  public stopcheckbox: any;
  public pricecheckbox: any;
  public plancheckbox: any;
  public feedbackbox: any;
  public paymentMode: any;
  public invoicedata: any[];
  public nitificationList: any;
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
  allRoles: any;
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
  selectedApp:any;
  selectedApplication:any;
  selectedpermidlist: any = [];
  couponDetails: any;
  couponNamename: any;
  couponIdId: any;
  durationTime: any;
  percentageOffTot: any;
  data: any;
  allCoupons: any;
  mod: any;
  coupondata: any;
  
  /**alerts */
  isEmailcheckBoxValue:any;
  isPushNotificationcheckBoxValue:any;
  isSMScheckBoxValue:any;
  activitieslist:any = [];
  selectValue:any = [];
  isChecked:any = [];
  result: void;
  checkedData: any;
  demo: any = [];
  application: any = [];
  listOfNames: any = [];
  listOfId: any = [];
  Follow_list: any;
  alertsapplication: any;
  alertsactivities:any=[];
  selectedtype:any;
  emailselected:any;
  smsselected:any;
  pushNotifications:any;
  pushEmailNotificationsTo:any;
  pushsmsNotificationsTo:any;
  alertsbody:any;
  channel: any[]=[];
  p=0;
  alertuserroles:any=[];
 public alertslistactivitiesdata:any=[];
  applicationames: any;


  //dropdownSettings:IDropdownSettings;
  constructor(private sharedData: SharedDataService,
    private firstloginservice: FirstloginService,
    private modalService: BsModalService,
    private profileservice: ProfileService,
    private notifier: NotifierService,
    private router: Router,
    private productlistservice:ProductlistService
 
  ) { }

  ngOnInit() {

    this.applications = [
      {id: 2, name: "2.0"},
      {id: 3, name: "ezflow"}
  ];
    this.getAllPermissions();
    this.yearList=yearslist;
      this.getAllNotifications();
    this.profileservice.getUserApplications().subscribe(resp => {
      this.apps = resp,
             this.apps.forEach(elementApps => {
          this.listOfUserApplications.push(elementApps.name)
        });
    })
      this.tenantId=localStorage.getItem('tenantName');
this.profileservice.getTenantbasedusersDetails(this.tenantId).subscribe(resp=>{
    this.userManagementresponse = resp
       this.userManagementresponse.forEach(elementuser => {
         elementuser.userId['applicationIdname']=elementuser.applicationId.name;
      elementuser.userId['roleIdname']=elementuser.roleID.name;
      this.userManagement.push(elementuser.userId);
    });
});
console.log("local",localStorage.getItem('userRole'))
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
    this.application = resp,
    console.log("list of names",resp);
  this.application.forEach(element => {
    this.listOfNames.push(element)
    this.listOfId.push(element.app_id)
  });})
  
    

  }
  getListofCoupons() {
    this.profileservice.listofCuopons().subscribe(resp=>{this.allCoupons=resp
      this.allCoupons.forEach(element => {
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
    console.log("doupns are",this.allCoupons)})
 
  }
  getAllPaymentmodes() {

    this.profileservice.listofPaymentModes().subscribe(response => { this.paymentMode = response });

  }

  ngOnChanges() {
    if (this.isMyaccount == true) {
      this.userDetails();

    }
    this.getAllNotifications();

    if(this.isAlerts == true)
    {
      this.tenantId=localStorage.getItem('tenantName');
      this.alertuserroles=localStorage.getItem('userRole');
      this.getAllAlertsActivities(this.tenantId,this.alertuserroles);
    }
  }

  getAllNotifications() {
    const userId = {
      "toAddress": localStorage.getItem("userName")
    }
    this.profileservice.getNotifications(userId).subscribe(data => {
      this.nitificationList = data
    })
  }
  userDetails() {
    this.useremail = localStorage.getItem("userName");
    this.profileservice.getUserDetails(this.useremail).subscribe(data => {this.formOne = data     
      this.getAllDepartments()
      this. getAllStates();
      this.gatAllCities();

    })
  }
  loopTrackBy(index, term) {
    return index;
  }
  slideDown() {
    this.dataid = '';
    document.getElementById("foot").classList.add("slide-down");
    document.getElementById("foot").classList.remove("slide-up");
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
    this.firstloginservice.updateUser(this.formOne).subscribe(data => {
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

  selecteddata(data, index, template) {
    document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")
    this.subscribeddata = data;
    this.modalRef = this.modalService.show(template)
    this.selectedIndex = index;
  }

  

  unsubscribeYes(index) {
    this.modalRef.hide();
    this.profileservice.cancelSubscription(this.subscribeddata).subscribe(data => {
      this.getAllSubscrptions();
      this.notifier.show({
        type: "success",
        message: "Subscription cancelled successfully!",
        id: "123"
      });
    }, err => {
    });
    document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")

  }
  unsubscribeNo(index) {
    document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")

  }

  deletCard(data, index) {
  
    
    // this.closeFlag = true;
    // this.deletCardIndex = index;
    // document.getElementsByClassName("deletconfm")[index].classList.add("isdeletcard")
    Swal.fire({
      title: 'Confirmation',
      // text: `Updated failed, Please try again.`,
      html: '<h4> Do you want to delete the selected card?</h4> ',
      type: 'warning',
      showCancelButton: true,
      allowOutsideClick: true,
    }).then((result) => {
      if (result.value) {
        this.profileservice.deletePaymentMode(data.id).subscribe(data => { this.delData = data
          this.getAllPaymentmodes();
          Swal.fire({
            title: 'Success!',
            text: `Card deleted successfully.`,
            type: 'success',
            showCancelButton: false,
            allowOutsideClick: true
          }) 
        },err=>{
          Swal.fire({
            title: 'Error!',
            text: `Please try again.`,
            type: 'error',
            showCancelButton: false,
            allowOutsideClick: true
          })

        })
        this.getAllPaymentmodes();
      }
    })
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
      console.log("selroledata", selRoleData)
    this.selectedApp = selRoleData.appliationId.name;
    this.modalRef = this.modalService.show(template)
  }
  selectedCoupondata(selCouponData, index, template){
    this.coupondata=selCouponData;
    this.modalRef = this.modalService.show(template)

  }
  infoModelSubmit() {
    this.modalRef.hide();
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
    this.profileservice.listofsubscriptions().subscribe(response => { this.tableData = response });
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
    // this.formOne.country = this.countryInfo[countryValue].CountryName;
    for (var i = 0; i < this.countryInfo.length; i++) {
      if (this.countryInfo[i].CountryName == countryValue) {
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

    addAlert(template)
    {
      this.modalRef = this.modalService.show(template,this.config)
    }
    alertsdeletedata(data,index)
  {
    document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")
  }
  updateselecttedalertdata(data,index,template)
  {
    this.alertslistactivitiesdata=data;
    this.modalRef = this.modalService.show(template)
  }

    addrole(template){
      this.modalRef = this.modalService.show(template,this.config)
    }
    createCoupon(createCoupon){
      this.modalRef = this.modalService.show(createCoupon,this.config)
    }
    cancelAddRole(){
      this.modalRef.hide();
    //  this.cardModel={}
    }
    cancelCreateCopon(){
      this.modalRef.hide();
    }
   
    cancelAddCard(){
      this.modalRef.hide();
      this.cardModel={}
    }
    addNewCard(){
      this.cardDetails={
          "number":this.cardModel.cardNumber,
          "exp_month":this.cardModel.cardmonth,
          "exp_year":this.cardModel.cardyear,
          "cvc":this.cardModel.cvvNumber
        }

      this.productlistservice.getPaymentToken(this.cardDetails).subscribe(res=>{
          this.paymentToken=res
        
      this.profileservice.addNewCard(this.paymentToken,this.isdefault).subscribe(res=>{
          // console.log('res',res);
          this.getAllPaymentmodes();
          this.modalRef.hide();
      this.cardModel={}
      })
      })
  
      // this.profileservice.addNewCard(token).subscribe(res=>{})
      // api call
      
    }
/**alert */
cancelAlert(){
  this.modalRef.hide();
  this.alertModel={}
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
              title: 'Success!',
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
    inviteUser(userId,inviteeId){
      this.profileservice.restrictUserInvite(this.myappName).subscribe(invres=>{
        if(invres === "Exceeded max users count"){
        Swal.fire({
          title: 'Message!',
          text: "Users max limit exceeded",
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: true
        })
        return
      }
      })
      if(inviteeId.endsWith('@gmail.com') ||inviteeId.endsWith('@yahoo.com') || 
      inviteeId.endsWith('@hotmail.com') || inviteeId.endsWith('@rediffmail.com')){
     this.ispublicMail=true;
     return

   }
      let body = [];
      this.selectedroles.forEach(roleid => {
        let obj = {
          "id" : roleid,
          "appliationId" : {
            "appId" : this.myappId
          }
        }
        body.push(obj);
     
    });
    console.log("invite input ",body)
    // let  body = {
    //     "id": this.myroleId,
    //     "appliationId": {
    //     "appId": this.myappId
    //     }}
       
this.profileservice.inviteUser(userId,inviteeId,body).subscribe(res=>{
  Swal.fire({
    title: 'Success!',
    text: "Invite mail sent successfully.",
    // Default card is set successfully!!
    type: 'success',
    showCancelButton: false,
    allowOutsideClick: true
  })
})

 
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
            title: 'Success!',
            text: `Role deleted successfully.`,
            type: 'success',
            showCancelButton: false,
            allowOutsideClick: true
          }) 
          }, err => {
          });
          document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")
    

}
couponDelYes(coupon,index){
  this.profileservice.deleteCoupon(coupon).subscribe(resp=>{
    this.getListofCoupons();
    console.log("deleted coupon")
    Swal.fire({
      title: 'Success!',
      text: `Coupon deleted successfully.`,
      type: 'success',
      showCancelButton: false,
      allowOutsideClick: true
    }) 
    

  },err => {
  });
  document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")

}
  getRoles(){
  if(localStorage.getItem('userRole').includes('SuperAdmin')){
   this.profileservice.getAllRolesForSuperAdmin().subscribe(resp => {
   this.allRoles = resp,
   console.log("All roles",resp)
   this.allRoles.forEach(elementRoles => {
       
   this.listOfroles.push(elementRoles.name)
   });
                
   })
   }else {
     this.profileservice.getAllRoles(2).subscribe(resp => {
            this.allRoles = resp,
            console.log("resp is",resp)
      
            this.allRoles.forEach(elementRoles => {
                  
            this.listOfroles.push(elementRoles.name)
            });
                
          })
      
       }
      }
        roledel(data,index){
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
          this.permissionsList = data
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
       console.log("rolesbody", rolesbody)
       this.profileservice.modifyRole(rolesbody).subscribe(modifyresp => {
        this.modalRef.hide();
        this.getRoles();
        Swal.fire({
          title: 'Success!',
          text: `Role updated successfully.`,
          type: 'success',
          showCancelButton: false,
          allowOutsideClick: true
        }) 
      })
      
    }
    modifycoupon(couponData){
      
this.profileservice.modifyCoupon(couponData.name,couponData.id).subscribe(resp=>{
  this.modalRef.hide();
  this.getListofCoupons();
  Swal.fire({
    title: 'Success!',
    text: `Coupon updated successfully.`,
    type: 'success',
    showCancelButton: false,
    allowOutsideClick: true
  }) 
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
   console.log("create role", addRoleBody)
   this.profileservice.createRole(addRoleBody).subscribe(modifyresp => {
    this.modalRef.hide();
    this.getRoles();
    Swal.fire({
      title: 'Success!',
      text: `Role created successfully.`,
      type: 'success',
      showCancelButton: false,
      allowOutsideClick: true
    }) 
  })
  
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
      console.log("value is",value)
  
    }
    onSelected(value){
      if(value=='redeemBy' ){
  this.isReedemBy=true;
      }
      else{
        this.isReedemTimes=true;
      }
    }
    createNewCoupon(){
      this.couponDetails={
        couponNamename:this.couponNamename,
        couponIdId:this.couponIdId,
        durationTime:this.durationTime,
        percentageOffTot:this.percentageOffTot,
        amountOff:this.amountOff
          }
      let input={
      
        "currency": "usd",
        "duration": this.durationTime,
        "durationInMonth": 0,
        "name": this.couponNamename,
        "percent_off": this.percentageOffTot,
        "redeem_by": 1596276480,
        "redmee_times": 3
      }
      this.profileservice.createCoupon(input).subscribe(resp=>{this.data=resp
        Swal.fire({
          title: 'Successful',
          text: `Coupon creation successful...`,
          type: 'success',
          showCancelButton: false,
          allowOutsideClick: false
        }) 
           
            });
            
        console.log('resp is',this.data)
    }
    /** alerts */
    saveConfig() {
      this.tenantId=localStorage.getItem('tenantName');
      this.useremail=localStorage.getItem('userName');
        console.log("tenant : "+this.tenantId);

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
      if(this.isEmailcheckBoxValue==false)
      {
        this.emailselected=null
      } 
      if(this.isSMScheckBoxValue==false)
      {
        this.smsselected=null
      }
     var notificationby = alertconfiguration.substring(0, alertconfiguration.length-2);
     console.log(notificationby)
      this.alertsbody ={
        "app_name": this.applicationames,
        "type":this.selectedtype ,
         "activity_names":this.alertsactivities,
       "channel":notificationby,
         "mail_to":  this.emailselected,
         "text_to":  this.smsselected,
         "created_by":  this.useremail ,
         "tenant_id":  this.tenantId

    }
    
        console.log(this.alertsbody)
      

console.log("alertbody",this.alertsbody)
           this.profileservice.saveConfig(this.alertsbody).subscribe(res =>  {
            this.notifier.show({
              type: "success",
              message: "Saved successfully!"
            });
            this.alertsapplication="";
      this.alertsactivities=[];
      this.selectedtype="";
      this.isEmailcheckBoxValue=false;
      this.isSMScheckBoxValue=false;
      this.isPushNotificationcheckBoxValue=false;
      this.smsselected="";
      this.emailselected="";
          this.modalRef.hide();
         //  this.configurealertform.reset();
            }, err => {
              this.notifier.show({
                type: "error",
                message: "Please try again!"
              });
            });

      }

      getAllAlertsActivities(tenantID,userrole) {
  this.tenantId=localStorage.getItem('tenantName');
  this.alertuserroles=localStorage.getItem('userRole');
   this.profileservice.listofactivities(this.tenantId,this.alertuserroles).subscribe(alertresponse => 
    {
      this.alertslistactivitiesdata = alertresponse
      this.alertslistactivitiesdata
      console.log("All Activities",this.alertslistactivitiesdata)
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
      changeActivity()
      {
        console.log(this.alertsactivities);
      }

   }