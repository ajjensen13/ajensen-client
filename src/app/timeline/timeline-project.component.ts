import { Component, Input, OnInit } from '@angular/core';
import { TimelineProject } from '../services/timeline.service';
import { Tag } from '../services/tag.service';

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
