import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/_services/alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  products = ["Ezflow", "Ezbot"]
  checkboxes = [
    {
      id: 1,
      description: "Bot Creation",
      checked: true,
    },
    {
      id: 2,
      description: "Proceess Creation",
      checked: false,
    },
    {
      id: 3,
      description: "Process Deletion",
      checked: true,

    },
    {
      id: 4,
      description: "Bot Assign",
      checked: false,
    }
  ]
  result: void;
  checkedData: any;
  demo: any = [];


  constructor(private alertservice: AlertsService) { }

  ngOnInit() {
    this.alertservice.alertsConfig().subscribe(res=> this.checkboxes = res)
  }

  saveConfig() {
    console.log(this.checkedData);
    
    let data = {
      "id" : this.checkedData.id,
      "activity" : "",
      "description" : this.checkedData.description,
      "created_at" : null,
      "modified_at" : null,
      "app_id" : {}
    }
    this.alertservice.saveConfig(data).subscribe(res => this.successCallback(data))
  }
  saveClick(item){
    console.log(item);
    
    this.checkedData = item
  }
  successCallback(data) {
    alert(data.message)
  }

}
