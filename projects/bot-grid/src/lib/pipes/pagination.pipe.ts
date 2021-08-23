import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
  pure: false
})
export class PaginationPipe implements PipeTransform {
  transform(dataArray, sizeOfPage, currentPage) {
    let copyArray = dataArray;
    if (dataArray && dataArray.length > 0) {
      const size = (currentPage) * sizeOfPage;
      copyArray = dataArray.slice(size, size + sizeOfPage);
    }
    return copyArray;
  }
}
