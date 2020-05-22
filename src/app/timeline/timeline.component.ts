import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../services/timeline.service';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

@Component({
  selector: 'aj-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  timeline: Observable<Project[]>;

  constructor(private timelineService: TimelineService) {}

  ngOnInit(): void {
    this.timeline = this.timelineService.getTimeline();
  }
}


