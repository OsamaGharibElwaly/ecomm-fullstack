import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage';

export interface AccountUser {
  name?: string;
  email?: string;
  username?: string;
  createdAt?: string;
  id?: string | number;
}

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  private http = inject(HttpClient);
  private storage = inject(TokenStorageService);
  private base = environment.apiUrl;

  /**
   * Fetches current user from GET /api/auth/me. Sends Bearer token.
   * On 404/error, falls back to stored user from login/register.
   * Supports { user } or flat user. createdAt from API when available.
   */
  getMe(): Observable<AccountUser | null> {
    const token = this.storage.getToken();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    return this.http
      .get<AccountUser | { user?: AccountUser }>(`${this.base}/api/auth/me`, { headers })
      .pipe(
        map((res) => {
          if (res && typeof res === 'object') {
            const u = (res as { user?: AccountUser }).user ?? (res as AccountUser);
            if (u && (u.email ?? u.name ?? u.username)) return u;
          }
          return null;
        }),
        catchError(() => {
          const u = this.storage.getUser() as AccountUser | null;
          return of(u ?? null);
        })
      );
  }
}
