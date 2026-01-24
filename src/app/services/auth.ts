import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage';
import { environment } from '../../environments/environment';

export type LoginDto = { email: string; password: string };
export type RegisterDto = { email: string; password: string };

/** API: 200/201 with { token } and optionally { user }. */
type AuthResponse = { token?: string; accessToken?: string; user?: unknown };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(TokenStorageService);
  private base = environment.apiUrl;
  private _authed$ = new BehaviorSubject<boolean>(!!this.storage.getToken());
  authed$ = this._authed$.asObservable();

  isLoggedIn(): boolean {
    return !!this.storage.getToken();
  }

  /** POST /api/auth/login — 200 + { token }. */
  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/api/auth/login`, dto).pipe(
      tap((res) => {
        const t = res?.token ?? res?.accessToken;
        if (t) this.storage.setToken(t);
        if (res?.user != null) this.storage.setUser(res.user);
        this._authed$.next(true);
      })
    );
  }

  /** POST /api/auth/register — 201 + { token }. */
  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/api/auth/register`, dto).pipe(
      tap((res) => {
        const t = res?.token ?? res?.accessToken;
        if (t) this.storage.setToken(t);
        if (res?.user != null) this.storage.setUser(res.user);
        this._authed$.next(true);
      })
    );
  }

  logout(): void {
    this.storage.clear();
    this._authed$.next(false);
  }

  hasRole(role: string): boolean {
    const user = this.storage.getUser() as { role?: string } | null;
    return !!user?.role && user.role === role;
  }
}
