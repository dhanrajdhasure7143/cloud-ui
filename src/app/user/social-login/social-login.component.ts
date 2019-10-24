import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {
  email: any;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
     
       this.email = params['email']
      console.log(this.email);
      // if(email){
      //   this.router.navigate['/user']
      // }
    
    });

}
}

