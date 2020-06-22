import { Pipe, PipeTransform } from '@angular/core';
import * as Color from 'color';

@Pipe({
  name: 'fadeColor'
})
export class FadeColorPipe implements PipeTransform {
  transform(value: string | Color, ratio: number): string {
    return (typeof value === 'string' ? Color(value) : value).fade(ratio).string();
  }
}
