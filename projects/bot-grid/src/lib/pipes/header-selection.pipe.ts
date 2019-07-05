import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'headerSelection',
  pure: false
})
export class HeaderSelectionPipe implements PipeTransform {

  transform(headers: any[], args?: any[]): any {
    const headerItems = [];

    _.each(headers, (value) => {
      if (args && args.length > 0) {
        const arr2 = _.some(args, (v) => {
          if (v === value.field) {
            return true;
          }
        });

        if (!arr2) {
          headerItems.push(value);
        }
      } else {
        headerItems.push(value);
      }
    });
    return headerItems;
  }

}
