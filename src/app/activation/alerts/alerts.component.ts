import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/_services/alerts.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  checkboxes:any = [];
  checkboxValue:any = [];
  result: void;
  checkedData: any;
  demo: any = [];
  application: any = [];
  listOfNames: any = [];
  listOfId: any = [];
  Follow_list: any;


  constructor(private alertservice: AlertsService) { }

  ngOnInit() {
    this.getApplication();
  }

  saveConfig() {
       let data = this.checkboxValue
     this.alertservice.saveConfig(data).subscribe(res => this.successCallbackSubmit(res))
  }
  successCallbackSubmit(data) {
    Swal.fire({
      icon: 'success',
      text: 'Successfully Updated'
       });
  }
  saveClick(item,e){
 
  }
  changeProduct(i,event){

    if(event.target.checked){
   this.checkboxValue.push(i.id)
    }
    if(!event.target.checked){
      const index = this.checkboxValue.findIndex(list => list.id == i);//Find the index of stored id
      this.checkboxValue.splice(index, 1);
    }
    
  }

  onChange(product){
    this.alertservice.alertsConfig(product).subscribe(res => this.successCallback(res))
  }
  successCallback(data) {
   this.checkboxes = data
    data.forEach(element => {
      if(element.userSelected)
      this.checkboxValue.push(element.id)      
    });
  }

  getApplication(){
    this.alertservice.applications().subscribe(resp => {
        this.application = resp;
      this.application.forEach(element => {
        this.listOfNames.push(element)
        this.listOfId.push(element.app_id)
      })
    })
  }
}
