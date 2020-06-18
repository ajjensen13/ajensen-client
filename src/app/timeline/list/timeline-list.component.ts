import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimelineProjectComponent } from '../project/timeline-project.component';
import { TimelineProject } from '../../services/timeline.service';
import { RenderedTimelineProject } from '../models/rendered-timeline-project';

@Component({
  selector: 'app-timeline-list',
  templateUrl: './timeline-list.component.html',
  styleUrls: ['./timeline-list.component.scss'],
})
export class TimelineListComponent implements OnInit, OnDestroy {
  @Input() projects: Observable<TimelineProject[]>;
  @ViewChildren(TimelineProjectComponent, { read: ElementRef }) anchors: QueryList<ElementRef>;
  @ViewChild('routeContainer', { read: ElementRef }) routeContainer: ElementRef;

  renderedProjects: RenderedTimelineProject[];
  projectMappings: [TimelineProject, RenderedTimelineProject][];

  constructor() {}

  private projectsSub: Subscription;

  ngOnInit(): void {
    this.renderedProjects = [];
    this.projectMappings = [];
    this.projectsSub = this.projects
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
