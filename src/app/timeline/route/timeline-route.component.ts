import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as Color from 'color';
import { TimelineProject } from '../project/timeline-project';
import { DrawnTimelineProjectService } from '../drawn-timeline-project.service';
import { Observable } from 'rxjs';
import { Box } from '../../box/box';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-timeline-route',
  templateUrl: './timeline-route.component.html',
  styleUrls: ['./timeline-route.component.scss'],
  animations: [
    trigger('drawn', [
      state('0', style({ 'stroke-dasharray': '0 100' })),
      state('1', style({ 'stroke-dasharray': '100 0' })),
      transition('0 <=> 1', [
        animate('500ms ease-in')
      ])
    ])
  ]
})
export class TimelineRouteComponent implements OnInit {
  viewBoxHeight = 0;
  circleRadius = 10;
  hatch = 15;
  viewBoxWidth = this.circleRadius * 2 + this.hatch * 2;
  circleOffsetY = 12;

  @Input() timelineProject: TimelineProject;
  @Input() draw: boolean;
  paths: Path[] = [];
  box$: Observable<Box>;

  constructor(private service: DrawnTimelineProjectService, private appRef: ApplicationRef) { }

  ngOnInit(): void {
    this.box$ = this.service.getObservable(this.timelineProject)
      .pipe(
        debounceTime(50),
        tap(() => this.appRef.tick()),
        tap(x => {
          this.paths = [];

          if (!x) {
            return;
          }

          this.viewBoxHeight = (x.height || 0) + (x.marginTop || 0) + (x.marginBottom || 0);
          this.circleRadius = 5;
          this.hatch = 15;

          this.paths.push(
            new PathBuilder()
              .stroke(new Color('#476040'))
              .strokeWidth(1)
              .M(this.viewBoxWidth / 2, 0)
              .V(this.viewBoxHeight)
              .result(),
            new PathBuilder()
              .stroke(new Color(this.timelineProject.color))
              .strokeWidth(2)
              .fill(new Color('#FFFFFFFF'))
              .M(this.viewBoxWidth / 2, this.circleOffsetY - this.circleRadius)
              .a(this.circleRadius, this.circleRadius, 0, true, true, 0, +2 * this.circleRadius)
              .a(this.circleRadius, this.circleRadius, 0, true, true, 0, -2 * this.circleRadius)
              // .M(this.viewBoxWidth / 2 + this.circleRadius, this.circleOffsetY)
              // .h(+this.hatch)
              .M(this.viewBoxWidth / 2 - this.circleRadius, this.circleOffsetY)
              .h(-this.hatch)
              .result()
          );
        })
      );
  }
}

class Path {
  d: string;
  stroke: Color;
  fill: Color;
  strokeWidth: number;

  constructor(init?: Partial<Path>) {
    Object.assign(this, init);
  }
}

class PathBuilder {
  private static readonly black: Color = new Color('#000000');
  d: string[];
  strokeColor: Color;
  fillColor: Color;
  strokeWidthNumber?: number;

  constructor(init?: Partial<PathBuilder>) {
    this.d = [];
    this.strokeColor = PathBuilder.black;
    Object.assign(this, init);
  }

  stroke(strokeColor: Color): PathBuilder {
    return new PathBuilder({...this, strokeColor});
  }

  fill(fillColor: Color): PathBuilder {
    return new PathBuilder({...this, fillColor});
  }

  strokeWidth(strokeWidthNumber?: number): PathBuilder {
    return new PathBuilder({...this, strokeWidthNumber});
  }

  M(x: number, y: number): PathBuilder {
    return new PathBuilder({...this, d: [...this.d, `M ${x},${y}`]});
  }

  H(x: number): PathBuilder {
    return new PathBuilder({...this, d: [...this.d, `H ${x}`]});
  }

  h(x: number): PathBuilder {
    return new PathBuilder({...this, d: [...this.d, `h ${x}`]});
  }

  V(y: number): PathBuilder {
    return new PathBuilder({...this, d: [...this.d, `V ${y}`]});
  }

  a(rx: number, ry: number, xAxisRotation: number, largeArc: boolean, sweep: boolean, x: number, y: number): PathBuilder {
    return new PathBuilder({
      ...this,
      d: [...this.d, `a ${rx},${ry} ${xAxisRotation} ${largeArc ? '1' : '0'} ${sweep ? '1' : '0'} ${x},${y} `]
    });
  }

  result(): Path {
    return new Path({
      d: this.d.join(' '),
      stroke: this.strokeColor,
      fill: this.fillColor,
      strokeWidth: this.strokeWidthNumber,
    });
  }
}
