import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class Tag {
    id: string;
    title: string;
    hyperlink: string;
    color: string;

    constructor(init?: Partial<Tag>) {
        Object.assign(this, init);
    }
}

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
    this.tags = http
        .get<Tag[]>(environment.apiUrl + '/tags')
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

  private readonly tags: Observable<Tag[]>;
  private readonly tagLookup: Observable<Map<string, Tag>>;

  private static jsonTagToTag(j: JsonTag): Tag {
    return new Tag(j);
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
  color: string;

  constructor(init?: Partial<JsonTag>) {
    Object.assign(this, init);
  }
}
