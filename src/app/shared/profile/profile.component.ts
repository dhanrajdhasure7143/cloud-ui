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
import moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() public isInvite: boolean;
  @Input() public isMyaccount: boolean;
  @Input() public isusers: boolean;
  @Input() public isnotification: boolean;
  public model: User;
  public yearList:any;
  config = {
    animated: false,
    ignoreBackdropClick: true
  };
  public cardModel:any={};
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
  public addDepartment: boolean = false;
  public departments: any;
  public password: any;
  public show: Boolean = true;
  public userManagement: any[];
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
  public userdata: any;
  public closeFlag: Boolean = false;
  public useremail: any;
  public myroleId:any;
  public myappId:any;
  department: any;
  userDepartment: any;
  listOfUserApplications: any = [];
  listOfroles: any=[];
  delData: any;
  blob: Blob;
  invoiceid: any;
  apps: any;
  userRole: any;
  public otherdepartment: any;
  stateInfo: any[] = [];
  cityInfo: any[] = [];
  allRoles: any;
  constructor(private sharedData: SharedDataService,
    private firstloginservice: FirstloginService,
    private modalService: BsModalService,
    private profileservice: ProfileService,
    private notifier: NotifierService,
    private router: Router,
    private productlistservice:ProductlistService
  ) { }

  ngOnInit() {
    this.yearList=yearslist;
      this.getAllNotifications();
    this.profileservice.getUserApplications().subscribe(resp => {
      this.apps = resp,
      console.log("my apps are",this.apps)
        this.apps.forEach(elementApps => {
          this.listOfUserApplications.push(elementApps.name)
        });
    })
    this.profileservice.getAllRoles(2).subscribe(resp => {
      this.allRoles = resp,
      console.log("resp is",resp)

        this.allRoles.forEach(elementRoles => {
          
                 this.listOfroles.push(elementRoles.name)
        });
    })
    this.profileservice.getUserRole(2).subscribe(role => {
      this.userRole = role.message;

    })
    this.countryInfo = countries.Countries;
    this.useremail=localStorage.getItem('userName');

    this.userManagement = [{ "id": "256426", "firstName": "Ranjith", "lastName": "sigiri", "Designation": "HR", "Organisation": "EpSoft", "Department": "HR", "Product": "Gib", "Roles": "Admin" },
    { "id": "15427", "firstName": "suresh", "lastName": "yenkam", "Designation": "HR", "Organisation": "Monile APP", "Department": "HR", "Product": "Ezbot", "Roles": "user" },
    { "id": "356426", "firstName": "mallesh", "lastName": "ammi", "Designation": "Engineer", "Organisation": "Array tech", "Department": "Developer", "Product": "Ezflow", "Roles": "User" },
    { "id": "158424", "firstName": "venkatesh", "lastName": "ameeredy", "Designation": "UX", "Organisation": "EpSoft", "Department": "UX design", "Product": "Gib", "Roles": "Admin" },
    { "id": "296426", "firstName": "swarrop", "lastName": "C", "Designation": "SE", "Organisation": "Aiotal", "Department": "HR", "Product": "Aiotal", "Roles": "User" },
    { "id": "296426", "firstName": "swarrop", "lastName": "C", "Designation": "SE", "Organisation": "Aiotal", "Department": "HR", "Product": "Aiotal", "Roles": "User" },
    { "id": "296426", "firstName": "swarrop", "lastName": "C", "Designation": "SE", "Organisation": "Aiotal", "Department": "HR", "Product": "Aiotal", "Roles": "User" },
    { "id": "296426", "firstName": "swarrop", "lastName": "C", "Designation": "SE", "Organisation": "Aiotal", "Department": "HR", "Product": "Aiotal", "Roles": "User" }];

  }
  getAllPaymentmodes() {

    this.profileservice.listofPaymentModes().subscribe(response => { this.paymentMode = response });

  }

  ngOnChanges() {
    if (this.isMyaccount == true) {
      this.userDetails();

    }
    this.getAllNotifications();
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
     }
   });
 }
    inviteUser(userId,inviteeId){
     
    let  body = {
        "id": this.myroleId,
        "appliationId": {
        "appId": this.myappId
        }}
        console.log("role is selected",body)
this.profileservice.inviteUser(userId,inviteeId,body).subscribe(res=>{console.log("invite +++",res)})


    }
  
  
}
