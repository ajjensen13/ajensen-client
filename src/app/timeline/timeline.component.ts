import { Component, OnInit } from '@angular/core';
import { TimelineProject, TimelineService } from '../services/timeline.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timeline',
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


