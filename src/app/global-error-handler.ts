import { ErrorHandler, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Global ErrorHandler: captures non-HTTP runtime errors and unhandled
 * promise rejections. Does not show UI; only logs. Routing 404 is
 * handled by the NotFound route, not here.
 */
export class GlobalErrorHandler extends ErrorHandler {
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    super();
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('unhandledrejection', this.onUnhandledRejection);
    }
  }

  override handleError(error: unknown): void {
    this.capture(error, 'handleError');
  }

  private onUnhandledRejection = (event: PromiseRejectionEvent): void => {
    this.capture(event.reason, 'unhandledrejection');
  };

  private capture(value: unknown, source: string): void {
    console.error(`[GlobalErrorHandler] ${source}:`, value);
  }
}
