import { Component, HostListener, Inject } from '@angular/core';
import { ContentfulConfig } from './contentful/models/contentful-config';
import { ContentfulConfigService } from './contentful/services/contentful-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Aiotal';
  columnDefs = [
    {
      headerName: 'Name',
      field: 'name',
    },
    {
      headerName: 'ID',
      field: 'id'
    },
    {
      headerName: 'Age',
      field: 'age'
    },
    {
      headerName: 'Address',
      field: 'address'
    }
  ];


  gridData = [{
    name: 'begin',
    id: 20,
    age: 23,
    address: 'begin'
  },
  {
    name: 'sneha',
    id: 1,
    age: 23,
    address: 'chennai'
  }
  ];

  constructor(@Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig) {

  }

  @HostListener('click') onClick() {
    if (this.sharedconfig.events.bsDropdown) {
      this.sharedconfig.events.bsDropdown.hide();
    }
    this.sharedconfig.events.bsDropdown = null;
  }
}
