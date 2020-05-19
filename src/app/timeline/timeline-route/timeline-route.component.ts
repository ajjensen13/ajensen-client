import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'aj-timeline-route',
  templateUrl: './timeline-route.component.html',
  styleUrls: ['./timeline-route.component.scss'],
  animations: [
    trigger('active', [
      state('false', style({
        strokeDasharray: '0 100'
      })),
      state('true', style({
        strokeDasharray: '100 0'
      })),
      transition('false <=> true', [
        animate('500ms')
      ]),
    ])
  ]
})
export class TimelineRouteComponent implements OnInit {
  isActive: boolean;

  constructor() {  }

  ngOnInit(): void {
    setTimeout(() => this.isActive = true, 0);
  }
}
