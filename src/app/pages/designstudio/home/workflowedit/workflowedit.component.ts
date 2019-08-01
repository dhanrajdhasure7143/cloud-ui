import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, IterableDiffers, DoCheck, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CanvasComponent } from './canvas/canvas.component';
import { ActivatedRoute } from '@angular/router';
import { ContentfulConfig } from './../../../../contentful/models/contentful-config';
import { ContentfulConfigService } from './../../../../contentful/services/contentful-config.service';
import { WorkflowEditService } from './../../@providers/workflowedit.service';
import Swal from 'sweetalert2';

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
    if (this.route.snapshot.paramMap.get('robot')) {
      const robot = JSON.parse(atob(this.route.snapshot.paramMap.get('robot')));
      this.robotName = robot.NAME;
    }
  }

  ngAfterViewInit() {}

  ngDoCheck() {
  }

  elementSelected(flag: boolean) {
    this.slectedEle = flag;
  }

  selectedElem(node: any) {
    this.node = node;
  }

  clearCanvas() {
    Swal.fire({
      title: 'Are you sure want to clear all the changes?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.value) {
        this.canvas.clearCanvas();
        this.canvas.resetCanvas();
        Swal.fire(
          'You cleared all the changes!',
          'success'
        );
      }
    });
  }

  submitrobot(data) {
    this.workfloweditSer.submitrobot(data).subscribe(res => {
      console.log(res);
    });
  }

  robotCreated(event) {
    this.botName = event.Name;
    this.robot = event;
  }

  updateChanges(event) {
      this.robotChanges = event;
  }
}
