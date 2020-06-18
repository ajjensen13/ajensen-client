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
import { TimelineProject } from '../../services/timeline.service';
import { RenderedTimelineProject } from '../models/rendered-timeline-project';
import { RelativeDimensions } from '../models/relative-dimensions';
import { WindowResizeService } from '../../services/window-resize.service';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-timeline-project',
  templateUrl: './timeline-project.component.html',
  styleUrls: ['./timeline-project.component.scss']
})
export class TimelineProjectComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
  @Input() project: TimelineProject;
  @Output() render = new EventEmitter<RenderedTimelineProject>();
  @ViewChild('header', { read: ElementRef }) headerElementRef: ElementRef;
  @ViewChild('section', { read: ElementRef }) sectionElementRef: ElementRef;
  @ViewChild('footer', { read: ElementRef }) footerElementRef: ElementRef;
  today: Date;
  defaultColor: string;

  private previousRenderedProject: RenderedTimelineProject;
  private dirty: boolean;
  private resizeSubscription: Subscription;
  private emissionSubject: Subject<RenderedTimelineProject>;
  private emissionSubscription: Subscription;

  constructor(private hostElementRef: ElementRef, private windowResizeService: WindowResizeService, private themeService: ThemeService) { }

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
      const hostElement = this.hostElementRef.nativeElement as HTMLElement;
      const anchorElement = this.headerElementRef.nativeElement as HTMLElement;
      const nextRenderedProject = new RenderedTimelineProject({
        project: this.project,
        dimensions: RelativeDimensions.fromHTMLElement(hostElement),
        headerDimensions: RelativeDimensions.fromHTMLElement(anchorElement)
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
