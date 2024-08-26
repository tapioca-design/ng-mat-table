import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortAlphabetically',
  standalone: true
})
export class SortAlphabeticallyPipe implements PipeTransform {
  transform(value: any[], property?: string): any[] {
    if (!value || value.length === 0) return [];
    
    if (property) {
      return value.sort((a, b) => {
        const aProp = a[property];
        const bProp = b[property];
        return aProp.localeCompare(bProp);
      });
    } else {
      return value.sort((a, b) => a.localeCompare(b));
    }
  }
}