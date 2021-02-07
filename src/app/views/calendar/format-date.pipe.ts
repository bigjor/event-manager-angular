import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: Date): string {
    return [
      value.getDate().toString().padStart(2, '0'),
      (1 + value.getMonth()).toString().padStart(2, '0'),
      value.getFullYear()
    ].join('/')
  }

}
