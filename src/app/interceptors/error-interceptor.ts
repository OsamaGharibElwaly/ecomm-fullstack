import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth';
import { AppHttpError, normalizeHttpError } from '../shared/models/app-error';

const LOGIN_API = '/api/auth/login';
const ME_API = '/api/auth/me';

/**
 * HTTP Error Interceptor: normalizes all HttpErrorResponse into AppError
 * (thrown as AppHttpError), handles 401 by clearing auth and redirecting
 * to /login (except when the failed request was to the login API).
 * Does not redirect for 404s on /api/auth/me (handled gracefully by AccountApiService).
 * Does not show UI; only normalizes and rethrows.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((err: unknown) => {
      if (!(err instanceof HttpErrorResponse)) return throwError(() => err);

      const appError = normalizeHttpError(err);
      const isMeApi = err.url?.includes(ME_API);

      if (appError.status === 401 && !err.url?.includes(LOGIN_API)) {
        auth.logout();
        router.navigate(['/auth/login']);
      } else if (
        !(appError.status === 401 && err.url?.includes(LOGIN_API)) &&
        !(appError.status === 404 && isMeApi)
      ) {
        router.navigate(['/error'], {
          state: { appError: { status: appError.status, message: appError.message, code: appError.code } },
        });
      }

      return throwError(() => new AppHttpError(appError, err));
    })
  );
};
