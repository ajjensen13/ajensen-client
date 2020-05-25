import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { RenderedProject } from './rendered-project';

@Component({
  selector: 'aj-timeline-route',
  templateUrl: './timeline-route.component.html',
  styleUrls: ['./timeline-route.component.scss'],
  animations: [
    trigger('draw', [
      transition(':enter', [
        style({ strokeDasharray: '0 100' }),
        animate('500ms', style({ strokeDasharray: '100 0' }))
      ]),
    ])
  ]
})
export class TimelineRouteComponent implements OnInit, OnChanges {
  @Input() renderedProjects: RenderedProject[];
  @Input() height: number;
  @Input() width: number;

  viewBox: string;

  paths: Path[];

  constructor() {  }

  ngOnChanges(changes: SimpleChanges) {
    this.viewBox = `0 0 ${this.width} ${this.height}`;
    this.paths = [];
    const strokeWidth = 10;
    for (const p of this.renderedProjects) {
      this.paths.push(
        new PathBuilder({ strokeWidth, stroke: p.color })
          .moveAbs(strokeWidth / 2, p.offsetTop)
          .verticalLineRel(p.offsetHeight)
          .path()
      );
    }
  }

  ngOnInit(): void {
  }
}

class PathBuilder {
  stroke: string;
  fill: string;
  strokeWidth: number;
  strokeDasharray: number[];
  pathLength: number;

  private readonly d: string[] = [];

  constructor(init?: Partial<PathBuilder>) {
    Object.assign(this, init);
  }

  path(): Path {
    return new Path({
      ...this,
      d: this.d?.join(' '),
      strokeDasharray: this.strokeDasharray?.join(' '),
      fill: this.fill ?? 'none',
      pathLength: this.pathLength,
      stroke: this.stroke,
    });
  }

  moveRel(dx: number, dy: number): PathBuilder {
    this.d.push(`m ${dx} ${dy}`);
    return this;
  }

  moveAbs(x: number, y: number): PathBuilder {
    this.d.push(`M ${x} ${y}`);
    return this;
  }

  lineRel(dx: number, dy: number): PathBuilder {
    this.d.push(`l ${dx} ${dy}`);
    return this;
  }

  lineAbs(x: number, y: number): PathBuilder {
    this.d.push(`L ${x} ${y}`);
    return this;
  }

  horizontalLineRel(dx: number): PathBuilder {
    this.d.push(`h ${dx}`);
    return this;
  }

  horizontalLineAbs(x: number): PathBuilder {
    this.d.push(`H ${x}`);
    return this;
  }

  verticalLineRel(dy: number): PathBuilder {
    this.d.push(`v ${dy}`);
    return this;
  }

  verticalLineAbs(y: number): PathBuilder {
    this.d.push(`V ${y}`);
    return this;
  }
}

class Path {
  fill: string;
  strokeWidth: number;
  strokeDasharray: string;
  pathLength: number;
  stroke: string;
  d: string;

  constructor(init?: Partial<Path>) {
    Object.assign(this, init);
  }
}
