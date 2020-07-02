import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent {
  @Input() @HostBinding('innerHTML') innerHtml: string;
}
