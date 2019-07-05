import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ez-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Output() confirmation = new EventEmitter();
  hidden = true;

  ngOnInit() {
  }

  show() {
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }
  confirm() {
    this.confirmation.emit(true);
  }


}
