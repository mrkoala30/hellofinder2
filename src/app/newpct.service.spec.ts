import { TestBed, inject } from '@angular/core/testing';

import { NewpctService } from './newpct.service';

describe('NewpctService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewpctService]
    });
  });

  it('should be created', inject([NewpctService], (service: NewpctService) => {
    expect(service).toBeTruthy();
  }));
});
