import { TestBed } from '@angular/core/testing';

import { FirstTimeInterceptor } from './first-time.interceptor';

describe('FirstTimeInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FirstTimeInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FirstTimeInterceptor = TestBed.inject(FirstTimeInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
