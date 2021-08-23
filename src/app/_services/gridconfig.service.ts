import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GridConfigService {
  constructor() { }


  uiEleHeight(totalRecords, showingRecords ) {
    let _ele_height = 0;
    if (totalRecords > showingRecords ) {
      switch (showingRecords) {
        case '5':
        _ele_height = 291;
          break;
        case '10':
        _ele_height = 467;
          break;
        case '15':
        _ele_height = 641;
          break;
        case '25':
        _ele_height = 1010;
          break;
        case '100':
        _ele_height = 1010;
          break;
      }
    } else {
      if (totalRecords > 5) {
        _ele_height = (43.4 * totalRecords) + 74;
      } else {
        _ele_height = 291;
      }
    }
     return _ele_height;
  }
}
