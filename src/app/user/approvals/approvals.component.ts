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
      localStorage.clear();
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
    let user=JSON.parse(this.tokenData.loggedUser);
    this.http.post(environment.tokenendpoint+"/api/login/beta/token", {userId:user.loggedUser}).subscribe((response:any)=>{
      this.getTenantBasedAccessToken(response, user);
      //this.getApprovals(response);
    },err=>{
      this.spinner.hide();
      Swal.fire("Error","Unable to get access token","error");
    })
  }

  getTenantBasedAccessToken(authToken:any, user:any)
  {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken.accessToken}`)
    .set('Refresh-Token', authToken.refreshToken)
    .set('Timezone', timezone);
    this.http.get(environment.tokenendpoint+"/api/login/beta/newAccessToken?tenant_id="+user.tenantId, {headers}).subscribe((authResponse:any)=>{
      this.getApprovals(authResponse,authToken.refreshToken);
    },err=>{
      this.spinner.hide();
      Swal.fire("Error","Unable to get access token", "error")
    })

  }

  getApprovals(authToken:any, refreshToken:any)
  {
    
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken.accessToken}`)
    .set('Refresh-Token', refreshToken)
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
    let filteredApprovals:any[]=[]
    filteredApprovals=approvals.filter((item:any)=>{
      if(item.status=="Pending" && item.botId==this.tokenData.botId && item.runId==this.tokenData.runId)
      {
        item["modifiedBy"]=this.tokenData.toUser;
        item["status"]=this.tokenData.status;
        return item;
      }
    });
    if(filteredApprovals.length==0)
    {
      this.spinner.hide();
      return;
    }
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
