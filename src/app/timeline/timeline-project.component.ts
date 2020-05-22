import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { Tag } from '../models/tag';

@Component({
  selector: 'aj-timeline-project',
  templateUrl: './timeline-project.component.html',
  styleUrls: ['./timeline-project.component.scss']
})
export class TimelineProjectComponent implements OnInit {
  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
  }

  tagTrackBy(index: number, item?: Tag) {
    return item?.id;
  }
}
