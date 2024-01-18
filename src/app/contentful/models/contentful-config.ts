import { Observable, Subject } from 'rxjs';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';

export interface ContentfulConfig {
  userSharedData: any;
  spaceId: string;
  accessToken: string;
  orgName: string;
  unitName: string;
  loggedUser: string;
  projectsAndPipelinePermissions: any[] ;
  canvas: {
    id: string,
    class: string,
    isMenuClicked: boolean,
    defaultEle: Subject<any>
  };
  events: {
    bsDropdown: BsDropdownDirective;
  };
}
