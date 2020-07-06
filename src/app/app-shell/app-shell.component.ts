import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
  @Input() showProfileIcon: boolean;
  @Input() showTimelineIcon: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }
}
