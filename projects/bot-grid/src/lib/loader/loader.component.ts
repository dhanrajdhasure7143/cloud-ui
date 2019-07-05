import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ez-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() loading: boolean;
  constructor() { }

  ngOnInit() {
  }

}
