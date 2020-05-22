import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../services/timeline.service';
import { Observable } from 'rxjs';
import { TimelineProject } from '../models/timeline-project';

@Component({
  selector: 'aj-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  timeline: Observable<TimelineProject[]>;

  constructor(private timelineService: TimelineService) {}

  ngOnInit(): void {
    this.timeline = this.timelineService.getTimeline();
  }
}


