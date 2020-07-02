import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { RouterModule } from '@angular/router';
import { TimelineProjectComponent } from './project/timeline-project.component';
import { TimelineRouteComponent } from './route/timeline-route.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimelineTimestampComponent } from './timestamp/timeline-timestamp.component';


@NgModule({
  declarations: [
    TimelineComponent,
    TimelineProjectComponent,
    TimelineRouteComponent,
    TimelineTimestampComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [
    TimelineComponent
  ]
})
export class TimelineModule { }
