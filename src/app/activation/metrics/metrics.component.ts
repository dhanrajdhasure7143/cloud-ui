import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/_services/profile.service';

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
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#66ccff', '#ff4d88']
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
    domain: ['#99ff33', '#cc6600', '#cc00cc', '#660033','#ffff99', '#999966']
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
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };
  cards: any;
  subscribedproductscount: any;
  count: any;
  vaultkeycount: any=[];
  alertsCountBasedOnType: any=[];
  registeredvsinvited: any=[];
  


  constructor( private profileService:ProfileService) { }

  ngOnInit() {
    
    //this.alertsCountBasedOnType=[{"name":"No data found","value": "0"}];

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
  }
 
getAllUsersList(){

  this.tenantId = localStorage.getItem("tenantName");
  this.userManagement = [];
  this.profileService.getTenantbasedusersDetails(this.tenantId).subscribe(resp=>{
    console.log("responseeeeee", resp);
      this.userManagementresponse = resp
        
      });
}

getDepartments()
{
  this.profileService.getDepartments().subscribe(resp=>{
      this.departments = resp
        
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
        })
      }

      getCardsCount()
      {
        this.profileService.getCardsCount().subscribe(cards=>{
          this.cards=cards;
          console.log("cards",this.cards)
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
}
