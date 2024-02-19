import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastModule } from "primeng/toast";
import { TriStateCheckboxModule } from "primeng/tristatecheckbox";
import { CheckboxModule } from "primeng/checkbox";
import { ListboxModule } from "primeng/listbox";
import { CardModule } from "primeng/card";
import { TabViewModule } from "primeng/tabview";
import { MenuModule } from "primeng/menu";
import { SplitterModule } from "primeng/splitter";
import { SidebarModule } from "primeng/sidebar";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { TableModule } from "primeng/table";
import { CalendarModule } from "primeng/calendar";
import { SliderModule } from "primeng/slider";
import { MultiSelectModule } from "primeng/multiselect";
import { ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from "primeng/progressbar";
import { InputTextModule } from "primeng/inputtext";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessageModule } from "primeng/message";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InplaceModule } from "primeng/inplace";
import { TreeModule } from "primeng/tree";
import { RadioButtonModule } from "primeng/radiobutton";
import { ImageModule } from "primeng/image";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ChipsModule } from "primeng/chips";
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from "primeng/api";
import {KnobModule} from 'primeng/knob';
import {TooltipModule} from 'primeng/tooltip';
import {DragDropModule} from 'primeng/dragdrop';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {AvatarModule} from 'primeng/avatar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SkeletonModule} from 'primeng/skeleton';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule,
    TriStateCheckboxModule,
    CheckboxModule,
    ListboxModule,
    CardModule,
    TabViewModule,
    MenuModule,
    SplitterModule,
    SidebarModule,
    OverlayPanelModule,
    TableModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    ConfirmDialogModule,
    MessageModule,
    FileUploadModule,
    InputTextareaModule,
    InplaceModule,
    TreeModule,
    RadioButtonModule,
    InputTextareaModule,
    AutoCompleteModule,
    ChipsModule,
    ConfirmPopupModule,
    KnobModule,
    TooltipModule,
    DragDropModule,
    TieredMenuModule,
    RippleModule,
    BreadcrumbModule,
    AvatarModule,
    ToggleButtonModule,
    SplitButtonModule,
    SkeletonModule,
    InputSwitchModule,
    ProgressSpinnerModule
  ],
  exports: [
    ToastModule,
    CommonModule,
    TriStateCheckboxModule,
    CheckboxModule,
    ListboxModule,
    CardModule,
    TabViewModule,
    MenuModule,
    SplitterModule,
    SidebarModule,
    OverlayPanelModule,
    TableModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    ConfirmDialogModule,
    MessageModule,
    FileUploadModule,
    InputTextareaModule,
    InplaceModule,
    TreeModule,
    RadioButtonModule,
    MessageModule,
    ImageModule,
    AutoCompleteModule,
    ChipsModule,
    ConfirmPopupModule,
    KnobModule,
    TooltipModule,
    DragDropModule,
    TieredMenuModule,
    BreadcrumbModule,
    AvatarModule,
    ToggleButtonModule,
    SplitButtonModule,
    SkeletonModule,
    InputSwitchModule,
    ProgressSpinnerModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class PrimengCustomModule {}
