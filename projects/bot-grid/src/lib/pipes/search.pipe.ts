import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(items: Array<any>, searchText: string): any {
    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }
    if (items == null) {
      return null;
    }
    return items.filter(item =>
      Object.keys(item).some(k => item[k] != null &&
        item[k].toString().toLowerCase()
          .includes(searchText.toLowerCase()))
    );
  }

}
