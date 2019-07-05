import { Component, OnInit, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { AccordionGroupComponent } from '../accordion-group/accordion-group.component';

@Component({
  selector: 'bot-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements AfterViewInit {

  @ContentChildren(AccordionGroupComponent) 
  groups: QueryList<AccordionGroupComponent>;

  ngAfterViewInit() {
   setTimeout(() => {
    this.groups.toArray()[0].opened = true;
    this.groups.toArray().forEach((t) => {
      t.toggle.subscribe(() => {
        this.openGroup(t);
      });
    });
   }, 1500);
  }

  openGroup(group: any) {
    this.groups.toArray().forEach((t) => t.opened = false);
    group.opened = true;
  }

}
