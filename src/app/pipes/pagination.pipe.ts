import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(array: any[] | null,page_size: number, page_number: number): any {


    page_size = page_size || 2
    page_number = page_number || 1
    --page_number

    if(array != null) {
    return array.slice(page_number * page_size, (page_number + 1) * page_size)
  }
  }

}
