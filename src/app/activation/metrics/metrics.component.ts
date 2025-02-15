import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ProfileService } from 'src/app/_services/profile.service';
import moment from 'moment';
import Chart from 'chart.js';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
  tenantId: string;
  role: string;
  public notificationList: any;
  notificationscount: any;
  tableData: any;
  userManagement: any[];
  currentUserId: string;
  userManagementresponse: any[];
  departments: any;
  emailtemplateslist: any;
  processnames: any;
  public botnames: any;
  dChart1:any = [];
  data: any;

 //user vs role bar chart
 uservsrole: any=[];
 view: any[] = [600, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Role';
  showYAxisLabel = true;
  yAxisLabel = 'User';

  colorScheme = {
    domain: ['#b55a30', '#0072b5', '#00a170', '#926aa6','#66ccff', '#ff4d88']
  };
  
  // Secret name vs key count
  secretvskeycount:any;
  view1: any[] = [600, 400];
  showXAxis1 = true;
  showYAxis1 = true;
  gradient1 = false;
  showLegend1 = true;
  showXAxisLabel1 = true;
  xAxisLabel1 = 'Secret Name';
  showYAxisLabel1 = true;
  yAxisLabel1 = 'Key Count';

  colorScheme1 = {
    domain: ['#99ff33', '#e94b3c', '#bc70a4', '#944743','#dbb1cd', '#00a591']
  };

  // Activitvy vs alert grouped chart
  activityvsalert:any=[];
  view2: any[] = [600, 400];
  showXAxis2: boolean = true;
  showYAxis2: boolean = true;
  gradient2: boolean = false;
  showLegend2: boolean = true;
  showXAxisLabel2: boolean = true;
  xAxisLabel2: string = 'Activity';
  showYAxisLabel2: boolean = true;
  yAxisLabel2: string = 'Alert Count';
  legendTitle: string = 'Years';

  colorScheme2 = {
    domain: ['#e64d19', '#ce3175', '#e9897e','#578ca9']
  };
  cards: any;
  subscribedproductscount: any;
  count: any;
  vaultkeycount: any=[];
  alertsCountBasedOnType: any=[];
  registeredvsinvited: any=[];
  alertuserroles: string;
  chart6: any;
 alerttransction: any;
  
 modalRef: BsModalRef;
 config = {
  animated: false,
  ignoreBackdropClick: true
};
years: any[];
from_date: any;
to_date: any;
  // fromyear: any=[];
  // toyear: any=[];
  from_month: any;
  to_month: any;
  from_year: any=[];
  months: any[];
  public yearmodel:any={};
  constructor( private profileService:ProfileService,private modalService: BsModalService) { }

  ngOnInit() {
    let years=[];
    let currentdate=new Date();
    let year=currentdate.getFullYear()-10;
    for(var i=1;i<11;i++)
      years.push(year+i)
    this.years=years;
    //this.alertsCountBasedOnType=[{"name":"No data found","value": "0"}];

    let months=[];
    months=["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    this.months=months;

    this.getVaultKeysCount();  
    this.getCardsCount();
    this.getAllUsersList();
    this.getDepartments();
    this.getListOfEmailTemplates();
    this.getProcesses();
    this.getAllBots();
    this.getSubscribedProductsCount();
    this.getUserRoleMetrics();
    this.getAlertsActivityKPI();
    this.getalertsCountBasedOnType();
    this.getRegisteredvsInvitedMetrics();
    this.getAlertTransactions();
  }
 
  click(){
    document.getElementById("drop").style.display='block';
  }
  openDialog(template){
  this.modalRef = this.modalService.show(template,this.config)
  
}

cancelFilter(){
  this.modalRef.hide();
  document.getElementById("drop").style.display='none';
}

getAllUsersList(){

  this.tenantId = localStorage.getItem("tenantName");
  this.userManagement = [];
  this.profileService.getTenantbasedusersDetails(this.tenantId).subscribe(resp=>{
        this.userManagementresponse = resp
        
      });
}

getDepartments()
{
  this.profileService.getDepartments().subscribe(resp=>{
    let departmentcount=resp.data
    this.departments = departmentcount
      });
}

getListOfEmailTemplates()
      {
        this.profileService.getEmailTemplates().subscribe(data => {
          this.emailtemplateslist=data
        })
      }

      getProcesses()
      {
        this.profileService.getprocessnames().subscribe(processnames=>{
          let process_arr:any=[];
          process_arr=processnames;
          this.processnames=processnames;
        })
      }

      getAllBots()
      {
        this.profileService.getAllActiveBots().subscribe(bots=>{
          this.botnames=bots;
          if(this.botnames.errorMessage=="No data found"){
            this.botnames=[];
          }
        })
      }

      getCardsCount()
      {
        this.profileService.getCardsCount().subscribe(cards=>{
          this.cards=cards;
         
        })
      }

      getSubscribedProductsCount()
      {
        this.profileService.getSubscribedProductsCount().subscribe(count=>{
          this.subscribedproductscount=count;
          this.count=this.subscribedproductscount.Products
        })
      }

      getUserRoleMetrics()
      {
        this.tenantId=localStorage.getItem('tenantName')
        this.profileService.getUserRoleMetrics(this.tenantId).subscribe(userrole=>{
          this.uservsrole=userrole
        })
      }

      getVaultKeysCount()
      {
        this.tenantId=localStorage.getItem('tenantName')
        this.profileService.getVaultKeysCount(this.tenantId).subscribe(vault=>{
          this.vaultkeycount=vault
        })
      }

      getAlertsActivityKPI()
      {
        this.profileService.getAlertsActivityKPI().subscribe(count=>{
          this.activityvsalert=count
        })
      }

      getalertsCountBasedOnType()
      {
        this.profileService.getalertsCountBasedOnType().subscribe(count=>{
          this.alertsCountBasedOnType=count
        })
      }

      getRegisteredvsInvitedMetrics()
      {
        this.tenantId=localStorage.getItem('tenantName')
        this.profileService.getUsersMetrics(this.tenantId).subscribe(count=>{
          this.registeredvsinvited=count
        })
      }

      dateranges(from , to)
      {
        var arr = new Array(), dt = new Date(from);
        while (dt <= to) {
          arr.push(new Date(dt));
          dt.setDate(dt.getDate() + 1);
        }
        return arr;
      }

      submitbydate(form:NgForm){
        document.getElementById("drop").style.display='none';
        this.tenantId=localStorage.getItem('tenantName');
        this.alertuserroles=localStorage.getItem('userRole');
        // this.profileService.getalerttransactions(this.tenantId).subscribe(alertresponse => {
          // this.alert_main_list=alertresponse
        let filterdata:any=[];
        let success:any=[];
        let failed:any=[];
        let total:any=[];
        let labels:any=[];
        
          let from:any=this.from_date;
          let to:any=this.to_date;
          let todate=new Date(to);
          let fromdate=new Date(from);
          
          let date_array=this.dateranges(fromdate,todate);
          date_array.forEach(date=>{
            labels.push(moment(date).format("D-MM-YYYY"));
            success.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("D-MM-YYYY")==moment(date).format("D-MM-YYYY") && alert.type=='Success')).length))
            failed.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("D-MM-YYYY")==moment(date).format("D-MM-YYYY") && alert.type=='Failure')).length))
            total.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("D-MM-YYYY")==moment(date).format("D-MM-YYYY"))).length))
          });
          this.linechart(labels,success,failed,total)
          this.modalRef.hide();
          document.getElementById("drop").style.display='none';
          form.resetForm();
       // });
        }
        submitbymonth(form:NgForm){
          let success:any=[];
          let failed:any=[];
          let total:any=[];
          let labels:any=[];
          let year=this.from_year;
          let from_month=this.from_month;
          let to_month=this.to_month;
          let months=["January","February","March","April","May","June","July",
          "August","September","October","November","December"];
          let finalmonths:any=months.slice(months.indexOf(from_month),months.indexOf(to_month)+1);
    
 
          finalmonths.forEach(date=>{
            labels.push(date+"-"+year);
            success.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("MMMM-YYYY")==(date+"-"+year) && alert.type=='Success')).length))
            failed.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("MMMM-YYYY")==(date+"-"+year) && alert.type=='Failure')).length))
            total.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("MMMM-YYYY")==(date+"-"+year))).length))
          });
          this.linechart(labels,success,failed,total)
          this.modalRef.hide();
          document.getElementById("drop").style.display='none';
          form.resetForm();
        }

        submitbyyear(form:NgForm){
          let success:any=[];
          let failed:any=[];
          let total:any=[];
          let labels:any=[];
          let from_year=this.yearmodel.fromyear_graph;
          let to_year=this.yearmodel.to_yeargraph;
          let years:any=[];
          for(let p=1; from_year<=to_year;p++)
            years.push(from_year++);
 
          years.forEach(date=>{
            labels.push(date);
            success.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("YYYY")==(date) && alert.type=='Success')).length))
            failed.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("YYYY")==(date) && alert.type=='Failure')).length))
            total.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("YYYY")==(date))).length))
          });
          this.linechart(labels,success,failed,total)
          this.modalRef.hide();
          document.getElementById("drop").style.display='none';
          form.resetForm();
        }

        resetbottransactions()
  {
    let to=new Date();
      let from=new Date();
      from.setDate(to.getDate()-30);
      let dates:any=this.dateranges(from,to)
      let labels:any=[];
      let success:any=[];
      let failed:any=[];
      let stopped:any=[];
      let total:any=[];
      dates.forEach(date=>{
        labels.push(moment(date).format("D-MM-YYYY"));
        success.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("D-MM-YYYY")==moment(date).format("D-MM-YYYY") && alert.botStatus=='Success')).length))
        failed.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("D-MM-YYYY")==moment(date).format("D-MM-YYYY") && alert.botStatus=='Failure')).length))
        total.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("D-MM-YYYY")==moment(date).format("D-MM-YYYY"))).length))
      });
      this.linechart(labels,success,failed,total)

  }
        
      getAlertTransactions(){
        this.tenantId=localStorage.getItem('tenantName');
        this.alertuserroles=localStorage.getItem('userRole');
         this.profileService.getalerttransactions(this.tenantId).subscribe(alertresponse => {
          
         this.alerttransction=alertresponse;
          let to=new Date();
          let from=new Date();
          from.setDate(to.getDate()-30);
          let dates:any=this.dateranges(from,to)
          let labels:any=[];
          let success:any=[];
          let failed:any=[];
          let total:any=[];
          dates.forEach(date=>{
            labels.push(moment(date).format("D-MM-YYYY"));
            success.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("D-MM-YYYY")==moment(date).format("D-MM-YYYY") && alert.type=='Success')).length))
            failed.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("D-MM-YYYY")==moment(date).format("D-MM-YYYY") && alert.type=='Failure')).length))
            total.push((this.alerttransction.filter(alert=>(moment(alert.audit.created_at).format("D-MM-YYYY")==moment(date).format("D-MM-YYYY"))).length))
          });
          this.linechart(labels,success,failed,total)
        });
    
      }

      linechart(labels,success,failed,total)
      {
    
          this.chart6 = new Chart('linechart', {
                        type: 'line',
                          data: {
                            labels: labels,
                            datasets: [
                            {
                              label: 'Success',
                              borderColor: "#2eb82e",
                              pointBackgroundColor: "#2eb82e",
                              backgroundColor: "rgba(0,255,0,0.2)",
                              fill: true,
                              data: success,
                            },
                            {
                              label: 'Failure',
                              borderColor: "#ff3300",
                              pointBackgroundColor: "#ff3300",
                              backgroundColor: "rgba(255,0,0,0.2)",
                              fill: true,
                              data: failed,
                            },
                            {
                              label: 'Total',
                              borderColor: "#00ace6",
                              pointBackgroundColor: "#00ace6",
                              backgroundColor: "rgba(0,0,255,0.2)",
                              fill: true,
                              data: total,
                            }
                          ]
                          },
    
    
                          options: {
                            responsive: true,
                            legend: {
                              display: true,
                              position:'right',
                              labels: {
                                padding:10,
                              }
                            },
                            scales: {
                              yAxes: [{
                                scaleLabel: {
                                     display: true,
                                     labelString: 'No of Alerts'
                                   },
                                  display: true,
                                  position: 'left',
                                  ticks:{
                                      beginAtZero:true
                                      }
                              }],
                              xAxes: [{
                                scaleLabel: {
                                     display: true,
                                     labelString: 'Transaction Date'
                                   },
                                ticks: {
                                     autoSkip: false,
                                     maxRotation: 90,
                                     minRotation: 90
                                 }
                               }]
                             }
                          }
                      });
    
      }
}
@Pipe({name: 'Slicedate'})
export class Slicedate implements PipeTransform {
  transform(value: any,arg:any)
  {
    let selectedArray:any=[]
    selectedArray=value;
    return selectedArray.slice(selectedArray.indexOf(arg),selectedArray.length);
  }
}