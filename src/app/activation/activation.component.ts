import { Component, OnInit, ViewChild, Inject, ViewChildren, QueryList } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { ContentfulConfigService } from './../contentful/services/contentful-config.service';
import { ContentfulConfig } from './../contentful/models/contentful-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  @ViewChild(BsDropdownDirective) bsdropdown: BsDropdownDirective;
  @ViewChildren(BsDropdownDirective) bsDropdown: QueryList<BsDropdownDirective>;
  compIndex = 0;
  dropdown;
  constructor(@Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig, private route: Router) { }

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
