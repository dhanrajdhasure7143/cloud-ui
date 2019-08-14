import { Component, OnInit, ViewEncapsulation, Inject, Input, EventEmitter, OnChanges, Output, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'underscore';
import { ContentfulConfig } from '../../../../../contentful/models/contentful-config';
import { ContentfulConfigService } from '../../../../../contentful/services/contentful-config.service';
import { WorkflowEditService } from '../../../@providers/workflowedit.service';
import { subscribeOn } from 'rxjs/operators';
import { WorkflowcreateService } from '../../../@providers/workflowcreate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'toolset',
  templateUrl: './toolset.component.html',
  styleUrls: ['./toolset.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolsetComponent implements OnInit, OnChanges, OnDestroy {
  public isOpen = false;
  public templateNodes: any = [];
  public connectorId: any = 0;
  public nodeId: any = 0;
  public dataVal: any[] = [];
  public general: any[] = [];
  public advanced: any[] = [];
  public default: any[] = [];
  public paleteImages: any[] = [];
  public nodeactions: any[] = [];
  public toolsetEle: any[] = [];
  public tempToolsetEle: any[] = [];
  public search: string;
  public robots = [];
  public robotsCount = 1;
  public actionEleCount = 0;
  public changingBotName = '';
  public clientY = '';
  @Input() title = new EventEmitter<any>();
  @Input() bot = new EventEmitter<any>();
  @Output() robotCreated = new EventEmitter<any>();
  @Input() robotChanges = new EventEmitter<any>();
  autoSaveIntervalId;

  public model = {
    Type: 'Project',
    username: '',
    projectType:'API',
    WorkFlowProjectType: 'Workflow',
    Name: '',
    Description: '',
    CreateBy: '',
  };
  public delebot = {
    Type: '',
    Name: '',
    Parent: ''
  };
  public robotModel = {
    Type: 'Robot',
    Name: '',
    Description: '',
    LOBId: null,
    CreateBy: '',
    Parent: '',
    UpdateBy: '',
  };
  public robotid = null;
  constructor(private http: HttpClient, @Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig, private workflowSer: WorkflowEditService, private workflowcreateService:WorkflowcreateService) { }

  ngOnInit() {
    this.autoSaveIntervalId = setInterval(() => { this.botAutoSave(); }, 10000);
    const data = JSON.stringify({ Type: 'AllActionsByType', ProjectType: `('Robot','Workflow')` });
    this.workflowSer.getAllElements().subscribe(res => {
      this.workflowSer.getAllActionsByType(data).subscribe(res1 => {
        this.paleteImages = res1;
        this.dataVal = res;
        this.dataVal.forEach(element => {
          const elementArr = [];
          this.paleteImages.forEach(element1 => {
            if (element1.Element_Id === element.Id) {
              element1.group = element;
              element1.isMenuOpen = false;
              element1.isElemSele = false;
              element1.Icon =  element1.Icon.replace('png', 'svg');
              elementArr.push(element1);
            }
          });
          if (element.Id !== 1) {
            const paletteData = JSON.parse(JSON.stringify(element));
            paletteData.palette = elementArr;
            this.actionEleCount += this.actionEleCount + elementArr.length > 0 ? elementArr.length : 0;
            this.toolsetEle.push(paletteData);
          } else {
            const paletteData = JSON.parse(JSON.stringify(element));
            paletteData.palette = elementArr;
            this.default.push(paletteData);
          }
        });
        setTimeout(() => {
          this.tempToolsetEle = Object.assign({}, this.toolsetEle);
          this.sharedconfig.canvas.defaultEle.next(this.default);
        }, 100);
      });

      this.workflowSer.getAllActionProperties().subscribe(actionitems => {
        const actions = actionitems;
        const uniqActionIds = _.pluck(_.uniq(actions, (x) => {
          return x.Action_Id;
        }), 'Action_Id');

        uniqActionIds.forEach(ids => {
          const actionProp = {
            id: ids,
            prop: _.filter(actions, (action) => {
              return action.Action_Id === ids;
            })
          };
          this.nodeactions.push(actionProp);
        });
      });
    });


    const projectById = {
      Type: 'AllRobotsByPrjId',
      Project_Id: '622'
    };

    this.workflowcreateService.getAllRobotsByProjectId(projectById).subscribe(res => {
      if (!res && res.length > 0) {
        this.robots = res;
      } else {
        const copyBot = JSON.parse(JSON.stringify({}));
        copyBot.canvas = {
          nodes: [],
          edges: []
        };
        copyBot.nameChange = false;
        copyBot.Name = 'Untitled - 1';
        copyBot.isSelected = true;
        this.robotsCount ++;
        this.robots.push(copyBot);
        this.robotCreated.emit(copyBot);
      }
    });
  }

  ngOnChanges() {
    if (this.robotChanges) {
      _.each(this.robots, (robot) => {
        if (robot['Name'] === this.robotChanges['Name']) {
          robot['canvas']['nodes'] = this.robotChanges['canvas']['nodes'];
          robot['canvas']['edges'] = this.robotChanges['canvas']['edges'];
        }
      });
    }
  }

  filterEle(chars) {
    if (chars) {
      const data = JSON.parse(JSON.stringify(this.tempToolsetEle));
      this.toolsetEle = [];
      this.actionEleCount = 0;
      this.toolsetEle = _.filter(data, (n) => {
        n.palette = _.filter(n.palette, (option) => {
          return option.Name.toLowerCase().indexOf(chars.toLowerCase()) > -1;
        });
        this.actionEleCount += this.actionEleCount + n.palette.length > 0 ? n.palette.length : 0;
        return n.palette && n.palette.length > 0;
      });
    } else {
      this.toolsetEle = [];
      this.actionEleCount = 0;
      _.each(this.tempToolsetEle, (nodeEle) => {
        this.actionEleCount += this.actionEleCount + nodeEle.palette.length > 0 ? nodeEle.palette.length : 0;
        this.toolsetEle.push(nodeEle);
      });
    }
  }

  loadRobot(robotData) {
    const copyBot = JSON.parse(JSON.stringify(robotData));
    copyBot.canvas = {
      nodes: [],
      edges: []
    }
    this.robots.push(copyBot);
    this.selectedRobot(copyBot);
    this.robotCreated.emit(copyBot);
  }

  switchRobot(robot) {
    this.resetBotName();
    _.each(this.robots, (bot) => {
      if (bot.Name === robot.Name) {
        this.robotCreated.emit(bot);
        this.selectedRobot(bot);
      } else {
        bot.isSelected = false;
        bot.nameChange = false;
      }
    });
  }

  resetBotName() {
    if (this.changingBotName) {
      _.each(this.robots, (bot) => {
        if (bot.nameChange) {
          bot.Name = this.changingBotName;
        }
      });
    }
  }

  changeRobotName(robot) {
    console.log(robot);
    this.resetBotName();
    robot.nameChange = true;
    this.changingBotName = robot.Name;
    this.selectedRobot(robot);
    this.isBotNameEidtable(robot);
    this.robotCreated.emit(robot);
    // this.workflowSer.createRobot1(robot).subscribe(res => {
    //   console.log(res);
    // })
  }

  selectedRobot(robot) {
    _.each(this.robots, (bot) => {
      if (bot.Name === robot.Name) {
        bot.isSelected = true;
      } else {
        bot.isSelected = false;
      }
    });
  }

  isBotNameEidtable(robot) {
    _.each(this.robots, (bot) => {
      if (robot && (bot.Name === robot.Name)) {
        bot.nameChange = true;
      } else {
        bot.nameChange = false;
      }
    });
  }

  saveRobotName(robot) {
    robot.nameChange = false;
    this.resetBotName();
    this.robotModel.LOBId = robot.LOBId;
    this.robotModel.Name = robot.Name;
    this.robotModel.Description = robot.Description;
    this.robotModel.CreateBy = '';
    this.robotModel.Parent = robot.projectId;
    this.workflowSer.createRobot1(this.robotModel).subscribe(res=>{
      console.log(res);
      robot.rid = res;
      this.robotCreated.emit(robot);
    });
  }

  createWorkflow() {
    this.resetBotName();
    this.isBotNameEidtable(null);
    //const loggedData = JSON.parse(JSON.parse(localStorage.getItem('currentUser')));
    const cloneModel = Object.assign({}, this.model);
    cloneModel.Type = 'Project';
    cloneModel.Name = 'Untitled - ' + (this.robotsCount ++);
    //cloneModel.CreateBy = loggedData['User'][0].ID;
    //cloneModel.username = loggedData['User'][0].UserName;
    this.loadRobot(cloneModel);
    setTimeout(() => {
      const el = document.getElementById(cloneModel.Name);
      el.scrollIntoView(true);
    }, 20);
  }

  deleteRobot(event, robot) {
    this.resetBotName();
    this.selectedRobot(robot);
    this.switchRobot(robot);

    this.robots = this.robots.filter((edge): boolean => (edge.rid !== robot.rid || edge.Name !== robot.Name));
    this.delebot.Parent = robot.projectId.toString();
    this.delebot.Name = robot.rid.toString();
    this.delebot.Type = 'Robot';

    if (robot.projectId === null || robot.rid === null){
      console.log(`Project id and robot id's are manditory`);
    }

    this.workflowSer.deleteRobot(this.delebot).subscribe(res => {
      this.robots = this.robots.filter((edge): boolean => (edge.rid !== robot.rid && edge.Name !== robot.Name));
    }, err => {
      this.robots = this.robots.filter((edge): boolean => (edge.rid !== robot.rid && edge.Name !== robot.Name));
      console.log(robot);
    });
  }

  mouseEnter(paletteitem) {
    if (paletteitem && paletteitem.Icon) {
      const icon = paletteitem.Icon;
      paletteitem.Icon = icon.split('.')[0] + '-hover.' +  icon.split('.')[1];
    }
  }

  mouseLeave(paletteitem) {
    if (paletteitem && paletteitem.Icon && paletteitem.Icon.indexOf('-hover') > -1) {
      paletteitem.Icon = paletteitem.Icon.replace('-hover', '');
    }
  }

  setPosition(event) {
    this.clientY = event.clientY + 'px';
  }

  botAutoSave() {
    // const Toast = Swal.mixin({
    //   toast: true,
    //   position: 'top',
    //   showConfirmButton: false,
    //   timer: 1000
    // });
    // Toast.fire({
    //   type: 'success',
    //   title: 'Saving canvas details!'
    // });
    // sessionStorage.setItem('robot', JSON.stringify(this.robots));
  }

  ngOnDestroy() {
    if (this.autoSaveIntervalId) {
      clearInterval(this.autoSaveIntervalId);
    }
  }
}
