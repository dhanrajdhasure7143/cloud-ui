export class WorkflowRobot {
    Type: 'Robot';
    Name: '';
    projectType: 'Workflow_Robot';
    Parent: '';
    RobotType: 'Workflow_Robot';
    CreateBy: '';
}

export class CreateRobots {
    Type: 'Robot';
    Name: '';
    Description: '';
    RobotType: 'Robot';
    Project_Id: null;
    CreateBy: string;
    CreateDatetime: string;
    UpdateBy: string;
    UpdateDatetime: string;
   
}
export class Robotlogs {
    rid: number;
    versionid: number;
    robotname: string;
    CreateDatetime: string;
  }
  export class InputResponse {
    Project_Id:string;
    Robot_Id :string;
  }