import { TestBed, inject } from '@angular/core/testing';

import { CustomerVisitsService } from './customer-visits.service';

describe('CustomerVisitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerVisitsService]
    });
  });

  it('should be created', inject([CustomerVisitsService], (service: CustomerVisitsService) => {
    expect(service).toBeTruthy();
  }));
});
