import { Injectable } from '@angular/core';
import { Box } from '../box/box';
import { TimelineProject } from './project/timeline-project';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawnTimelineProjectService {
  private data: Map<string, Subject<Box>>;

  constructor() {
    this.data = new Map<string, Subject<Box>>();
  }

  private getSubject(key: string): Subject<Box> {
    if (!this.data.has(key)) {
      this.data.set(key, new ReplaySubject<Box>(1));
    }

    const subj = this.data.get(key);
    if (!subj) {
      throw new Error('key was undefined');
    }
    return subj;
  }

  getObservable(key: TimelineProject): Observable<Box> {
    return this.getSubject(key.id).asObservable();
  }

  next(key: TimelineProject, box?: Box): void {
    this.getSubject(key.id).next(box);
  }
}
