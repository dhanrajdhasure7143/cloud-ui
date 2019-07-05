import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'sortingFilter',
  pure: false
})
export class SortingPipe implements PipeTransform {

  transform(items, sortType: string, sortKey: string): any {
    if (sortType === 'asec') {
      items = _.sortBy(items, sortKey);
    } else {
      items = _.sortBy(items, sortKey).reverse();
    }
    return items;
  }
}