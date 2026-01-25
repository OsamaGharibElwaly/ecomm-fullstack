import { Injectable, inject, signal, type WritableSignal } from '@angular/core';
import { TokenStorageService } from './token-storage';

/**
 * Single source of truth for the auth token (signals).
 * Persists to TokenStorage; use setToken/clearToken to mutate.
 */
@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly storage = inject(TokenStorageService);

  readonly token: WritableSignal<string | null> = signal<string | null>(
    this.storage.getToken() ?? null
  );

  setToken(t: string): void {
    this.storage.setToken(t);
    this.token.set(t);
  }

  /** Clears token and user (calls TokenStorage.clear). */
  clearToken(): void {
    this.storage.clear();
    this.token.set(null);
  }
}
