import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], termo: string): any[] {
    if (!items || !termo) {
      return items;
    }
    return items.filter(item => item.toLowerCase().includes(termo.toLowerCase()));
  }
}
