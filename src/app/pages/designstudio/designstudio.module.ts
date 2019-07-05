import { PopoverModule, ModalModule, TabsModule, AccordionModule } from 'ngx-bootstrap';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ngx-drag-drop';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { DesignstudioRoutingModule } from './designstudio-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { WorkfloweditComponent } from './home/workflowedit/workflowedit.component';
import { CanvasComponent } from './home/workflowedit/canvas/canvas.component';
import { ToolsetComponent } from './home/workflowedit/toolset/toolset.component';
import { NodepropComponent } from './home/workflowedit/nodeprop/nodeprop.component';
import { RobotactionsComponent } from './home/workflowedit/robotactions/robotactions.component';
import { TextBoxComponent } from './input-fields/textbox';
import { DropDownComponent } from './input-fields/dropdown';
import { FileComponent } from './input-fields/file';
import { CheckBoxComponent } from './input-fields/checkbox';
import { TableComponent } from './input-fields/table';
import { RadioComponent } from './input-fields/radio';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonSourceComponent } from './@dynamicComp/common/common-source.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { WorkflowcreateComponent } from './home/workflowcreate/workflowcreate.component';
import { CreatebotComponent } from './home/createbot/createbot.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BotGridModule } from 'bot-grid';


@NgModule({
  declarations: [HomeComponent, WorkfloweditComponent, CanvasComponent, ToolsetComponent, NodepropComponent, RobotactionsComponent, TextBoxComponent,
    DropDownComponent, FileComponent,
    CheckBoxComponent, TableComponent,
    RadioComponent, CommonSourceComponent, WorkflowcreateComponent, CreatebotComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    DesignstudioRoutingModule,
    SharedModule,
    DndModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    BotGridModule
  ],
  exports: [HomeComponent, WorkfloweditComponent, CanvasComponent, ToolsetComponent, NodepropComponent, RobotactionsComponent, WorkflowcreateComponent, CreatebotComponent],
  entryComponents: [TextBoxComponent, DropDownComponent, FileComponent, CheckBoxComponent, TableComponent, RadioComponent, CommonSourceComponent],
  providers:[Ng4LoadingSpinnerService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DesignstudioModule { }
