import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Project } from '../models/project';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TimelineProjectComponent } from './timeline-project.component';

@Component({
  selector: 'aj-timeline-list',
  templateUrl: './timeline-list.component.html',
  styleUrls: ['./timeline-list.component.scss'],
})
export class TimelineListComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() projects: Observable<Project[]>;

  @ViewChildren(TimelineProjectComponent, {read: ElementRef}) timelineListElements: QueryList<ElementRef>;

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

    for (const p of this.timelineListElements) {
      if (!p?.nativeElement) {
        continue;
      }
      const dy = p.nativeElement.offsetHeight;
      console.log(dy);
    }
  }
}
