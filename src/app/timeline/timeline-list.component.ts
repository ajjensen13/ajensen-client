import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TimelineProjectComponent } from './timeline-project.component';
import { TimelineProject } from '../models/timeline-project';

@Component({
  selector: 'aj-timeline-list',
  templateUrl: './timeline-list.component.html',
  styleUrls: ['./timeline-list.component.scss'],
})
export class TimelineListComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() projects: Observable<TimelineProject[]>;
  @ViewChildren(TimelineProjectComponent, { read: ElementRef }) anchors: QueryList<ElementRef>;

  constructor() {}

  private dirty: boolean;
  private projectsSub: Subscription;

  ngOnInit(): void {
    this.projectsSub = this.projects
        .pipe(tap(() => this.dirty = true))
        .subscribe();
  }

  ngOnDestroy(): void {
    this.projectsSub.unsubscribe();
  }

  ngAfterViewChecked(): void {
    if ( !this.dirty ) { return; }
    this.dirty = false;

    for (const a of this.anchors) {
      if (!a?.nativeElement) {
        continue;
      }
      const dy = a.nativeElement.offsetHeight;
      console.log(dy);
    }
  }
}
