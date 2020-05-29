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
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import { ThemeService } from '../services/theme.service';

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
  defaultColor: string;

  private previousRenderedProject: RenderedTimelineProject;
  private dirty: boolean;
  private resizeSubscription: Subscription;
  private emissionSubject: Subject<RenderedTimelineProject>;
  private emissionSubscription: Subscription;

  constructor(private el: ElementRef, private windowResizeService: WindowResizeService, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.today = new Date();
    this.defaultColor = this.themeService.colorForegroundAccent.string();
    this.resizeSubscription = this.windowResizeService
      .observe()
      .subscribe(() => this.dirty = true);

    this.emissionSubject = new Subject<RenderedTimelineProject>();
    this.emissionSubscription = this.emissionSubject
        .asObservable()
        .pipe(throttleTime(150, async, { leading: false, trailing: true }))
        .subscribe(e => {
          this.render.emit(e);
        });
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
    this.emissionSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dirty = true;
  }

  ngAfterViewChecked(): void {
    if (!this.dirty) {
      return;
    }

    // It takes the browser some time to finish positioning these elements
    // Keep the dirty flag as true until the dimensions stop changing.
    setTimeout(() => {
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
          this.emissionSubject.next(this.previousRenderedProject);
          this.render.emit(this.previousRenderedProject);
          return;
        }
      } else if (this.previousRenderedProject?.hasFiniteDimensions()) {
        this.previousRenderedProject = nextRenderedProject;
        this.emissionSubject.next(this.previousRenderedProject);
        return;
      }

      // There weren't any changes between now, and the last time we checked. Assume we're clean now..
      this.dirty = false;
    }, 0);
  }
}
