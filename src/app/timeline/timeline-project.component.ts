import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../models/project';

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
}
