import { Component, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, ViewEncapsulation, Inject, QueryList, ViewChildren, Input, OnChanges, ChangeDetectorRef, DoCheck, IterableDiffers, KeyValueDiffers } from '@angular/core';
import { jsPlumb } from 'jsplumb';
import { DndDropEvent } from 'ngx-drag-drop';
import { ContentfulConfigService, ContentfulConfig } from '../../../../../contentful';
import * as _ from 'underscore';
import { PopoverDirective } from 'ngx-bootstrap';
import { Observable, of } from 'rxjs';

const bottom = {
  endpoint: ['Dot', {radius: 5}],
  isSource: true,
  connector: ['Flowchart', {cornerRadius: 1, alwaysRespectStubs: true}],
  anchor: 'Bottom',
  maxConnections: -1
};

const top = {
  endpoint: ['Dot', {radius: 5}],
  isTarget: true,
  connector: ['Flowchart', {cornerRadius: 1, alwaysRespectStubs: true}],
  anchor: 'Top',
  maxConnections: -1
};

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CanvasComponent implements OnInit, AfterViewInit, OnChanges, DoCheck {
  public jsPlumbInstance;
  public nodes = [];
  public edges = [];
  public defaultEle: any[] = [];
  public isFoucs = false;
  public canvas = {};
  public differ: any;
  public keyValDiffers: any;
  public initialized = false;
  public isLabels = false;

  @Input() robot = new EventEmitter();
  @Output() botChanges = new EventEmitter();
  @Output() selectedElem = new EventEmitter();
  @ViewChildren(PopoverDirective) popovers: QueryList<PopoverDirective>;

  constructor(@Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig, private ref: ChangeDetectorRef, private differs: IterableDiffers, keyValDiffers: KeyValueDiffers) {
    this.differ = differs.find([]).create(null);
    this.keyValDiffers = keyValDiffers.find({}).create();
  }

  ngOnInit() {
    this.initialized = true;
  }

  ngOnChanges() {
    if (this.robot) {
      this.canvas = this.robot;
      this.clearCanvas();
      if (this.robot && this.robot['canvas'] && ((this.robot['canvas']['nodes'] && this.robot['canvas']['nodes'].length === 0) && (this.robot['canvas']['edges'] && this.robot['canvas']['edges'].length === 0))) {
        this.loadNewRobotElems();
      } else {
        this.loadExistRobotElems();
      }
    }
  }

  ngDoCheck() {
    if (this.initialized) {
      const nodechange = this.differ.diff(this.nodes);
      if (nodechange) {
        this.canvas['canvas']['nodes'] = nodechange.collection;
      }
      const edgechange = this.differ.diff(this.edges);
      if (edgechange) {
        this.canvas['canvas']['edges'] = edgechange.collection;
      }
      //const elemChanges = this.keyValDiffers.diff(this.element);
    }
  }

  loadDefaultEle(nodeData: any[]) {
    if (nodeData && nodeData.length > 0) {
      let index1 = 0;
      nodeData.forEach(element => {
        this.draggableEle();
        this.drawCanvasEle(element, index1 === 0 ? '' : top, index1 === 1 ? '' : bottom, index1 === 0 ? 'source' : 'target');
        index1 ++;
      });

      setTimeout(() => {
        this.connectSourceToTargetUsingJSPlumb(nodeData[0].id, nodeData[1].id);
      }, 0);
    }
  }

  loadNewRobotElems() {
    this.resetCanvas();
    this.getDefaultEle.subscribe(elements => {
      this.defaultEle = _.filter(elements, (action) => {
        return action.Category === 'General' && action.Id === 1;
      });
      this.setDefaultEle();
      this.canvas = this.robot;
    });
  }

  loadExistRobotElems() {
    const elemNodes = JSON.parse(JSON.stringify(this.robot['canvas']['nodes']));
    const edgeNodes = JSON.parse(JSON.stringify(this.robot['canvas']['edges']));

    if (elemNodes) {
      _.each(elemNodes, (elem) => {
        this.nodes.push(elem);
        setTimeout(() => {
          this.draggableEle();
          if (elem && (elem.Name === 'Start' || elem.Name === 'Stop')) {
            this.drawCanvasEle(elem, elem.Name === 'Stop' ? top : '', elem.Name === 'Start' ? bottom : '', elem.Name === 'Stop' ? 'target' : 'source');
          } else {
            this.drawCanvasEle(elem, top, bottom, 'source');
          }
        }, 0);
      });

      _.each(edgeNodes, (edge) => {
        setTimeout(() => {
          this.connectSourceToTargetUsingJSPlumb(edge.source, edge.target);
        }, 0);
      });
    }
  }

  setDefaultEle() {
    if (this.defaultEle.length > 0) {
      let index = 0;
      const elements: any[] = [];
      this.defaultEle[0].palette.forEach(element => {
        const dropCoordinates = {
          x: index === 0 ? 500 + 'px' : 500 + 'px',
          y: index === 0 ? 180 + 'px' : 348 + 'px'
        };
        const nodeData = this.addNode(element, dropCoordinates);
        elements.push(nodeData);
        index++;
      });
      setTimeout(() => {
        this.loadDefaultEle(elements);
      }, 240);
    }
  }

  get getDefaultEle(): Observable<any[]> {
    return this.sharedconfig.canvas.defaultEle.asObservable();
  }

  ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
    this.bindJSPlumbEvents();
  }

  bindJSPlumbEvents() {
    const self = this;
    this.jsPlumbInstance.bind('connectionDetached', (info, originalEvent) => {
      self.edgeRemoved(info);
    });
    this.jsPlumbInstance.bind('beforeDrop', (info, originalEvent) => {
      return self.edgeAdded(info);
    });

    this.jsPlumbInstance.bind('connectionMoved', (info, originalEvent) => {
      return self.connectionMoved(info);
    });

    this.jsPlumbInstance.importDefaults({
      Connector: ['Bezier', { curviness: 90 }],
      overlays: [
        ['Arrow', { width: 12, length: 12, location: 0.5 }]
      ]
    });
  }

  edgeAdded(edge) {
    this.edges.push({ source: edge.sourceId, target: edge.targetId });
    this.botChanges.emit(this.canvas);
    return true;
  }

  edgeRemoved(removedEdge) {
    this.edges = this.edges.filter((edge): boolean => (edge.source !== removedEdge.sourceId && edge.target !== removedEdge.targetId));
    setTimeout(() => {
      this.botChanges.emit(this.canvas);
    }, 50);
  }

  connectionMoved(info) {
    this.edges = this.edges.filter((edge): boolean => (edge.source !== info.originalSourceId && edge.target !== info.originalTargetId));
    this.edges.push({ source: info.newSourceId, target: info.newTargetId });
    this.botChanges.emit(this.canvas);
  }

  idGenerator() {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
  }

  onDrop(event: DndDropEvent) {
    const mousePos = this.getMousePos(event.event.target, event);
    const dropCoordinates = {
      x: mousePos.x + 'px',
      y: mousePos.y + 'px'
    };
    const nodeData = this.addNode(event.data, dropCoordinates);
    setTimeout(() => {
      this.draggableEle();
      this.drawCanvasEle(nodeData, top, bottom, 'target');
      this.selectedNodeElem(nodeData);
      this.botChanges.emit(this.canvas);
    }, 240);
  }

  addNode(data: any, coordinates: any) {
    const node = data;
    node.id = this.idGenerator();
    if (node.Icon && node.Icon.indexOf('-hover') > -1) {
      node.Icon = node.Icon.replace('-hover', '');
    }
    const nodeWithCoordinates = Object.assign({}, node, coordinates);
    this.nodes.push(nodeWithCoordinates);
    return node;
  }

  getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.event.clientX - rect.left,
      y: evt.event.clientY - rect.top
    };
  }

  draggableEle() {
    const ids = this.nodes.map((obj) => {
      return obj.id;
    });

    if (ids && ids.length > 0) {
      const self = this;
      this.jsPlumbInstance.draggable(ids, {
        containment: true,
        stop: (element) => {
          self.updateCoordinates(element);
        }
      });
    }
  }

  drawCanvasEle(node, topOpt, bottomOpt, nodeType) {
    if (node) {
      if (topOpt) {
        this.jsPlumbInstance.addEndpoint(node.id, topOpt);
      }
      if (bottomOpt) {
        this.jsPlumbInstance.addEndpoint(node.id, bottomOpt);
      }
      if (nodeType) {
        this.jsPlumbInstance.addClass(node.id, nodeType);
      }
    }
  }

  updateCoordinates(dragNode) {
    const nodeIndex = this.nodes.findIndex((node) => {
      return (node.id === dragNode.el.id);
    });
    this.nodes[nodeIndex].x = dragNode.pos[0] + 'px';
    this.nodes[nodeIndex].y = dragNode.pos[1] + 'px';
    this.botChanges.emit(this.canvas);
  }

  onDrop1(event: DndDropEvent, nodeData) {
    if (nodeData && nodeData.Id !== 2) {
      const dropCoordinates = {
        x: event.event.clientX - 220 + 'px',
        y: event.event.clientY - 80 + 'px'
      };

      const targetid = this.detachConn(nodeData);
      const childNodeData = this.addNode(event.data, dropCoordinates);

      setTimeout(() => {
        this.draggableEle();
        this.drawCanvasEle(childNodeData, top, bottom, 'target');
      }, 140);

      setTimeout(() => {
        this.connectSourceToTargetUsingJSPlumb(nodeData.id, childNodeData.id);
        this.selectedNodeElem(nodeData);
        if (targetid) {
          this.connectSourceToTargetUsingJSPlumb(childNodeData.id, targetid);
        }
        this.selectedNodeElem(childNodeData);
      }, 500);
    }
  }

  updateNodeCoordinates() {
    let nodeIndex = 0;
    let nodeCoordinates;

    _.each(this.nodes, (node) => {
      nodeIndex ++;
      if (nodeCoordinates && nodeIndex > 1) {

      }
    });
  }

  detachConn(node) {
    const id = _.where(this.edges, {source: node.id});
    if (id && id.length > 0) {
      const conn  = this.jsPlumbInstance.getConnections({
        source: id[0].source,
        target: id[0].target
      });
      this.jsPlumbInstance.deleteConnection(conn[0], {});
      this.edges = _.reject(this.edges, (edge) => {
        return edge.source === node.id;
      });
      return id[0].target;
    }
  }

  changeXYAxis(source, target) {

  }

  addEdge(source, target) {
    this.edges.push({ source: `${source}`, target: `${target}` });
    this.botChanges.emit(this.canvas);
  }

  nodeDblClick(node, nodeIndex) {
    this.selectedElem.emit(node);
    this.selectedNodeElem(node);
  }

  selectedNodeElem(node) {
    _.each(this.nodes, (ele) => {
      if (node) {
        if (ele.id === node.id) {
          ele.isElemSele = true;
          this.selectedElem.emit(ele);
        } else {
          ele.isElemSele = false;
        }
      } else {
        ele.isElemSele = false;
      }
    });
  }

  connectSourceToTargetUsingJSPlumb(source, target) {
    this.jsPlumbInstance.connect({
      endpoint: ['Dot', {radius: 6}],
      source: source,
      target: target,
      connector: ['Flowchart', {cornerRadius: 1, alwaysRespectStubs: true}],
      //connectorStyle: { stroke: 'blue' },
      curviness: 0,
      HoverPaintStyle: { strokeStyle: "#ec9f2e" },
      //cssClass: "path",
      anchor: ['Top', 'Bottom'],
      overlays: [
      ]
    });
    this.edges.push({ source: `${source}`, target: `${target}` });
    this.botChanges.emit(this.canvas);
  }

  clearCanvas() {
    this.nodes = [];
    this.edges = [];
    if (this.jsPlumbInstance) {
      this.jsPlumbInstance.reset();
      this.jsPlumbInstance.deleteEveryEndpoint();
      this.bindJSPlumbEvents();
    }
  }


  resetCanvas() {
    this.setDefaultEle();
    this.botChanges.emit(this.canvas);
  }

  removeNode(nodeId, nodeType) {
    this.nodes = this.nodes.filter((node): boolean => nodeId !== node.id);
    this.edges = this.edges.filter((edge): boolean => nodeId !== edge.source && nodeId !== edge.target);
    this.jsPlumbInstance.removeAllEndpoints(nodeId);
    this.botChanges.emit(this.canvas);
  }

  clone(event, node) {
    this.isFoucs = false;
    const cloneNode = Object.assign({}, node);
    cloneNode.isMenuOpen = false;
    const dropCoordinates = {
      x: parseInt(cloneNode.x.replace('px', '')) + 120 + 'px',
      y: parseInt(cloneNode.y.replace('px', '')) + 60 + 'px'
    };

    const nodeData = this.addNode(cloneNode, dropCoordinates);
    setTimeout(() => {
      this.draggableEle();
      this.drawCanvasEle(nodeData, top, nodeData.Id === 2 ? '' : bottom, 'target');
      this.selectedNodeElem(nodeData);
    }, 240);
    this.removeFocus(event, node);
  }

  delete(event, node) {
    this.isFoucs = false;
    this.removeFocus(event, node);
    this.removeNode(node.id, node.type);
    this.selectedNodeElem(null);
  }

  addFocus(event, node) {
    node.isMenuOpen = true;
    this.isFoucs = true;
    this.sharedconfig.canvas.id = node.id;
    _.each(this.nodes, (nodeEle) => {
      if (node.id !== nodeEle.id) {
        nodeEle.isMenuOpen = false;
      }
    });
  }

  removeFocus(event, node) {
    if (!this.isFoucs) {
      _.each(this.nodes, (nodeEle) => {
        if (this.sharedconfig.canvas.id === nodeEle.id) {
          nodeEle.isMenuOpen = false;
        }
      });
    } else {
      this.isFoucs = false;
    }
  }

  displayLables(event) {
    this.isLabels = event;
  }
}
