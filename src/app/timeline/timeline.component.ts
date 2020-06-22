import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TimelineProject, TimelineService } from '../services/timeline.service';
import { Observable, Subscription } from 'rxjs';
import { ProjectComponent } from './project/project.component';
import { RenderedTimelineProject } from './models/rendered-timeline-project';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  @ViewChildren(ProjectComponent, { read: ElementRef }) anchors: QueryList<ElementRef>;
  @ViewChild('routeContainer', { read: ElementRef }) routeContainer: ElementRef;

  renderedProjects: RenderedTimelineProject[];
  projectMappings: [TimelineProject, RenderedTimelineProject][];
  timeline: Observable<TimelineProject[]>;

  constructor(private timelineService: TimelineService) {}

  private projectsSub: Subscription;

  ngOnInit(): void {
    this.renderedProjects = [];
    this.projectMappings = [];
    this.timeline = this.timelineService.getTimeline();
    this.projectsSub = this.timeline
      .subscribe(ps => {
        this.projectMappings = ps.map(p => [p, null]);
      });
  }

  ngOnDestroy(): void {
    this.projectsSub.unsubscribe();
  }

  onProjectRendered($event: RenderedTimelineProject, p: TimelineProject) {
    this.projectMappings = this.projectMappings.map(rp => rp[0].id === p.id ? [rp[0], $event] : rp);
    this.renderedProjects = this.projectMappings.map(rp => rp[1]).filter(rp => !!rp);
  }
}


