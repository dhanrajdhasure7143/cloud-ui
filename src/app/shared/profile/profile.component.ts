import { Component, OnInit, Input } from '@angular/core';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { User } from './../../_models/user';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import  countries  from 'src/app/../assets/jsons/countries.json';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
  })
export class ProfileComponent implements OnInit{
    @Input() public isAccount:boolean;
    @Input() public isInvite:boolean;
    @Input() public isMyaccount:boolean;
    @Input() public isusers:boolean;
    model: User;
    public searchvalue:any;
    public searchUser:any;
    // public isAccount:boolean=true;
    public isSubscription:boolean=false;
    public isInvoice:boolean=false;
    public isPaymentmode:boolean=false;
    public isUsers:boolean=true;
    public isdepartment:boolean=false;
    public isRoles:boolean=false;
    public emailOne:any;
    public sentFromOne:any;
    public tableData:any[];
    public formOne:any[];
    countryInfo :any []= [];
    public addDepartment:boolean=false;
    public departments:any[];
    public password: string;
    public show:  Boolean = true;
    public passrd:any=12345678945;
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

    constructor( private sharedData: SharedDataService,
                private firstloginservice: FirstloginService,
                private modalService: BsModalService,
                ) { }

  ngOnInit() {  
    this.countryInfo = countries.Countries;
    this.firstloginservice.listofsubscriptions().subscribe(response => {this.tableData = response})
 
    this.userManagement=[{"id":"256426","firstName":"Ranjith","lastName":"sigiri","Designation":"HR","Organisation":"EpSoft","Department":"HR","Product":"Gib","Roles":"Admin"},
                    {"id":"15427","firstName":"suresh","lastName":"yenkam","Designation":"HR","Organisation":"Monile APP","Department":"HR","Product":"Ezbot","Roles":"user"},
                    {"id":"356426","firstName":"mallesh","lastName":"ammi","Designation":"Engineer","Organisation":"Array tech","Department":"Developer","Product":"Ezflow","Roles":"User"},
                    {"id":"158424","firstName":"venkatesh","lastName":"ameeredy","Designation":"UX","Organisation":"EpSoft","Department":"UX design","Product":"Gib","Roles":"Admin"},
                    {"id":"296426","firstName":"swarrop","lastName":"C","Designation":"SE","Organisation":"Aiotal","Department":"HR","Product":"Aiotal","Roles":"User"},
                    {"id":"296426","firstName":"swarrop","lastName":"C","Designation":"SE","Organisation":"Aiotal","Department":"HR","Product":"Aiotal","Roles":"User"},
                    {"id":"296426","firstName":"swarrop","lastName":"C","Designation":"SE","Organisation":"Aiotal","Department":"HR","Product":"Aiotal","Roles":"User"},
                    {"id":"296426","firstName":"swarrop","lastName":"C","Designation":"SE","Organisation":"Aiotal","Department":"HR","Product":"Aiotal","Roles":"User"}];
// console.log("userData",this.sharedData)  

this.paymentMode=[{"cardType":"Master Card","cardnumber":"xxxx-xxxx-xxxx-1234","select":"Default","expairydate":"10/22","createddate":"30/03/2020"},
                {"cardType":"Visa Card","cardnumber":"xxxx-xxxx-xxxx-4568","select":"Set Default","expairydate":"12/23","createddate":"23/02/2019"},
                {"cardType":"Rupay Card","cardnumber":"xxxx-xxxx-xxxx-7892","select":"Set Default","expairydate":"11/24","createddate":"30/12/2019"},
                {"cardType":"American Express Card","cardnumber":"xxxx-xxxx-xxxx-1234","select":"Set Default","expairydate":"10/22","createddate":"08/04/2019"},]

this.invoicedata=[{"invoiceid":"234567","subscription":"sub-5642d4dd","amount":"200","refund":"50","duedate":"20/04/2020","status":"Paid",},
                  {"invoiceid":"231247","subscription":"sub-56435dh2","amount":"300","refund":"200","duedate":"30/04/2020","status":"Paid",},
                  {"invoiceid":"128759","subscription":"sub-5864edh8","amount":"150","refund":"100","duedate":"15/05/2020","status":"Paid",},
                  {"invoiceid":"897456","subscription":"sub-2536dn4m","amount":"450","refund":"0","duedate":"20/07/2021","status":"Unpaid",}]


this.formOne =[{
    firstName :localStorage.getItem("firstName"),
    lastName :localStorage.getItem("lastName"),
    designation :localStorage.getItem("designation"),
    userId:localStorage.getItem("userName"),
    company:localStorage.getItem('company'),
    department:localStorage.getItem('department'),
    country :localStorage.getItem("country"),
    phoneNumber:localStorage.getItem("phoneNumber")}
];
// console.log("userData",this.formOne[0].phoneNumber);
  }
  
  
  loopTrackBy(index, term){
    return index;
  }
  

