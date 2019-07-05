import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';

import { SharedRoutingModule } from './shared-routing.module';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { DynamicCompHostDirective } from './dynamic-comp-host.directive';
import { AccordionComponent } from './accordion/accordion/accordion.component';
import { AccordionGroupComponent } from './accordion/accordion-group/accordion-group.component';
import { InfopanelComponent } from './infopanel/infopanel.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SystemComponent } from './infopanel/system/system.component';
import { UserComponent } from './infopanel/user/user.component';
import { NotificationComponent } from './infopanel/notification/notification.component';

@NgModule({
  declarations: [SideNavBarComponent, HeaderComponent, ContentComponent, DynamicCompHostDirective, AccordionComponent, AccordionGroupComponent, InfopanelComponent, SystemComponent, UserComponent, NotificationComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    BsDropdownModule.forRoot(),
    PortalModule
  ],
  exports: [SideNavBarComponent, HeaderComponent, ContentComponent, DynamicCompHostDirective, AccordionComponent, AccordionGroupComponent, InfopanelComponent],
  entryComponents: [SideNavBarComponent, HeaderComponent, ContentComponent, UserComponent, SystemComponent, NotificationComponent]
})
export class SharedModule { }
