import { inject, TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';

/* tslint:disable:no-unused-variable */

describe('Service: Common', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonService]
    });
  });

  it('should ...', inject([CommonService], (service: CommonService) => {
    expect(service).toBeTruthy();
  }));
});
