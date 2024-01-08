import { ContentfulConfig } from './../../contentful/models/contentful-config';
import { ContentfulConfigService } from './../../contentful/services/contentful-config.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { element } from 'protractor';

@Component({
  selector: 'bot-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {
  @ViewChild(BsDropdownDirective,{static:false}) bsDropdown: BsDropdownDirective;
  compIndex = 0;
  constructor(@Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig) { }

  ngOnInit() {
  }

  toogleDropdown(event, index) {
    if (this.bsDropdown.isOpen && this.compIndex !== index) {
      this.bsDropdown.toggle(false);
    }
    this.bsDropdown.toggle(true);
    this.bsDropdown.autoClose = true;
    this.compIndex = index;
    // this.sharedconfig.events.bsDropdown = this.bsDropdown;
    event.preventDefault();
    event.stopPropagation();
  }

}
