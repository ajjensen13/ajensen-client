import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeColorPipe } from './fade-color.pipe';

@NgModule({
  declarations: [
    FadeColorPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FadeColorPipe
  ]
})
export class ColorUtilitiesModule { }
