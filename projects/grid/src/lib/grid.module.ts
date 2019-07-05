import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GridComponent } from './grid.component';
import { HeaderSelectionPipe } from './pipes/header-selection.pipe';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SelectionPipe } from './pipes/selection.pipe';
import { SortingPipe } from './pipes/sorting.pipe';

@NgModule({
  declarations: [GridComponent, SortingPipe, SelectionPipe, SearchPipe, PaginationPipe, AlertComponent, LoaderComponent, HeaderSelectionPipe],
  imports: [CommonModule, FormsModule],
  exports: [GridComponent]
})
export class GridModule { }
