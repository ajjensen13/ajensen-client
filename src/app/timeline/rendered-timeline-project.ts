import { RelativeDimensions } from './relative-dimensions';
import { TimelineProject } from '../services/timeline.service';

export class RenderedTimelineProject {
  project: TimelineProject;
  // Dimensions of the entire project. This is the bounding box around timeRangeDimensions and contentDimensions
  projectDimensions: RelativeDimensions;
  // Dimensions of the rendered time range (Ex: May 2020 - June 2020)
  timeRangeDimensions: RelativeDimensions;
  // Dimensions of the rendered project's content
  contentDimensions: RelativeDimensions;

  constructor(init?: Partial<RenderedTimelineProject>) {
    Object.assign(this, init);
  }

  hasSameDimensions(other: RenderedTimelineProject): boolean {
    return other &&
      this.projectDimensions.equals(other.projectDimensions) &&
      this.timeRangeDimensions.equals(other.timeRangeDimensions) &&
      this.contentDimensions.equals(other.contentDimensions);
  }

  hasFiniteDimensions(): boolean {
    return this.projectDimensions.hasFiniteDimensions() &&
        this.timeRangeDimensions.hasFiniteDimensions() &&
        this.contentDimensions.hasFiniteDimensions();
  }
}
