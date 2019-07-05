import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'selectionFilter',
  pure: false
})
export class SelectionPipe implements PipeTransform {

  transform(items, filterKeys): any {
    const rowData = [];

    _.each(items, (data) => {
      if (filterKeys) {
        const filterData = _.omit(data, filterKeys);
        rowData.push(filterData);
      } else {
        rowData.push(data);
      }
    });
    return rowData;
  }
}
