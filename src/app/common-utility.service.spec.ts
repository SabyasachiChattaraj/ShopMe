import { TestBed, inject } from '@angular/core/testing';

import { CommonUtilityService } from './common-utility.service';

describe('CommonUtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonUtilityService]
    });
  });

  it('should be created', inject([CommonUtilityService], (service: CommonUtilityService) => {
    expect(service).toBeTruthy();
  }));
});
