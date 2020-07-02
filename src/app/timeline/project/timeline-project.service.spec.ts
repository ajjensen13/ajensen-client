import { TestBed } from '@angular/core/testing';

import { TimelineProjectService } from './timeline-project.service';

describe('TimelineProjectService', () => {
  let service: TimelineProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
