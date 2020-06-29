import { Component, OnInit } from '@angular/core';
import { TimelineProject, TimelineService } from './timeline.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  timeline: Observable<TimelineProject[]>;

  constructor(private service: TimelineService) { }

  ngOnInit(): void {
    this.timeline = this.service.getTimeline();
  }
}
