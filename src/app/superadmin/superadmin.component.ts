import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperadminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    setTimeout(() => {
      const iframe = document.getElementById('iframeRef') as HTMLIFrameElement;
      if(iframe){
        console.log("testing.........iframe enabled")
      iframe.contentWindow.postMessage({ action: 'botKey', bot_key: '2CcqXlqqOUjJNFpP5ZCambn7XypBTzuY5ZvaMFPuJpU+kJkzFzxRSDGWApdGUWWwJEovo8HDJwol/t3MaQh8mJbFxQbp230f7SY='}, '*');
      }
    }, 2000);
    
    window.addEventListener('message', event => {
      const message = event.data;
      const iframe = document.getElementById('iframeRef') as HTMLIFrameElement;
      if(iframe){
          iframe.style.height = message.height;
          iframe.style.width = message.width;
      }
  });

}

}
