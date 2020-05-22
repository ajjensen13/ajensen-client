import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

@Component({
  selector: 'aj-timeline-list',
  templateUrl: './timeline-list.component.html',
  styleUrls: ['./timeline-list.component.scss']
})
export class TimelineListComponent implements OnInit {
  @Input() listItems: Observable<Project[]>;

  ngOnInit(): void {

  }
}
