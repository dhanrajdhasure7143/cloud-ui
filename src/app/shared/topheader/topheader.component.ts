import { ContentfulConfig } from './../../contentful/models/contentful-config';
import { ContentfulConfigService } from './../../contentful/services/contentful-config.service';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AppService } from 'src/app/_services';

@Component({
  selector: 'topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.scss']
})
export class TopheaderComponent implements OnInit {

  @ViewChild(BsDropdownDirective) bsdropdown: BsDropdownDirective;
  @ViewChildren(BsDropdownDirective) bsDropdown: QueryList<BsDropdownDirective>;
  compIndex = 0;
  dropdown;
  constructor(@Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig, private route: Router, private appser: AppService) { }

  ngOnInit() {
  }

  toogleDropdown(event, index) {
    let dropdown: BsDropdownDirective;
    if (this.dropdown) {
      this.dropdown.hide();
    }
    if (this.bsDropdown && index) {
      this.bsDropdown.forEach(item => {
        if (item['_elementRef'].nativeElement.localName === 'bot-infopanel') {
          this.dropdown = item;
        } else if (this.dropdown) {
          this.dropdown = item;
        }
      });
    } else {
      this.dropdown = this.bsdropdown;
    }
    if (this.dropdown) {
      if (this.dropdown.isOpen && this.compIndex !== index) {
        this.dropdown.toggle(false);
      }
      this.dropdown.toggle(true);
      this.dropdown.autoClose = true;
      this.compIndex = index;
      this.sharedconfig.events.bsDropdown = this.dropdown;
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
