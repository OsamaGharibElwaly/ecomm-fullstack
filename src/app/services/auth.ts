import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage';
import { AuthStore } from './auth-store';

export type LoginDto = { email: string; password: string };
export type RegisterDto = { email: string; password: string; name?: string };

/** API: 200/201 with { token } and optionally { user }. */
type AuthResponse = { token?: string; accessToken?: string; user?: unknown };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(TokenStorageService);
  private authStore = inject(AuthStore);
  private _authed$ = new BehaviorSubject<boolean>(!!this.authStore.token());
  authed$ = this._authed$.asObservable();

  isLoggedIn(): boolean {
    return !!this.authStore.token();
  }

  /** Display name: user.name ?? user.username ?? user.email ?? ''. */
  getDisplayName(): string {
    const u = this.storage.getUser() as { name?: string; username?: string; email?: string } | null;
    return (u?.name ?? u?.username ?? u?.email ?? '').trim();
  }

  /** POST /api/auth/login — 200 + { token } and optionally { user }. */
  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', dto).pipe(
      tap((res) => {
        const t = res?.token ?? res?.accessToken;
        if (t) this.authStore.setToken(t);
        if (res?.user != null) this.storage.setUser(res.user);
        this._authed$.next(true);
      })
    );
  }

  /** POST /api/auth/register — 201 + { token }. Sends { email, password, name? }. Sets user from res.user or { name, email } from dto. */
  register(dto: RegisterDto): Observable<AuthResponse> {
    const body = { email: dto.email, password: dto.password, ...(dto.name && { name: dto.name }) };
    return this.http.post<AuthResponse>('/api/auth/register', body).pipe(
      tap((res) => {
        const t = res?.token ?? res?.accessToken;
        if (t) this.authStore.setToken(t);
        const u = res?.user ?? (dto.name || dto.email ? { name: dto.name, email: dto.email } : undefined);
        if (u != null) this.storage.setUser(u);
        this._authed$.next(true);
      })
    );
  }

  logout(): void {
    this.authStore.clearToken();
    this._authed$.next(false);
  }

  hasRole(role: string): boolean {
    const user = this.storage.getUser() as { role?: string } | null;
    return !!user?.role && user.role === role;
  }
}
