import { Tag } from './tag';

export class TimelineProject {
  id: string;
  title: string;
  contentHtml: string;
  startDate: Date;
  endDate?: Date;
  tags: Tag[];
  parent?: TimelineProject;
  children: TimelineProject[];

  constructor(init?: Partial<TimelineProject>) {
    Object.assign(this, init);
  }
}
