import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: any[], args?: string): any[] {
    if (!value) return [];
    // Si es array de string
    if (typeof value[0] === 'string') {
      return [...value].sort();
    }
    // Si es array de objetos
    if (args) {
      return [...value].sort((a, b) => {
        if (a[args] < b[args]) return -1;
        if (a[args] > b[args]) return 1;
        return 0;
      });
    }
    return [...value];
  }
}
