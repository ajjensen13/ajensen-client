import { Component, HostListener, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.scss'],
  animations: [
      trigger('expand', [
          transition(':enter', [
            style({ transform: 'translateY(-50%)', opacity: 0 }),
              animate('150ms', style({ transform: 'translateY(0)', opacity: 1 }))
          ])
      ])
  ]
})
export class AwardComponent implements OnInit {
  @Input() title: string;
  @Input() descriptionHTML: string;
  @Input() expanded: boolean;
  @Input() year: number;
  @HostListener('click') onClick() {
    this.expanded = !this.expanded;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
