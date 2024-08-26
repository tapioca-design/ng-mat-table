import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique',
  standalone: true
})
export class UniquePipe implements PipeTransform {

  transform<T>(items: T[], property: string): T[] {
    if (!items || !property) {
      return items;
    }

    // Use a Set to store unique values
    const uniqueItems = items.filter((item, index, self) => 
      index === self.findIndex((t: any) => (
        (t as any)[property] === (item as any)[property]
      ))
    );

    return uniqueItems;
  }
}