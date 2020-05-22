import { Injectable } from '@angular/core';
import { Tag } from '../models/tag';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.tags = http
        .get<Tag[]>(this.apiUrl + '/tags')
        .pipe(
            map(js => js.map(j => TagService.jsonTagToTag(j))),
            shareReplay(1)
        );

    this.tagLookup = this.tags
        .pipe(
            map(ts => {
              const result = new Map<string, Tag>();
              for (const t of ts) {
                result.set(t.id, t);
              }
              return result;
            })
        );
  }
  private readonly apiUrl: string;
  private readonly tags: Observable<Tag[]>;
  private readonly tagLookup: Observable<Map<string, Tag>>;

  private static jsonTagToTag(j: JsonTag): Tag {
    return new Tag({
      id: j.id,
      title: j.title,
      hyperlink: j.hyperlink
    });
  }

  getTags(): Observable<Tag[]> {
    return this.tags;
  }

  getTag(id: string): Observable<Tag> {
    return this.tagLookup
        .pipe(map(ls => ls.get(id)));
  }
}

export class JsonTag {
  id: string;
  title: string;
  hyperlink: string;

  constructor(init?: Partial<JsonTag>) {
    Object.assign(this, init);
  }
}
