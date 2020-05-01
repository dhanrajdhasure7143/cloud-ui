import { Component, OnInit, Input } from '@angular/core';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { User } from './../../_models/user';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import  countries  from 'src/app/../assets/jsons/countries.json';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProfileService } from 'src/app/_services/profile.service';
import { NotifierService } from 'angular-notifier';
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
  })
export class ProfileComponent implements OnInit{
 
    @Input() public isInvite:boolean;
    @Input() public isMyaccount:boolean;
    @Input() public isusers:boolean;
    @Input() public isnotification:boolean;
    public model:User;
    public searchvalue:any;
    public searchUser:any;
    public emailId:any;
    public sentFromOne:any;
    public tableData:any[];
    public formOne:any={};
    countryInfo :any []= []; 
    public addDepartment:boolean=false;
    public departments:any[];
    public password:"any";
    public show:  Boolean = true;
    public userManagement:any[];
    public selectedIndex:number;
    public deletCardIndex:number;
    public defaultcard:number = 0;
    modalRef: BsModalRef;
    public stopcheckbox:any;
    public pricecheckbox:any;
    public plancheckbox:any;
    public feedbackbox:any;
    public paymentMode:any;
    public invoicedata:any[];
    public nitificationList:any;
    public dataid:any;
    public userId:any;
    subscribeddata:any;
    public userdata:any;
    public closeFlag:Boolean = false;
  public useremail:any;
  department: any;
  userDepartment:any;
  listOfDepartments:  any = [];
  delData: any;
  blob: Blob;
  invoiceid: any;
    constructor( private sharedData: SharedDataService,
                private firstloginservice: FirstloginService,
                private modalService: BsModalService,
                private profileservice:ProfileService,
                private notifier:NotifierService,
                private router: Router
                ) { }

  ngOnInit() {
    this.profileservice.getDepartments().subscribe(resp => 
      {
        this.department = resp,
        this.department.forEach(element => {
        this.listOfDepartments.push(element)
              });})

    this.getAllNotifications();
    this.getAllSubscrptions();
    this.getAllInvoices();
    this.getAllPaymentmodes();

    this.countryInfo = countries.Countries;

    this.userManagement=[{"id":"256426","firstName":"Ranjith","lastName":"sigiri","Designation":"HR","Organisation":"EpSoft","Department":"HR","Product":"Gib","Roles":"Admin"},
                    {"id":"15427","firstName":"suresh","lastName":"yenkam","Designation":"HR","Organisation":"Monile APP","Department":"HR","Product":"Ezbot","Roles":"user"},
                    {"id":"356426","firstName":"mallesh","lastName":"ammi","Designation":"Engineer","Organisation":"Array tech","Department":"Developer","Product":"Ezflow","Roles":"User"},
                    {"id":"158424","firstName":"venkatesh","lastName":"ameeredy","Designation":"UX","Organisation":"EpSoft","Department":"UX design","Product":"Gib","Roles":"Admin"},
                    {"id":"296426","firstName":"swarrop","lastName":"C","Designation":"SE","Organisation":"Aiotal","Department":"HR","Product":"Aiotal","Roles":"User"},
                    {"id":"296426","firstName":"swarrop","lastName":"C","Designation":"SE","Organisation":"Aiotal","Department":"HR","Product":"Aiotal","Roles":"User"},
                    {"id":"296426","firstName":"swarrop","lastName":"C","Designation":"SE","Organisation":"Aiotal","Department":"HR","Product":"Aiotal","Roles":"User"},
                    {"id":"296426","firstName":"swarrop","lastName":"C","Designation":"SE","Organisation":"Aiotal","Department":"HR","Product":"Aiotal","Roles":"User"}];

// this.paymentMode=[{"cardType":"Master Card","cardnumber":"xxxx-xxxx-xxxx-1234","select":"Default","expairydate":"10/22","createddate":"30/03/2020"},
//                 {"cardType":"Visa Card","cardnumber":"xxxx-xxxx-xxxx-4568","select":"Set Default","expairydate":"12/23","createddate":"23/02/2019"},
//                 {"cardType":"Rupay Card","cardnumber":"xxxx-xxxx-xxxx-7892","select":"Set Default","expairydate":"11/24","createddate":"30/12/2019"},
//                 {"cardType":"American Express Card","cardnumber":"xxxx-xxxx-xxxx-1234","select":"Set Default","expairydate":"10/22","createddate":"08/04/2019"},]   
}

getAllPaymentmodes() {
 
  this.profileservice.listofPaymentModes().subscribe(response => {this.paymentMode = response});

}

ngOnChanges(){
  if(this.isMyaccount== true){
  this.userDetails();
 
  
}
      this.getAllNotifications();
      this.getAllSubscrptions();
    this.getAllInvoices();
  }
  
getAllNotifications(){
  const userId={
    "toAddress" : localStorage.getItem("userName")
  }  
  this.profileservice.getNotifications(userId).subscribe(data=>{this.nitificationList=data
    })
}
  userDetails(){
    this.useremail=localStorage.getItem("userName");
    this.profileservice.getUserDetails(this.useremail).subscribe(data=>{this.formOne=data
       this.userDepartment=data.department;
  
 
    })
    // this.formOne ={
    //   firstName :localStorage.getItem("firstName"),
    //   lastName :localStorage.getItem("lastName"),
    //   designation :localStorage.getItem("designation"),
    //   userId:localStorage.getItem("userName"),
    //   company:localStorage.getItem('company'),
    //   department:localStorage.getItem('department'),
    //   country :localStorage.getItem("country"),
    //   phoneNumber:localStorage.getItem("phoneNumber")};
  }
  loopTrackBy(index, term){
    return index;
  }
  slideDown(){
    this.dataid='';
      document.getElementById("foot").classList.add("slide-down");
      document.getElementById("foot").classList.remove("slide-up");
  }

