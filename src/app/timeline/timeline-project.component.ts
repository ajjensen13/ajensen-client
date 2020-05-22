import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../models/tag';
import { TimelineProject } from '../models/timeline-project';

@Component({
  selector: 'aj-timeline-project',
  templateUrl: './timeline-project.component.html',
  styleUrls: ['./timeline-project.component.scss']
})
export class TimelineProjectComponent implements OnInit {
  @Input() project: TimelineProject;

  constructor() { }

  ngOnInit(): void {
  }

  tagTrackBy(index: number, item?: Tag) {
    return item?.id;
  }
}
