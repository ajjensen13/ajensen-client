import { RelativeDimensions } from './relative-dimensions';

export class RenderedProject {
  id: string;
  timelineProject: RelativeDimensions;
  timeRange: RelativeDimensions;
  content: RelativeDimensions;
  color: string;

  constructor(init?: Partial<RenderedProject>) {
    Object.assign(this, init);
  }
}
