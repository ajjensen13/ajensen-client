import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineTimestampComponent } from './timeline-timestamp.component';

describe('TimelineTimestampComponent', () => {
  let component: TimelineTimestampComponent;
  let fixture: ComponentFixture<TimelineTimestampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineTimestampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineTimestampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
