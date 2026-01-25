import { TestBed } from '@angular/core/testing';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { errorInterceptor } from './error-interceptor';
import { AuthService } from '../services/auth';
import { AppHttpError } from '../shared/models/app-error';

describe('errorInterceptor', () => {
  let authLogoutSpy: jasmine.Spy;
  let routerNavigateSpy: jasmine.Spy;

  const createInterceptor = (): HttpInterceptorFn => (req, next) =>
    TestBed.runInInjectionContext(() => errorInterceptor(req, next));

  beforeEach(() => {
    const auth = jasmine.createSpyObj<Pick<AuthService, 'logout'>>('AuthService', ['logout']);
    authLogoutSpy = auth.logout;
    const router = jasmine.createSpyObj<Pick<Router, 'navigate'>>('Router', ['navigate']);
    routerNavigateSpy = router.navigate;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('should pass through a successful response', (done) => {
    const req = new HttpRequest('GET', '/api/foo');
    const res = new HttpResponse({ status: 200, body: { data: 1 } });
    createInterceptor()(req, (r) => of(res)).subscribe({
      next: (v) => {
        expect(v).toBe(res);
        done();
      },
      error: () => done.fail('should not error'),
    });
  });

  it('should normalize HttpErrorResponse to AppHttpError, navigate to /error, and rethrow', (done) => {
    const req = new HttpRequest('GET', '/api/foo');
    const httpErr = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
      url: '/api/foo',
    });
    createInterceptor()(req, () => throwError(() => httpErr)).subscribe({
      next: () => done.fail('should error'),
      error: (e) => {
        expect(e instanceof AppHttpError).toBe(true);
        expect((e as AppHttpError).status).toBe(500);
        expect((e as AppHttpError).message).toContain('Internal server error');
        expect(authLogoutSpy).not.toHaveBeenCalled();
        expect(routerNavigateSpy).toHaveBeenCalledWith(
          ['/error'],
          jasmine.objectContaining({
            state: jasmine.objectContaining({
              appError: jasmine.objectContaining({ status: 500, message: jasmine.any(String) }),
            }),
          })
        );
        done();
      },
    });
  });

  it('should on 401 (non-login URL) clear auth and redirect to /auth/login', (done) => {
    const req = new HttpRequest('GET', '/api/account');
    const httpErr = new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized',
      url: 'https://api.example.com/api/account',
    });
    createInterceptor()(req, () => throwError(() => httpErr)).subscribe({
      next: () => done.fail('should error'),
      error: (e) => {
        expect(e instanceof AppHttpError).toBe(true);
        expect((e as AppHttpError).status).toBe(401);
        expect(authLogoutSpy).toHaveBeenCalled();
        expect(routerNavigateSpy).toHaveBeenCalledWith(['/auth/login']);
        done();
      },
    });
  });

  it('should on 401 for /api/auth/login not clear auth nor redirect', (done) => {
    const req = new HttpRequest('POST', '/api/auth/login');
    const httpErr = new HttpErrorResponse({
      status: 401,
      url: 'https://api.example.com/api/auth/login',
    });
    createInterceptor()(req, () => throwError(() => httpErr)).subscribe({
      next: () => done.fail('should error'),
      error: (e) => {
        expect(e instanceof AppHttpError).toBe(true);
        expect((e as AppHttpError).status).toBe(401);
        expect(authLogoutSpy).not.toHaveBeenCalled();
        expect(routerNavigateSpy).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('should rethrow non-HttpErrorResponse unchanged', (done) => {
    const req = new HttpRequest('GET', '/api/foo');
    const plainErr = new Error('custom');
    createInterceptor()(req, () => throwError(() => plainErr)).subscribe({
      next: () => done.fail('should error'),
      error: (e) => {
        expect(e).toBe(plainErr);
        expect(e instanceof HttpErrorResponse).toBe(false);
        expect(authLogoutSpy).not.toHaveBeenCalled();
        expect(routerNavigateSpy).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
