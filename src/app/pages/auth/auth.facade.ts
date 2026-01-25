import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth';
import type { LoginDto, RegisterDto } from '../../services/auth';

@Injectable()
export class AuthFacade {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly loading = signal(false);
  readonly serverError = signal('');

  login(dto: LoginDto): void {
    this.loading.set(true);
    this.serverError.set('');
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.auth.login(dto).subscribe({
      next: () => this.router.navigateByUrl(returnUrl),
      error: (err) => {
        const msg =
          err?.error?.message ?? err?.message ?? 'Login failed. Please try again.';
        this.serverError.set(msg);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  register(dto: RegisterDto): void {
    this.loading.set(true);
    this.serverError.set('');
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.auth.register(dto).subscribe({
      next: () => this.router.navigateByUrl(returnUrl),
      error: (err) => {
        const msg =
          err?.error?.message ??
          err?.error?.error ??
          err?.message ??
          'Registration failed. Please try again.';
        this.serverError.set(msg);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
