import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit, OnDestroy, Input, AfterContentInit, OnChanges, EventEmitter } from '@angular/core';
// import { CommonSourceComponent } from './../../../@dynamicComp/common/common-source.component';
// import { DynamicCompHostDirective } from './../../../../../shared/dynamic-comp-host.directive';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import * as _ from 'underscore';
// import { WorkflowEditService } from '../../../@providers/workflowedit.service';


@Component({
  selector: 'app-nodeprop',
  templateUrl: './nodeprop.component.html',
  styleUrls: ['./nodeprop.component.scss']
})
export class NodepropComponent implements OnInit, OnDestroy, AfterContentInit, OnChanges {
  // @ViewChild(DynamicCompHostDirective,{static:false}) dynamicHost: DynamicCompHostDirective;
  // dynamicComponent;
  // component: any;
  // @Input() node = new EventEmitter();
  // nodeactions: any[] = [];
  // title = 'Action Properties';
  // noProp = false;

  // constructor(private http: HttpClient, private componentFactoryResolver: ComponentFactoryResolver, private service: WorkflowEditService) {
  // }
  constructor(){

  }

  ngOnInit() {
    // this.getActionProp();
  }

  ngOnChanges() {
    // this.getActionProp();
  }

  // getActionProp() {
  //   this.dynamicComponent = CommonSourceComponent;

  //   if (this.node) {
  //     this.service.getAllActionProperties().subscribe(items => {
  //       const actions = items;

  //       const actionProp = _._.filter(actions, (action) => {
  //         return action.Action_Id === this.node['Id'];
  //       });

  //       this.title = this.node['Description'];
  //       this.node['actionProp'] = actionProp || [];
  //       if (actionProp && actionProp.length > 0) {
  //         this.noProp = false;
  //       } else {
  //         this.noProp = true;
  //       }
  //       this.dynamicComponent.prototype.setNode(this.node);
  //       this.loadComponent();
  //     });
  //   } else {
  //     this.dynamicComponent.prototype.setNode(this.node);
  //     this.loadComponent();
  //   }
  // }

  ngAfterContentInit() {

  }

  ngOnDestroy() {

  }

  // loadComponent() {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dynamicComponent);
  //   this.dynamicHost.viewContainerRef.clear();
  //   this.dynamicHost.viewContainerRef.createComponent(componentFactory);
  // }

}
