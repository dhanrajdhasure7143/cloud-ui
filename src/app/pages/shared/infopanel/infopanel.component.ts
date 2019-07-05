import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnChanges, Input, ContentChild, HostListener } from '@angular/core';
import { DynamicCompHostDirective } from './../dynamic-comp-host.directive';
import { SystemComponent } from './system/system.component';
import { NotificationComponent } from './notification/notification.component';
import { UserComponent } from './user/user.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'bot-infopanel',
  templateUrl: './infopanel.component.html',
  styleUrls: ['./infopanel.component.scss']
})
export class InfopanelComponent implements OnInit, OnChanges {
  compList = [UserComponent, SystemComponent, NotificationComponent];
  dynamicComponent;
  @Input() componentIndex;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.componentIndex) {
      this.dynamicComponent = new ComponentPortal(this.compList[this.componentIndex]);
    }
  }

  @HostListener('click',  ['$event']) onClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
