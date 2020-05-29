import { Pipe, PipeTransform } from '@angular/core';
import * as Color from 'color';

@Pipe({
  name: 'lightenColor'
})
export class LightenColorPipePipe implements PipeTransform {

  transform(value: string | Color, ratio: number): string {
    return (typeof value === 'string' ? Color(value) : value).lighten(ratio).string();
  }
}
