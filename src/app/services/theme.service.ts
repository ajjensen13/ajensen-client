import { Injectable } from '@angular/core';
import * as Color from 'color';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  colorForegroundAccent = Color('#ed8733');
  // color-foreground-default: #476040;
  // color-foreground-muted: #789174;
  // color-content-background: #ffffff;
  // color-background-default: #efeeea;
  // color-background-accent: #d2dac3;
  // color-shadow: #65808080;
  constructor() { }
}
