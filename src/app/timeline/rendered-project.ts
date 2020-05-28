import { RelativeDimensions } from './relative-dimensions';
import { TimelineProject } from '../services/timeline.service';

export class RenderedProject {
  id: string;
  timelineProject: RelativeDimensions;
  timeRange: RelativeDimensions;
  content: RelativeDimensions;
  project: TimelineProject;

  constructor(init?: Partial<RenderedProject>) {
    Object.assign(this, init);
  }
}
