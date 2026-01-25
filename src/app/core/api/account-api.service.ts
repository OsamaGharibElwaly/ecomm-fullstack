import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { TokenStorageService } from '../../services/token-storage';

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

  getMe(): Observable<AccountUser | null> {
    return this.http
      .get<AccountUser | { user?: AccountUser }>('/api/auth/me')
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
        }),
      );
  }
}
