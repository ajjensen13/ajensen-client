import { Component, Input, OnInit } from '@angular/core';
import { TimelineProject } from '../project/timeline-project';

@Component({
  selector: 'app-timeline-timestamp',
  templateUrl: './timeline-timestamp.component.html',
  styleUrls: ['./timeline-timestamp.component.scss']
})
export class TimelineTimestampComponent implements OnInit {
  @Input() timelineProject: TimelineProject;

  constructor() {
  }

  ngOnInit(): void {
  }
}
