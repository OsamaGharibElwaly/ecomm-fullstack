import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../services/auth-store';

/** Skips adding Authorization for these paths (e.g. login does not send a token). */
const SKIP_AUTH_PATHS = ['/api/auth/login'] as const;

function shouldSkipAuth(url: string): boolean {
  return SKIP_AUTH_PATHS.some((p) => url.includes(p));
}

/**
 * Adds Authorization: Bearer &lt;token&gt; from AuthStore (signals).
 * Does not add the header for /api/auth/login. Skips when token is absent.
 */
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);
  const token = store.token();

  if (!token || shouldSkipAuth(req.url)) return next(req);

  return next(
    req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  );
};
