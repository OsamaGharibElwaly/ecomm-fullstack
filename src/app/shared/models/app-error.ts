import { HttpErrorResponse } from '@angular/common/http';

/** Normalized error shape for HTTP and app errors. */
export interface AppError {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
}

const DEFAULT_MESSAGES: Record<number, string> = {
  0: 'Network error or request blocked.',
  400: 'Bad request.',
  401: 'Unauthorized.',
  403: 'Forbidden.',
  404: 'Not found.',
  409: 'Conflict.',
  422: 'Unprocessable entity.',
};

function getDefaultMessage(status: number): string {
  if (DEFAULT_MESSAGES[status] != null) return DEFAULT_MESSAGES[status];
  if (status >= 500) return 'Internal server error.';
  return `Request failed with status ${status}.`;
}

function getMessageFromBody(body: unknown): string | null {
  if (body == null) return null;
  const o = body as Record<string, unknown>;
  return (typeof o['message'] === 'string' ? o['message']
    : typeof o['error'] === 'string' ? o['error']
    : typeof o['msg'] === 'string' ? o['msg']
    : null) ?? null;
}

function getCodeFromBody(body: unknown): string | undefined {
  if (body == null || typeof body !== 'object') return undefined;
  const o = body as Record<string, unknown>;
  const c = o['code'] ?? o['errorCode'];
  return typeof c === 'string' ? c : undefined;
}

/**
 * Normalizes an HttpErrorResponse into AppError.
 * Handles 0, 4xx, 5xx; extracts message/code from body when possible.
 */
export function normalizeHttpError(res: HttpErrorResponse): AppError {
  const status = res.status ?? 0;
  const body = res.error;
  const message = getMessageFromBody(body) ?? getDefaultMessage(status);
  const code = getCodeFromBody(body);
  return {
    status,
    message,
    ...(code != null && { code }),
    ...(body !== undefined && { details: body }),
  };
}

/**
 * Error class that implements AppError. Thrown by the HTTP error interceptor
 * after normalizing HttpErrorResponse. Preserves original for debugging.
 */
export class AppHttpError extends Error implements AppError {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;
  readonly original?: HttpErrorResponse;

  constructor(appError: AppError, original?: HttpErrorResponse) {
    super(appError.message);
    this.name = 'AppHttpError';
    Object.setPrototypeOf(this, AppHttpError.prototype);
    this.status = appError.status;
    this.code = appError.code;
    this.details = appError.details;
    this.original = original;
  }
}
