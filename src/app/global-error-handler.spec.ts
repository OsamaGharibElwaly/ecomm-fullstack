import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { GlobalErrorHandler } from './global-error-handler';

describe('GlobalErrorHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalErrorHandler,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
  });

  it('should capture and log when handleError is called', () => {
    const handler = TestBed.inject(GlobalErrorHandler);
    const spy = spyOn(console, 'error');
    handler.handleError(new Error('test'));
    expect(spy).toHaveBeenCalledWith('[GlobalErrorHandler] handleError:', jasmine.any(Error));
  });
});
