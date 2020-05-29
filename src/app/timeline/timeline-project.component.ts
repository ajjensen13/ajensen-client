import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { TimelineProject } from '../services/timeline.service';
import { RenderedTimelineProject } from './rendered-timeline-project';
import { RelativeDimensions } from './relative-dimensions';
import { WindowResizeService } from '../services/window-resize.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aj-timeline-project',
  templateUrl: './timeline-project.component.html',
  styleUrls: ['./timeline-project.component.scss']
})
export class TimelineProjectComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
  @Input() project: TimelineProject;
  @Output() render = new EventEmitter<RenderedTimelineProject>();
  @ViewChild('timeRange', { read: ElementRef }) timeRange: ElementRef;
  @ViewChild('content', { read: ElementRef }) content: ElementRef;
  today: Date;

  private previousRenderedProject: RenderedTimelineProject;
  private dirty: boolean;
  private resizeSubscription: Subscription;

  constructor(private el: ElementRef, private windowResizeService: WindowResizeService) { }

  ngOnInit(): void {
    this.today = new Date();
    this.resizeSubscription = this.windowResizeService
      .observe()
      .subscribe(() => this.dirty = true);
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dirty = true;
  }

  ngAfterViewChecked(): void {
    if (!this.dirty) {
      return;
    }

    this.dirty = false;

    const projectElement = this.el.nativeElement as HTMLElement;
    const timeRangeElement = this.timeRange.nativeElement as HTMLElement;
    const contentElement = this.content.nativeElement as HTMLElement;
    const nextRenderedProject = new RenderedTimelineProject({
      project: this.project,
      projectDimensions: RelativeDimensions.fromHTMLElement(projectElement),
      timeRangeDimensions: RelativeDimensions.fromHTMLElement(timeRangeElement),
      contentDimensions: RelativeDimensions.fromHTMLElement(contentElement)
    });

    if (nextRenderedProject.hasFiniteDimensions()) {
      if (!nextRenderedProject.hasSameDimensions(this.previousRenderedProject)) {
        this.previousRenderedProject = nextRenderedProject;
        setTimeout(() => this.render.emit(this.previousRenderedProject), 0);
      }
    } else if (this.previousRenderedProject?.hasFiniteDimensions()) {
      this.previousRenderedProject = nextRenderedProject;
      setTimeout(() => this.render.emit(this.previousRenderedProject), 0);
    }
  }
}
