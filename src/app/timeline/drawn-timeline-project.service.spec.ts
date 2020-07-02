import { TestBed } from '@angular/core/testing';

import { DrawnTimelineProjectService } from './drawn-timeline-project.service';

describe('DrawnTimelineProjectService', () => {
  let service: DrawnTimelineProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawnTimelineProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
