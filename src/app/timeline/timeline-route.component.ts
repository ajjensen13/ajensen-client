import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RenderedTimelineProject } from './rendered-timeline-project';

@Component({
  selector: 'app-timeline-route',
  templateUrl: './timeline-route.component.html',
  styleUrls: ['./timeline-route.component.scss'],
  animations: [
    trigger('drawn', [
      state('false', style({ strokeDasharray: '0 100' })),
      state('true', style({ strokeDasharray: '100 0' })),
      transition('false <=> true', [
        animate('500ms ease-in-out', )
      ]),
    ])
  ]
})
export class TimelineRouteComponent implements OnInit, OnChanges {

  constructor() {
    this.strokeWidth = 4;
    this.layerWidth = this.strokeWidth * 8;
    this.widthPx = TimelineRouteComponent.calculateWidth(1, this.layerWidth);
  }

  @Input() renderedProjects: RenderedTimelineProject[];
  viewBox: string;

  private animating: boolean;
  private strokeWidth: number;
  private layerWidth: number;
  widthPx: number;
  heightPx: number;

  paths: DrawnPath[];

  private static calculateWidth(layers: number, layerWidth: number): number {
    return layerWidth * layers;
  }

  ngOnInit(): void {
  }

  trackByPath(index: number, path: DrawnPath): string {
    return path.id;
  }

  ngOnChanges(changes: SimpleChanges) {
    const newPaths: DrawnPath[] = [];
    let maxY = 0;
    for (const p of this.renderedProjects) {
      const layer = 1; // TODO make this dynamic based on parent projects
      const top = p.projectDimensions.offsetTop;
      const bottom = p.projectDimensions.offsetTop + p.projectDimensions.offsetHeight;
      const topTimeRange = top + p.timeRangeDimensions.offsetTop;
      const bottomTimeRange = topTimeRange + p.timeRangeDimensions.offsetHeight;
      const middleTimeRange = (bottomTimeRange - topTimeRange) / 2 + topTimeRange;
      const topContent = top + p.contentDimensions.offsetTop;
      // const bottomContent = topContent + p.Content.offsetHeight;
      const vLength = (topContent - middleTimeRange) + p.contentDimensions.offsetHeight;
      newPaths.push(new DrawnPath({
        paths: [
          new PathBuilder({ strokeWidth: this.strokeWidth, stroke: p.project.color })
            .moveAbs(this.layerWidth, middleTimeRange - this.strokeWidth / 2 )
            .horizontalLineRel((-layer * this.layerWidth) + this.strokeWidth)
            .verticalLineRel(vLength)
            .path()
        ],
        drawn: false,
        id: p.project.id
      }));

      maxY = Math.max(maxY, bottom);
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

    this.widthPx = TimelineRouteComponent.calculateWidth(1, this.layerWidth);
    this.heightPx = maxY;
    this.viewBox = `0 0 ${this.widthPx} ${this.heightPx}`;

    if (!this.animating) {
      this.animateNextPath();
    }
  }

  pathDrawDone(id: string) {
    const start = this.paths.findIndex((dp) => dp.id === id);
    if (start < 0) {
      throw new Error('drawn path not found');
    }

    this.animateNextPath();
  }

  private animateNextPath() {
    if (this.paths.length < 1) {
      return;
    }

    this.animating = true;
    for (const path of this.paths) {
      if (!path.drawn) {
        setTimeout(() => path.drawn = true, 0);
        return;
      }
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
  paths: Path[];
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
