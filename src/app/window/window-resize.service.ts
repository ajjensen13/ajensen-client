import { Injectable } from '@angular/core';
import { Box } from '../box/box';
import { Observable, Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService {
  private resizes: Subject<Box>;

  constructor() {
    this.resizes = new Subject();
  }

  publish(dim: Box) {
    this.resizes.next(dim);
  }

  observe(): Observable<Box> {
    return this.resizes.asObservable().pipe(throttleTime(200, async,  { leading: false, trailing: true }));
  }
}