  slideDown(){
      document.getElementById("foot").classList.add("slide-down");
      document.getElementById("foot").classList.remove("slide-up");
  }


  onsubmit(){
      console.log("value",this.emailOne);
      console.log("value2",this.sentFromOne);  
  }


onChangeDepartment(selectedvalue) {
    // this.firstloginservice.getAllDepartments().subscribe(response=> {
    //     console.log("departments",response);
    //     this.departments = response;
    //   });
    if(selectedvalue == "others"){
      this.addDepartment = true;
    } else {
      this.addDepartment = false;
    }
  }

  onKeydown(event){    
    let numArray= ["0","1","2","3","4","5","6","7","8","9","Backspace"]
    let temp =numArray.includes(event.key); //gives true or false
   if(!temp){
    event.preventDefault();
   }
    
  }

  onChangeCountry(countryValue) {
    this.formOne[0].country = this.countryInfo[countryValue].CountryName;
  }

  toggle() {
    this.show = !this.show;
  }

  updateAccount(form){
    this.firstloginservice.updateUser(this.formOne[0]).subscribe(data => {this.checkSuccessCallback(data)
      // console.log('dat',res)
      // sessionStorage.clear();
      // localStorage.clear();
      Swal.fire({
        title: 'Success',
        text: `Update completed successfully!!`,
        type: 'success',
        showCancelButton: false,
        allowOutsideClick: false
      })
    }, err => {
      console.log('error', err);
    });
   
  }
  checkSuccessCallback(data:any){    
    console.log("checkSuccessCallback--------login component", this.formOne[0]);
    localStorage.setItem('firstName',this.formOne[0].firstName);
    localStorage.setItem('lastName',this.formOne[0].lastName);
    localStorage.setItem('userName',this.formOne[0].userId);
    localStorage.setItem('phoneNumber',this.formOne[0].phoneNumber);
    localStorage.setItem('company', this.formOne[0].company);
    localStorage.setItem('designation',this.formOne[0].designation);
    localStorage.setItem('country',this.formOne[0].country);
    localStorage.setItem('department', this.formOne[0].department);
  }
  elements: any = [];
  headElements = ['id', 'first', 'last', 'handle'];

  selecteddata(data,index,template){
  document.getElementsByClassName("deletconfm")[index].classList.add("isdelet")

    this.modalRef = this.modalService.show(template)

  console.log("index",index);
  this.selectedIndex=index;
//   document.getElementsByClassName("onemyred")[index].classList.add("testdelet");
  
  }

  infoModelSubmit(){
    // console.log("pricecheckbox",this.pricecheckbox);
    // console.log("stopcheckbox",this.stopcheckbox);
    // console.log("plancheckbox",this.plancheckbox);
    // console.log("feedbackbox",this.feedbackbox);
    
    this.modalRef.hide();
  }

  unsubscribeYes(index){
    this.modalRef.hide();
    // console.log("myindex",index);
  }
  unsubscribeNo(index){
  document.getElementsByClassName("deletconfm")[index].classList.remove("isdelet")
  }
  deletCard(data,index){
    this.deletCardIndex=index;
    document.getElementsByClassName("deletconfm")[index].classList.add("isdeletcard")
  }
  confrmDeleteCard(index){
    // console.log("myindex",index);
  }
  cancelDeleteCard(index){
    document.getElementsByClassName("deletconfm")[index].classList.remove("isdeletcard")
  }

  defaultcardselect(data,index){
    this.defaultcard= index;
    console.log("myDefaultCard",data.select);
    if(data.select == "Set Default"){
      data.select="Default"
    }else{
      data.select="Set Default"
    }
  }
}
