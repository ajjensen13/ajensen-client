import { Injectable } from '@angular/core';
import { Project, ProjectService } from '../project/project.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from '../tag/tag.service';

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

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private static readonly rootParentId: undefined;
  private static readonly rootParent: undefined;

  constructor(private projectService: ProjectService) { }

  private static resolveChildren(
      parent: TimelineProject | typeof TimelineService.rootParent,
      unresolved: TimelineProject[]): TimelineProject[] {

    const children = unresolved.filter(this.projectsWithParentFilter(parent?.id));
    children.sort(TimelineService.temporalProjectComparison);
    unresolved = unresolved.filter(() => !this.projectsWithParentFilter(parent?.id));

    for (const child of children) {
      if (parent) {
        parent.children.push(child);
      }
      unresolved = this.resolveChildren(child, unresolved);
    }

    return unresolved;
  }

  private static projectToTimelineProject(p: Project, parent: TimelineProject | typeof TimelineService.rootParent): TimelineProject {
    return new TimelineProject({ ...p, parent, children: [] });
  }

  private static temporalProjectComparison(a: TimelineProject, b: TimelineProject): number {
    const start = b.startDate.valueOf() - a.startDate.valueOf();
    if (start !== 0) {
      return start;
    }
    if ( a.endDate ) {
      if ( b.endDate ) {
        return b.endDate.valueOf() - a.endDate.valueOf();
      }
      return a.endDate.valueOf(); // (`a` has ended & `b` hasn't) => sort `b` before `a`;
    }
    if ( b.endDate ) {
      return -b.endDate.valueOf(); // (`b` has ended, `a` hasn't) => sort `b` before `a`;
    }
    return 0;
}

  private static projectsWithParentFilter(parentId: string | typeof TimelineService.rootParentId): (p: TimelineProject) => boolean {
    return (p: TimelineProject) => p ? p.parent?.id === parentId : false;
  }

  getTimeline(): Observable<TimelineProject[]> {
    return this.projectService.getProjects()
      .pipe(
        map(x => x.map(y => TimelineService.projectToTimelineProject(y, TimelineService.rootParent))),
        map(x => x.sort(TimelineService.temporalProjectComparison)),
        map(x => {
        const unresolved = TimelineService.resolveChildren(TimelineService.rootParent, x);
        if ( unresolved.length ) {
          throw new Error('some projects could not be resolved');
        }
        return x;
      }));
  }
}
