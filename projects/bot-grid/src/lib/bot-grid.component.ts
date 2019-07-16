import { Component, OnInit, ViewChild, Input, EventEmitter, OnChanges, DoCheck, Output } from '@angular/core';
import { AlertComponent } from './alert/alert.component';


@Component({
  selector: 'aiotal-bot-grid',
  templateUrl: './bot-grid.component.html',
  styleUrls: ['./bot-grid.component.css']
})
export class BotGridComponent implements OnInit, OnChanges, DoCheck {

  @ViewChild(AlertComponent) alert: AlertComponent;
  @Input() columnDefs: any[] = [];
  @Input() rowData: any[] = [];
  @Output() rowClick = new EventEmitter<any>();

  searchText = '';
  numbers = [];
  noOfPages = 15;
  keyOfObjects;
  sortType = 'asec';
  filterKeys = [];
  sortKey;
  pageSize = 15;
  currentPage = 1;
  students: any = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.noOfPages = Math.round(this.rowData.length / this.pageSize);
    this.numbers = Array((this.noOfPages)).fill({}).map((x, i) => i);
  }

  ngDoCheck() {
    this.noOfPages = Math.round(this.rowData.length / this.pageSize);
    this.numbers = Array((this.noOfPages)).fill({}).map((x, i) => i);
  }

  showAlert() {
    this.alert.show();
  }

  handleConfirm(value) {
    this.alert.hide();
  }

  setPage(value) {
    this.currentPage = value;
  }

  setPagePrev() {
    if (this.currentPage !== 0) {
      this.currentPage = this.currentPage - 1;
    }
  }

  setPageNext() {
    if (this.currentPage < this.noOfPages - 1) {
      this.currentPage = this.currentPage + 1;
    }
  }

  filterCall(event) {
    if (event.target.checked) {
      this.filterKeys.push(event.target.name);
    } else {
      this.filterKeys.pop();
    }
  }

  sortById(value) {
    this.sortKey = value;
    if (this.sortType === 'asec') {
      this.sortType = 'desc';
    } else {
      this.sortType = 'asec';
    }
  }

  getRowData(data) {
    this.rowClick.emit(data);
  }

}
