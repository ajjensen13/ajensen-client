import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TimelineProject } from '../services/timeline.service';
import { RenderedProject } from './rendered-project';
import { RelativeDimensions } from './relative-dimensions';

@Component({
  selector: 'aj-timeline-project',
  templateUrl: './timeline-project.component.html',
  styleUrls: ['./timeline-project.component.scss']
})
export class TimelineProjectComponent implements OnInit, AfterViewInit {
  @Input() project: TimelineProject;
  @Output() render = new EventEmitter<RenderedProject>();
  @ViewChild('timeRange', { read: ElementRef }) timeRange: ElementRef;
  @ViewChild('content', { read: ElementRef }) content: ElementRef;
  today: Date;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.today = new Date();
  }

  ngAfterViewInit(): void {
    setTimeout( () =>
      this.render.emit(
        new RenderedProject({
          timelineProject: new RelativeDimensions({
            offsetHeight: this.el.nativeElement.offsetHeight,
            offsetWidth: this.el.nativeElement.offsetWidth,
            offsetLeft: this.el.nativeElement.offsetLeft,
            offsetTop: this.el.nativeElement.offsetTop,
          }),
          timeRange: new RelativeDimensions({
            offsetHeight: this.timeRange.nativeElement.offsetHeight,
            offsetWidth: this.timeRange.nativeElement.offsetWidth,
            offsetLeft: this.timeRange.nativeElement.offsetLeft,
            offsetTop: this.timeRange.nativeElement.offsetTop,
          }),
          content: new RelativeDimensions({
            offsetHeight: this.content.nativeElement.offsetHeight,
            offsetWidth: this.content.nativeElement.offsetWidth,
            offsetLeft: this.content.nativeElement.offsetLeft,
            offsetTop: this.content.nativeElement.offsetTop,
          }),
          id: this.project.id,
          project: this.project
        })
    ), 0);
  }
}
