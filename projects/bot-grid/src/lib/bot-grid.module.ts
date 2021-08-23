import { NgModule } from '@angular/core';
import { BotGridComponent } from './bot-grid.component';
import { SortingPipe } from './pipes/sorting.pipe';
import { SelectionPipe } from './pipes/selection.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HeaderSelectionPipe } from './pipes/header-selection.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BotGridComponent, SortingPipe, SelectionPipe, SearchPipe, PaginationPipe, AlertComponent, LoaderComponent, HeaderSelectionPipe],
  imports: [CommonModule, FormsModule],
  exports: [BotGridComponent]
})
export class BotGridModule { }
