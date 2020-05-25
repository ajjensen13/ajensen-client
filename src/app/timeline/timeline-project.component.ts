import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimelineProject } from '../services/timeline.service';
import { RenderedProject } from './rendered-project';

@Component({
  selector: 'aj-timeline-project',
  templateUrl: './timeline-project.component.html',
  styleUrls: ['./timeline-project.component.scss']
})
export class TimelineProjectComponent implements OnInit, AfterViewInit {
  @Input() project: TimelineProject;
  @Output() render = new EventEmitter<RenderedProject>();

  constructor(private el: ElementRef) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout( () =>
      this.render.emit(
        new RenderedProject({
          offsetHeight: this.el.nativeElement.offsetHeight,
          offsetWidth: this.el.nativeElement.offsetWidth,
          offsetLeft: this.el.nativeElement.offsetLeft,
          offsetTop: this.el.nativeElement.offsetTop,
          color: this.project.color
        })
    ), 0);
  }
}
