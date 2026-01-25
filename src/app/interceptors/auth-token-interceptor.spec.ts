import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

import { authTokenInterceptor } from './auth-token-interceptor';
import { AuthStore } from '../services/auth-store';
import { TokenStorageService } from '../services/token-storage';

describe('authTokenInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authTokenInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthStore, TokenStorageService],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should not add Authorization for /api/auth/login', (done) => {
    interceptor(new HttpRequest('GET', '/api/auth/login'), (r) => {
      expect(r.headers.has('Authorization')).toBe(false);
      done();
      return of(null as any);
    });
  });
});
