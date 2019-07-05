import { Component, OnInit, ViewEncapsulation, Inject, Input, EventEmitter, OnChanges, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'underscore';
import { ContentfulConfig } from '../../../../../contentful/models/contentful-config';
import { ContentfulConfigService } from '../../../../../contentful/services/contentful-config.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Component({
  selector: 'toolset',
  templateUrl: './toolset.component.html',
  styleUrls: ['./toolset.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolsetComponent implements OnInit, OnChanges {
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

  public model = {
    Type: 'Project',
    username: '',
    projectType:'API',
    WorkFlowProjectType: 'Workflow',
    Name: '',
    Description: '',
    CreateBy: '',
  }

  constructor(private http: HttpClient, @Inject(ContentfulConfigService) private sharedconfig: ContentfulConfig) { }

  ngOnInit() {
    let obj = {
      connectorType: 'Source',
      executionMode: 'batch'
    };

    const apiURL: Observable<any> = this.http.get('/api/DesktopService.svc/Get?input={%22Type%22:%22AllElements%22}', {});

    const data = JSON.stringify({ 'Type': 'AllActionsByType', 'ProjectType': `('Robot','Workflow')` });
    const apiURL1: Observable<any> = this.http.get('/api/DesktopService.svc/Get?input=' + data, {});

    const actionItems: Observable<any> = this.http.get('/api/DesktopService.svc/Get?input={"Type":"AllActionProperties"}', {});

    apiURL.subscribe(res => {
      apiURL1.subscribe(res1 => {
        this.paleteImages = JSON.parse(res1.GetResult);
        this.dataVal = JSON.parse(res.GetResult);

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
            // if (element && element.Category === 'General') {
            //   const paletteData = JSON.parse(JSON.stringify(element));
            //   paletteData.palette = elementArr;
            //   this.general.push(paletteData);
            //   this.toolsetEle.push(paletteData);
            // } else {
            //   const paletteData = JSON.parse(JSON.stringify(element));
            //   paletteData.palette = elementArr;
            //   this.advanced.push(paletteData);
            //   this.toolsetEle.push(paletteData);
            // }

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

      actionItems.subscribe(actionitems => {
        const actions = JSON.parse(actionitems.GetResult);
        const uniqActionIds = _.pluck(_.uniq(actions, (x) => {
          return x.Action_Id;
        }), 'Action_Id');

        uniqActionIds.forEach(id => {
          const actionProp = {
            'id': id,
            'prop': _.filter(actions, (action) => {
              return action.Action_Id === id;
            })
          };
          this.nodeactions.push(actionProp);
        });
      });
    });

    const copyBot = JSON.parse(JSON.stringify(this.bot));
    copyBot.canvas = {
      nodes: [],
      edges: []
    };
    copyBot.nameChange = false;
    this.robotsCount ++;
    this.robots.push(copyBot);
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
        this.robotCreated.emit(JSON.parse(JSON.stringify(bot)));
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
    this.resetBotName();
    robot.nameChange = true;
    this.changingBotName = robot.Name;
    this.selectedRobot(robot);
    this.isBotNameEidtable(robot);
    this.robotCreated.emit(JSON.parse(JSON.stringify(robot)));
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
    this.robotCreated.emit(JSON.parse(JSON.stringify(robot)));
  }

  createWorkflow() {
    this.resetBotName();
    this.isBotNameEidtable(null);
    const loggedData = JSON.parse(JSON.parse(localStorage.getItem('currentUser')));
    const cloneModel = Object.assign({}, this.model);
    cloneModel.Type = 'Project';
    cloneModel.Name = 'Untitled - ' + (this.robotsCount ++);
    cloneModel.CreateBy = loggedData['User'][0].ID;
    cloneModel.username = loggedData['User'][0].UserName;
    this.loadRobot(cloneModel);
    setTimeout(() => {
      const el = document.getElementById(cloneModel.Name);
      el.scrollIntoView(true);
    }, 20);
  }

  deleteRobot(robot) {
    this.resetBotName();
    this.selectedRobot(robot);
    this.switchRobot(robot);
    // setTimeout(() => {
    //   const deleteElem = document.getElementById('delete-' + robot.Name).nextSibling;
    //   const popoverElem = deleteElem.nextSibling;
    //   popoverElem['style'].position = 'fixed;';
    //   popoverElem['style'].left = '453px !important;';
    //   popoverElem['style'].top = '100px !important;';
    // }, 500);
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
}
