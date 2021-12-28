import { ApplicationRef, Component, HostListener, Inject } from '@angular/core';
import { ContentfulConfig } from './contentful/models/contentful-config';
import { ContentfulConfigService } from './contentful/services/contentful-config.service';
import { UserIdleService } from 'angular-user-idle';
import { AuthenticationService } from './_services';
import { ProductlistService } from './_services/productlist.service';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
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
   private authservice: AuthenticationService, private productservice: ProductlistService, 
   private update:SwUpdate,private appRef: ApplicationRef,private toastr: ToastrService) {
    // this.updateClient();
    // this.checkUpdate();
    }

  @HostListener('click') onClick() {
    if (this.sharedconfig.events.bsDropdown) {
      this.sharedconfig.events.bsDropdown.hide();
    }
    this.sharedconfig.events.bsDropdown = null;
  }
  ngOnInit() {
    addEventListener("offline",(e)=>{
      this.toastr.error('Please check your internet connection');
    });
    addEventListener("online",(e)=>{
      this.toastr.success('You are now online');
    })
    //Start watching for user inactivity.
    this.userIdle.startWatching();
    this.userIdle.ping$.subscribe(() => {
      if(localStorage.getItem("userName") != null){
      this.productservice.getNewAccessToken().subscribe(resp=>{
        this.newAccessToken=resp
        localStorage.setItem('currentUser', JSON.stringify(this.newAccessToken));
      });
      }
    });
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe();
    
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
  updateClient() {
    if (!this.update.isEnabled) {
   
      return;
    }
    this.update.available.subscribe((event) => {
     
      if (confirm('update available for the app please conform')) {
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
   
    });
  }

  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(8 * 60 * 60 * 1000);
        timeInterval.subscribe(() => {
          
          this.update.checkForUpdate().then(() => {});
         
        });
      }
    });
  }
}
