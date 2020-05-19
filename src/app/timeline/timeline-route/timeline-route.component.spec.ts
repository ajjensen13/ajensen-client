import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineRouteComponent } from './timeline-route.component';

describe('RouteComponent', () => {
  let component: TimelineRouteComponent;
  let fixture: ComponentFixture<TimelineRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
