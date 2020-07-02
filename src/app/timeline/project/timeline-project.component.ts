import { AfterViewChecked, Component, ElementRef, Input, OnInit, } from '@angular/core';
import { TimelineProject } from './timeline-project';
import { Box } from '../../box/box';
import { DrawnTimelineProjectService } from '../drawn-timeline-project.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-timeline-project',
  templateUrl: './timeline-project.component.html',
  styleUrls: ['./timeline-project.component.scss'],
  animations: [
    trigger('hover', [
      state('0', style({ borderLeftWidth: '0px' })),
      state('1', style({ borderLeftWidth: '4px' })),
      transition('0 <=> 1', animate('250ms ease-out'))
    ])
  ]
})
export class TimelineProjectComponent implements OnInit, AfterViewChecked {
  @Input() timelineProject: TimelineProject;

  private lastDrawn: Box;

  constructor(
    private el: ElementRef,
    private service: DrawnTimelineProjectService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    const nextDrawn = Box.fromHTMLElement(this.el.nativeElement);
    if (nextDrawn && !nextDrawn.equals(this.lastDrawn)) {
      this.lastDrawn = nextDrawn;
      this.service.next(this.timelineProject, this.lastDrawn);
    }
  }
}
