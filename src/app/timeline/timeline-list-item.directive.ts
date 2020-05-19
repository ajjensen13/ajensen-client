import { ComponentRef, Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ajTimelineListItem]'
})
export class TimelineListItemDirective {

  constructor(public templateRef: TemplateRef<any>) {}
}
