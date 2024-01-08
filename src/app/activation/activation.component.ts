import { Component, OnInit, ViewChild, Inject, ViewChildren, QueryList } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { ContentfulConfigService } from './../contentful/services/contentful-config.service';
import { ContentfulConfig } from './../contentful/models/contentful-config';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services';
import { SharedDataService } from '../_services/shared-data.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  @ViewChild(BsDropdownDirective,{static: false}) bsdropdown: BsDropdownDirective;
  @ViewChildren(BsDropdownDirective) bsDropdown: QueryList<BsDropdownDirective>;
  compIndex = 0;
  dropdown;
  email: any;
  constructor(@Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig, private route: Router, private router: ActivatedRoute, private authenticationService: AuthenticationService,  private sharedData: SharedDataService) { }

  ngOnInit() {
    // localStorage.clear();
    // this.router.queryParams.subscribe(params => {
    //  this.email = params['email']
    // });
    // this.authenticationService.userDetails(this.email).subscribe(data => this.checkSuccessCallback(data));
}
// checkSuccessCallback(data:any){
//   this.sharedData.setLoggedinUserData(data);
//   console.log("social login data-----", data);
//   localStorage.setItem('firstName',data.firstName);
//   localStorage.setItem('lastName',data.lastName);
//   localStorage.setItem('userName',data.userId);
//   localStorage.setItem('tenantName',data.tenantId.name);
//   localStorage.setItem('phoneNumber',data.phoneNumer);
//  //localStorage.setItem('company', data.company);
//   localStorage.setItem('designation',data.designation);
//   localStorage.setItem('country',data.country);
// }


  toogleDropdown(event, index) {
    // let dropdown: BsDropdownDirective;
    let dropdown:any;
    if (this.dropdown) {
      this.dropdown.hide();
    }
    // if (this.bsDropdown && index) {
    //   this.bsDropdown.forEach(item => {
    //     if (item['_elementRef'].nativeElement.localName === 'bot-infopanel') {
    //       this.dropdown = item;
    //     } else if (this.dropdown) {
    //       this.dropdown = item;
    //     }
    //   });
    // } else {
    //   this.dropdown = this.bsdropdown;
    // }
    if (this.dropdown) {
      if (this.dropdown.isOpen && this.compIndex !== index) {
        this.dropdown.toggle(false);
      }
      this.dropdown.toggle(true);
      this.dropdown.autoClose = true;
      this.compIndex = index;
      // this.sharedconfig.events.bsDropdown = this.dropdown;
      event.preventDefault();
      event.stopPropagation();
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigate(['/']);
  }

}
