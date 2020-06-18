import { Injectable } from '@angular/core';
import { RelativeDimensions } from '../timeline/models/relative-dimensions';
import { Observable, Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService {
  private resizes: Subject<RelativeDimensions>;

  constructor() {
    this.resizes = new Subject();
  }

  publish(dim: RelativeDimensions) {
    this.resizes.next(dim);
  }

  observe(): Observable<RelativeDimensions> {
    return this.resizes.asObservable().pipe(throttleTime(200, async,  { leading: false, trailing: true }));
  }
}
