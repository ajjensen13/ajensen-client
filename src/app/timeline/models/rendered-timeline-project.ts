import { RelativeDimensions } from './relative-dimensions';
import { TimelineProject } from '../../services/timeline.service';

export class RenderedTimelineProject {
  project: TimelineProject;
  // Dimensions of the entire project. This is the bounding box around timeRangeDimensions and contentDimensions
  dimensions: RelativeDimensions;
  // Dimensions of the header for this project
  headerDimensions: RelativeDimensions;

  constructor(init?: Partial<RenderedTimelineProject>) {
    Object.assign(this, init);
  }

  hasSameDimensions(other: RenderedTimelineProject): boolean {
    return other &&
      this.dimensions.equals(other.dimensions) &&
      this.headerDimensions.equals(other.headerDimensions);
  }

  hasFiniteDimensions(): boolean {
    return this.dimensions.hasFiniteDimensions() &&
        this.headerDimensions.hasFiniteDimensions();
  }
}
