import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

type ErrorState = { status?: number; message?: string; code?: string };

function getTitleAndSubtitle(status: number): { title: string; subtitle: string } {
  switch (status) {
    case 0:
      return { title: 'Connection Problem', subtitle: 'Network error or request blocked. Please check your connection and try again.' };
    case 400:
      return { title: 'Bad Request', subtitle: 'The request could not be understood or was invalid.' };
    case 401:
      return { title: 'Unauthorized', subtitle: 'You need to sign in to access this.' };
    case 403:
      return { title: 'Access Denied', subtitle: 'You don\'t have permission to view this.' };
    case 404:
      return { title: 'Not Found', subtitle: 'The resource you requested could not be found.' };
    case 409:
      return { title: 'Conflict', subtitle: 'The request could not be completed due to a conflict.' };
    case 422:
      return { title: 'Validation Error', subtitle: 'The data you sent could not be processed.' };
    default:
      if (status >= 500) {
        return { title: 'Server Error', subtitle: 'Something went wrong on our end. Please try again later.' };
      }
      return { title: 'Something Went Wrong', subtitle: `The request failed with status ${status}.` };
  }
}

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './error.html',
  styleUrls: ['./error.css'],
})
export class ErrorPage {
  private router = inject(Router);

  /** From navigation state (interceptor) or history.state; fallback when opened directly. */
  status: number;
  message: string;
  title: string;
  subtitle: string;
  code?: string;

  constructor() {
    const nav = this.router.getCurrentNavigation();
    const fromNav = nav?.extras?.state?.['appError'] as ErrorState | undefined;
    const fromHistory = (typeof history !== 'undefined' && (history.state as Record<string, unknown>)?.['appError']) as ErrorState | undefined;
    const appError = fromNav ?? fromHistory ?? {};

    this.status = appError.status ?? 500;
    this.message = appError.message ?? 'An unexpected error occurred.';
    this.code = appError.code;
    const { title, subtitle } = getTitleAndSubtitle(this.status);
    this.title = title;
    this.subtitle = subtitle;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    window.history.back();
  }
}
