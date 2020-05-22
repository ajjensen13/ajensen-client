import { Tag } from './tag';

export class Project {
  id: string;
  title: string;
  contentHtml: string;
  startDate: Date;
  endDate?: Date;
  tags: Tag[];
  parent?: string;

  constructor(init?: Partial<Project>) {
    Object.assign(this, init);
  }
}
