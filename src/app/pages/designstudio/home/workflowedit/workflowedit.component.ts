import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, IterableDiffers, DoCheck, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CanvasComponent } from './canvas/canvas.component';
import { ActivatedRoute } from '@angular/router';
import { ContentfulConfig } from './../../../../contentful/models/contentful-config';
import { ContentfulConfigService } from './../../../../contentful/services/contentful-config.service';
import { WorkflowEditService } from './../../@providers/workflowedit.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Component({
  selector: 'app-workflowedit',
  templateUrl: './workflowedit.component.html',
  styleUrls: ['./workflowedit.component.scss']
})
export class WorkfloweditComponent implements OnInit, AfterViewInit, DoCheck {
  public node;
  public slectedEle: boolean = false;
  public botName;
  public robotName;
  public bot;
  @ViewChild(CanvasComponent) canvas: CanvasComponent;
  public robot = {};
  public robotChanges = {};
  public differ: any;

  constructor(@Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig, private route: ActivatedRoute, private differs: IterableDiffers, private workfloweditSer: WorkflowEditService) {
    this.differ = differs.find([]).create(null);
    sharedconfig.canvas.defaultEle = new Subject<any>();
   }

  ngOnInit() {

    const obj = {Type: 'AllRobotsByPrjId', Project_Id: '877'};

    this.workfloweditSer.getAllRobotsByPrjId(obj).subscribe(res => {
      console.log('SUCESS .... ' + res);
    }, err => {
      console.log('ERROR .... ' +  err);
    });

    if (this.route.snapshot.paramMap.get('workflowrobot')) {
      const robot = JSON.parse(atob(this.route.snapshot.paramMap.get('workflowrobot')));
      robot.canvas = {
        nodes: [],
        edges: []
      };

      this.robotName = robot.Name;
      this.bot = JSON.parse(JSON.stringify(robot));
      this.bot.Name = 'Untitled - 1';
      this.bot.isSelected = true;
      this.botName = this.bot.Name;
      this.robotName = robot.Name;
      this.robot = this.bot;
    }
  }

  ngAfterViewInit() {

  }

  ngDoCheck() {
  }

  elementSelected(flag: boolean) {
    this.slectedEle = flag;
  }

  selectedElem(node: any) {
    this.node = node;
  }

  clearCanvas() {
    this.canvas.clearCanvas();
    this.canvas.resetCanvas();
  }

  robotCreated(event) {
    this.botName = event.Name;
    this.robot = JSON.parse(JSON.stringify(event));
  }

  updateChanges(event) {
    this.robotChanges = JSON.parse(JSON.stringify(event));
  }
}
