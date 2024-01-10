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
import { TopheaderComponent } from './topheader/topheader.component';
import { BodyComponent } from './body/body.component';
import { TrailheaderComponent } from './trailheader/trailheader.component';
import { StepselectionComponent } from './stepselection/stepselection.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { SearchPipe } from './custom_pipe/searchpipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NotifierModule, NotifierService } from "angular-notifier";
import { FooterComponent } from './footer/footer.component';
import { TermsconditionsComponent } from './termsconditions/termsconditions.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { CompareValidatorDirective } from './comparepsw-validator.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NewstepselectionComponent } from './newstepselection/newstepselection.component';



@NgModule({
    declarations: [SideNavBarComponent,
        HeaderComponent,
        ContentComponent,
        DynamicCompHostDirective,
        AccordionComponent,
        AccordionGroupComponent,
        InfopanelComponent,
        SystemComponent,
        UserComponent,
        NotificationComponent,
        TopheaderComponent,
        BodyComponent,
        TrailheaderComponent,
        StepselectionComponent,
        ProfileComponent,
        SearchPipe,
        FooterComponent,
        TermsconditionsComponent,
        PrivacypolicyComponent,
        CompareValidatorDirective,
        NewstepselectionComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        BsDropdownModule.forRoot(),
        PortalModule,
        FormsModule,
        Ng2TelInputModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        NotifierModule,
        NgSelectModule,
        NgxPaginationModule,
        NgxSpinnerModule,
        Ng2SearchPipeModule
    ],
    providers: [NotifierService],
    exports: [SideNavBarComponent, HeaderComponent, ContentComponent, DynamicCompHostDirective, AccordionComponent, AccordionGroupComponent, InfopanelComponent, TopheaderComponent, BodyComponent, UserComponent, TrailheaderComponent, StepselectionComponent, FooterComponent, NewstepselectionComponent, TermsconditionsComponent, PrivacypolicyComponent]
})
export class SharedModule { }
