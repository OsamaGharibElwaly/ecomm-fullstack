import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Prefixes relative request URLs with environment.apiUrl.
 * Skips absolute URLs (http://, https://, //).
 */
export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  const isRelative = url.startsWith('/') && !url.startsWith('//');
  if (!isRelative) return next(req);

  const base = (environment.apiUrl || '').replace(/\/$/, '');
  const full = base ? base + url : url;
  return next(req.clone({ url: full }));
};
