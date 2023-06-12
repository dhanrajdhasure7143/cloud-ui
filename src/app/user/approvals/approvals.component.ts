import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_services';
import { Base64 } from 'js-base64';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from 'src/app/_services/profile.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

  public tokenData:any;
  public status:any;
  public http:any;
  public approvalsList:any[]=[];
  
  constructor(private activeRoute:ActivatedRoute, private httpBackend:HttpBackend, private spinner:NgxSpinnerService) {
    this.http=new HttpClient(this.httpBackend);
   }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params:any)=>{
      let tokenData:any=JSON.parse(Base64.decode(params.token));
      this.tokenData=tokenData;
      this.tokenData["status"]=params.status;
      this.status=params.status;
      this.loginUser();
    })
  }

  loginUser()
  {
    this.spinner.show()
    let user=this.tokenData.loggedUser;
    this.http.post(environment.tokenendpoint+"/api/login/beta/token", {userId:user}).subscribe((response:any)=>{
      this.getApprovals(response);
    },err=>{
      this.spinner.hide();
      Swal.fire("Error","Unable to get access token","error");
    })
  }


  getApprovals(authToken:any)
  {
    
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken.accessToken}`)
    .set('Refresh-Token', authToken.refreshToken)
    .set('Timezone', timezone);
    this.http.get(environment.rpaendpoint+`/rpa-service/rpa-inbox/${this.tokenData.toUser}`, {headers}).subscribe((response:any)=>{
      //this.approvalsList=response["data"];
      this.updateApprovals(headers, response["data"])
    },err=>{
      this.spinner.hide();
      Swal.fire("Error","Unable to get pending approvals","error");
    })
  }


  updateApprovals(headers:any, approvals:any[])
  {
    console.log(this.tokenData)
    let filteredApprovals:any[]=[]
    filteredApprovals=approvals.filter((item:any)=>{
      if(item.status=="Pending" && item.botId==this.tokenData.botId && item.runId==this.tokenData.runId)
      {
        
        item["status"]=this.tokenData.status;
        return item;
      }
    });
    console.log(filteredApprovals)
    this.http.post(environment.rpaendpoint+`/rpa-service/update-approval-status`, filteredApprovals, {headers}).subscribe((response:any)=>{
      if(response.status)
      {
        this.spinner.hide();
        this.approvalsList=filteredApprovals;
        Swal.fire("Success", response.status, "success");
      }
      else
      {
        this.spinner.hide();
        Swal.fire("Error","Unable to get update approvals","error");
      }
    },err=>{
      this.spinner.hide();
      Swal.fire("Error","Unable to get update approvals","error");
    })
  }

}
