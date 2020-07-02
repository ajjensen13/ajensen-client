import { Component, OnInit } from '@angular/core';
import { TimelineProjectService } from './project/timeline-project.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { TimelineProject } from './project/timeline-project';
import { Box } from '../box/box';
import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  animations: [
    trigger('flyIn', [
      transition('* => *', [
        group([
          query('app-timeline-timestamp:enter', [
            style({ opacity: 0, transform: 'translateX(-100%)' }),
            stagger('150ms', [
              animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
            ])
          ], { optional: true }),
          query('app-timeline-project:enter', [
            style({ opacity: 0, transform: 'translateY(100%)' }),
            stagger('150ms', [
              animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class TimelineComponent implements OnInit {
  drawnTimelineProjects: Map<string, Subject<Box>>;
  timelineProjects$: Observable<TimelineProject[]>;
  drawRoutes$: Observable<boolean>;

  private drawRoutesSubject: Subject<boolean>;

  constructor(private service: TimelineProjectService) { }

  ngOnInit(): void {
    this.drawnTimelineProjects = new Map<string, Subject<Box>>();
    this.timelineProjects$ = this.service.getTimeline();
    this.drawRoutesSubject = new ReplaySubject(2);
    this.drawRoutesSubject.next(false);
    this.drawRoutes$ = this.drawRoutesSubject.asObservable();
  }

  onFlyInDone(): void {
    this.drawRoutesSubject.next(true);
  }
}
