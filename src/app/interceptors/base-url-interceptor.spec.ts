import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

import { baseUrlInterceptor } from './base-url-interceptor';

describe('baseUrlInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => baseUrlInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should prefix relative URL with apiUrl', (done) => {
    interceptor(new HttpRequest('GET', '/api/foo'), (r) => {
      expect(r.url).toMatch(/^https?:\/\//);
      expect(r.url).toContain('/api/foo');
      done();
      return of(null as any);
    });
  });

  it('should leave absolute URL unchanged', (done) => {
    const url = 'https://example.com/api';
    interceptor(new HttpRequest('GET', url), (r) => {
      expect(r.url).toBe(url);
      done();
      return of(null as any);
    });
  });
});
