import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TimelineListItemDirective } from './timeline-list-item.directive';

@Component({
  selector: 'aj-timeline-list',
  templateUrl: './timeline-list.component.html',
  styleUrls: ['./timeline-list.component.scss']
})
export class TimelineListComponent implements OnInit {
  @ContentChildren(TimelineListItemDirective, { descendants: false } ) listItems: QueryList<TimelineListItemDirective>;

  ngOnInit(): void {

  }
}
