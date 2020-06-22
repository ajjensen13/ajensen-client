import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { ProjectComponent } from './project/project.component';
import { ColorUtilitiesModule } from '../../color-utilities/color-utilities.module';


@NgModule({
  declarations: [
    TimelineComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ColorUtilitiesModule
  ],
  exports: [
    TimelineComponent
  ]
})
export class TimelineModule { }
