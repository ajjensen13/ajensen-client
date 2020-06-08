import { Injectable } from '@angular/core';
import { Tag, TagService } from './tag.service';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { concatMap, map, mergeAll, mergeMap, shareReplay, toArray } from 'rxjs/operators';

export class Project {
    id: string;
    title: string;
    contentHtml: string;
    startDate: Date;
    endDate?: Date;
    tags: Tag[];
    parent?: string;
    color: string;

    constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly projects: Observable<Project[]>;
  private readonly projectLookup: Observable<Map<string, Project>>;

  constructor(private tagService: TagService, private http: HttpClient) {
    this.projects = this.http.get<JsonProject[]>(environment.apiUrl + '/projects')
      .pipe(
        mergeMap(js => js.map(j => ProjectService.jsonProjectToProject(this.tagService, j))),
        mergeAll(),
        toArray(),
        shareReplay(1)
      );

    this.projectLookup = this.projects
      .pipe(
        map(ps => {
          const result = new Map<string, Project>();
          for (const t of ps) {
            result.set(t.id, t);
          }
          return result;
        })
      );
  }

  private static jsonProjectToProject(tagService: TagService, j: JsonProject): Observable<Project> {
    let tags = j.tags;
    if (!tags) {
      tags = [];
    }
    return from(tags)
      .pipe(
        concatMap(id => tagService.getTag(id)),
        toArray()
      )
      .pipe(
        map(ts => new Project({
          id: j.id,
          title: j.title,
          contentHtml: j.contentHtml,
          startDate: new Date(j.startDate),
          endDate: j.endDate ? new Date(j.endDate) : undefined,
          tags: ts,
          parent: j.parent,
          color: j.color
        })),
        map(ts => {
          ts.startDate.setMinutes(ts.startDate.getMinutes() + ts.startDate.getTimezoneOffset());
          return ts;
        }),
        map(ts => {
          if (ts.endDate) {
            ts.endDate.setMinutes(ts.endDate.getMinutes() + ts.endDate.getTimezoneOffset());
          }
          return ts;
        })
      );
  }

  getProjects(): Observable<Project[]> {
    return this.projects;
  }

  getProject(id: string): Observable<Project> {
    return this.projectLookup
      .pipe(map(ls => ls.get(id)));
  }
}

class JsonProject {
  id: string;
  title: string;
  contentHtml: string;
  startDate: string;
  tags?: string[];
  endDate?: string;
  parent: string;
  color: string;

  constructor(init?: Partial<JsonProject>) {
    Object.assign(this, init);
  }
}
