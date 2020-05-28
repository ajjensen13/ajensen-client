import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RenderedProject } from './rendered-project';

@Component({
  selector: 'aj-timeline-route',
  templateUrl: './timeline-route.component.html',
  styleUrls: ['./timeline-route.component.scss'],
  animations: [
    trigger('drawn', [
      state('false', style({ strokeDasharray: '0 100' })),
      state('true', style({ strokeDasharray: '100 0' })),
      transition('false <=> true', [
        animate('200ms')
      ]),
    ])
  ]
})
export class TimelineRouteComponent implements OnInit, OnChanges {
  @Input() renderedProjects: RenderedProject[];
  @Input() height: number;
  @Input() width: number;

  viewBox: string;

  private animating: boolean;

  paths: DrawnPath[];

  constructor() {  }

  trackByPath(index: number, path: DrawnPath): string {
    return path.id;
  }

  ngOnChanges(changes: SimpleChanges) {
    const newPaths: DrawnPath[] = [];
    const strokeWidth = 2;
    const layerWidth = strokeWidth * 8;
    let maxLayer = 1;
    for (const p of this.renderedProjects) {
      const layer = 1; // TODO make this dynamic based on parent projects
      const top = p.timelineProject.offsetTop;
      // const bottom = p.timelineProject.offsetTop + p.timelineProject.offsetHeight;
      const topTimeRange = top + p.timeRange.offsetTop;
      const bottomTimeRange = topTimeRange + p.timeRange.offsetHeight;
      const middleTimeRange = (bottomTimeRange - topTimeRange) / 2 + topTimeRange;
      const topContent = top + p.content.offsetTop;
      // const bottomContent = topContent + p.Content.offsetHeight;
      const vLength = (topContent - middleTimeRange) + p.content.offsetHeight;
      newPaths.push(new DrawnPath({
        path: new PathBuilder({ strokeWidth, stroke: p.project.color })
          .moveAbs(this.width, middleTimeRange - strokeWidth / 2 )
          .horizontalLineRel((-layer * layerWidth) + strokeWidth)
          .verticalLineRel(vLength)
          .path(),
        drawn: false,
        id: p.id
      }));
      maxLayer = Math.max(maxLayer, layer);
    }

    if (this.paths) {
      for (const path of this.paths) {
        for (const newPath of newPaths) {
          if (path.id === newPath.id) {
            newPath.drawn = path.drawn;
          }
        }
      }
    }
    this.paths = newPaths;

    this.width = layerWidth * maxLayer;
    this.viewBox = `0 0 ${this.width} ${this.height}`;

    if (!this.animating) {
      this.animateNextPath();
    }
  }

  ngOnInit(): void {
  }

  pathDrawDone(id: string) {
    const start = this.paths.findIndex((dp) => dp.id === id);
    if (start < 0) {
      throw new Error('drawn path not found');
    }

    this.animateNextPath(start);
  }

  private animateNextPath(start?: number) {
    if (this.paths.length < 1) {
      return;
    }

    if (start === undefined) {
      start = -1;
    }

    this.animating = true;
    for (let i = (start + 1) % this.paths.length; i !== start; i = (i + 1) % this.paths.length) {
      if (this.paths[i].drawn) {
        continue;
      }
      setTimeout(() => this.paths[i].drawn = true, 0);
      return;
    }
    this.animating = false;
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

class DrawnPath {
  path: Path;
  id: string;
  drawn: boolean;

  constructor(init?: Partial<DrawnPath>) {
    Object.assign(this, init);
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
