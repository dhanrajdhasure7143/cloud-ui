export class Project {
    Project_Id: number;
    Type: string;
    Robot_ID: number;
    robot: Robot = new Robot() ;
}

class Robot {
    Id: number;
    Name: string;
    Project_Id: number;
    Steps: Steps[];
    LinkNodes: LinkNodes[];
    dynamicvariables: Dynamicvariables[];
    RProperties: RProperties;
    CreateBy: number;
    UpdateBy: number;
}

class Steps {
    Action_Id: number;
    Element_Id: number;
    Name: string;
    DisplayName: string;
    Robot_Id: number;
    Workflow_Id: number;
    Status: number;
    Order: number;
    RuntimeUserInput: boolean;
    CreateBy: number;
    UpdateBy: number;
    Id: number;
    StepProperties: StepProperties[];
}

class StepProperties {
    StepProperty: string;
    Status: number;
    Steps_Id: number;
    Project_Id: number;
    PropertyType: number;
    CustomValidation: any;
    CreateBy: number;
    UpdateBy: number;
    StepPropertyType: string;
    StepPropertyValue: number;
    Order: number;
    Id: number;
}

class LinkNodes {
    StepId: number;
    Location: string;
    Status: number;
    ChildStepIds: any;
    CreateBy: number;
    UpdateBy: number;
}

class Dynamicvariables {
    vlname: string;
    vlvalue: string;
    vltype: string;
    vlstatus: string;
}

class RProperties {
    ID: number;
    Robot_ID: number;
    Name: string;
    Client_Dependency: boolean;
    Default_Execution: any;
}