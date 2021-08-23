import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { WorkflowEditService } from '../../../@providers/workflowedit.service';
import { Robotlogs } from '../../../@models/workflowRobot';

@Component({
  selector: 'app-robotactions',
  templateUrl: './robotactions.component.html',
  styleUrls: ['./robotactions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RobotactionsComponent implements OnInit {

  @Output() isLabels = new EventEmitter<boolean>(false);
  displayLabels;

  logs:Robotlogs[] ;
  constructor(private workflowEditService:WorkflowEditService) { }

  ngOnInit() {
  }

  showLables(event) {
    this.isLabels.emit(this.displayLabels);
  }

  getVersionsofRobot(){
  this.workflowEditService.getVersionsofRobot('2555').subscribe(res =>{
    this.logs = res;
  });
  }

  getRobotLog(tablename,roleid){
  this.workflowEditService.getRobotLog(tablename, roleid).subscribe(res =>{ 
    console.log(res)
  });
  }
  executeRobot(data){
  this.workflowEditService.executeRobot(data).subscribe(res=>{
  console.log(res);
  });
  }
  debug_Order(data){
    this.workflowEditService.debug_Order(data).subscribe(res =>{
    console.log(res);
  });
  }

}
