import { Component, OnInit, Inject } from '@angular/core';
import { CryptoService } from 'src/app/_services/crypto.service';
import { APP_CONFIG } from './../../app.config';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {

  constructor(private crypto:CryptoService,@Inject(APP_CONFIG) private config,) { }

  ngOnInit() {
    var token=JSON.parse(localStorage.getItem('currentUser'));
    var encryptToken=btoa(token.accessToken)
    var encryptrefreshToken=btoa(token.refreshToken);
    var firstName=localStorage.getItem('firstName');
    var lastName=localStorage.getItem('lastName');
    var ProfileuserId=localStorage.getItem('ProfileuserId');
    var tenantName=localStorage.getItem('tenantName');
    var userId= this.crypto.encrypt(JSON.stringify(localStorage.getItem('ProfileuserId')));
    var useridBase64 = btoa(userId);
    var userIp=btoa(localStorage.getItem('ipAddress'));
    var productURL = this.config.productendpoint;
    if(this.config.isNewDesignEnabled)
        productURL = this.config.newproductendpoint;
      //  if(this.getCookie("new_reg_flow")=="true"){
        window.location.href=productURL+"/#/pages/home?accessToken="+encryptToken+'&refreshToken='+encryptrefreshToken+'&firstName='+firstName+'&lastName='+lastName+'&ProfileuserId='+ProfileuserId+'&tenantName='+tenantName+'&authKey='+useridBase64+'&userIp='+userIp
      //  }
  }

}