  inviteUser(){
  }
onChangeDepartment(selectedvalue) {
    this.firstloginservice.getAllDepartments().subscribe(response=> {
        this.departments = response;
      });
    if(selectedvalue == "others"){
      this.addDepartment = true;
    } else {
      this.addDepartment = false;
    }
  }

  onChangeCountry(countryValue) {
    this.formOne.country = this.countryInfo[countryValue].CountryName;
  }

  toggle() {
    this.show = !this.show;
  }

  updateAccount(form){
    this.firstloginservice.updateUser(this.formOne).subscribe(data => {
      this.notifier.show({
        type: "success",
        message: "Updated successfully!",
        id: "123" 
      });
    }, err => {
    });
   
  }
  // checkSuccessCallback(data:any){
  //   localStorage.setItem('formOne',JSON.stringify(this.formOne));
  // }

  selecteddata(data,index,template){
    document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")
    this.subscribeddata = data;
    this.modalRef = this.modalService.show(template)
    this.selectedIndex=index;
  }

  infoModelSubmit(){
    this.modalRef.hide();
    this.router.navigate(['/activation/payment/chooseplan']);
  
  }

  unsubscribeYes(index){
    this.modalRef.hide();
    this.profileservice.cancelSubscription(this.subscribeddata).subscribe(data => {this.checkSuccessCallback(data)
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
  unsubscribeNo(index){
  document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")
 
  }
  deletCard(data,index){
    this.closeFlag=true;
    this.deletCardIndex=index;
    document.getElementsByClassName("deletconfm")[index].classList.add("isdeletcard")
  }
  confrmDeleteCard(index){

    this.profileservice.deletePaymentMode(index.id).subscribe(data=>{this.delData=data})
    this.getAllPaymentmodes();
 
  
  }
  cancelDeleteCard(index){
    this.closeFlag=false;
    console.log("close index is",index)
    this.dataid='';
   // document.getElementsByClassName("deletconfm")[index].classList.remove("isdeletcard")
  }

  defaultcardselect(data,index){
    this.defaultcard= index;
    if(data.select == "Set Default"){
      data.select="Default"
    }else{
      data.select="Set Default"
    }
  }
 
  deletnotification(id){
    this.dataid=id
  }
  canceldeleteNotification(index){
  this.dataid='';
  }
  notify(){
    this.notifier.show({
      type: "error",
      message: "Could not import Bpmn diagram!",
      id: "ae12" 
    });
  }
  subscriptiondata(data,index,template){
  this.subscribeddata = data;
      this.modalRef = this.modalService.show(template)
    }

  invoicedownload(invoicedata){
    this.invoiceid=invoicedata.invoiceId;
    this.profileservice.invoicedownload(this.invoiceid).subscribe(data=>{
    const urlCreator=window.URL;
    const blob=new Blob([data], {
    type:'application/pdf',
     });
    const url = urlCreator.createObjectURL(blob);
    const a:any = document.createElement('a');
    document.body.appendChild(a);
    a.style='display: none';
    a.href=url;
    a.download=invoicedata.invoiceNumber+'.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
    this.notifier.show({
    type:"success",
    message: "Downloading....",
    id:"123"
     });
     },err=>{
    this.notifier.show({
    type:"error",
    message:"Download failed!",
    id:"123"
     });
     }
     )
     }
    
    

  getAllSubscrptions(){
    this.profileservice.listofsubscriptions().subscribe(response => {this.tableData = response});
  }
  getAllInvoices(){
    this.profileservice.listofinvoices().subscribe(response => {this.invoicedata = response.data});
  }

}
