import { Tag } from '../../tag/tag.service';

export class TimelineProject {
  id: string;
  title: string;
  summary: string;
  contentHtml: string;
  startDate: Date;
  endDate?: Date;
  tags: Tag[];
  parent?: TimelineProject;
  children: TimelineProject[];
  color: string;

  constructor(init?: Partial<TimelineProject>) {
    Object.assign(this, init);
  }
}
