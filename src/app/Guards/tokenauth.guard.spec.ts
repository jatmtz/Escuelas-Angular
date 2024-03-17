import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tokenauthGuard } from './tokenauth.guard';

describe('tokenauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tokenauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
