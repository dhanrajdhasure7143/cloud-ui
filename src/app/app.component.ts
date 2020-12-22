import { Component, HostListener, Inject } from '@angular/core';
import { ContentfulConfig } from './contentful/models/contentful-config';
import { ContentfulConfigService } from './contentful/services/contentful-config.service';
import { UserIdleService } from 'angular-user-idle';
import { AuthenticationService } from './_services';
import { ProductlistService } from './_services/productlist.service';
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
  newAccessToken: any[];

  constructor(@Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig, private userIdle: UserIdleService,
   private authservice: AuthenticationService, private productservice: ProductlistService) { }

  @HostListener('click') onClick() {
    if (this.sharedconfig.events.bsDropdown) {
      this.sharedconfig.events.bsDropdown.hide();
    }
    this.sharedconfig.events.bsDropdown = null;
  }
  ngOnInit() {
    
    //Start watching for user inactivity.
    this.userIdle.startWatching();
    this.userIdle.ping$.subscribe(() => {
      if(localStorage.getItem("userName") != null){
      this.productservice.getNewAccessToken().subscribe(resp=>{
        this.newAccessToken=resp
        console.log("token",resp)
        localStorage.setItem('currentUser', JSON.stringify(this.newAccessToken));
      });
      }
    });
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => this.authservice.logout());
  }
  
 
  stop() {
    this.userIdle.stopTimer();
  }
 
  stopWatching() {
    this.userIdle.stopWatching();
  }
 
  startWatching() {
    this.userIdle.startWatching();
  }
 
  restart() {
    this.userIdle.resetTimer();
  }
}
