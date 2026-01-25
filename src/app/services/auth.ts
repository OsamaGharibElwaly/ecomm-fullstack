import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenStorageService } from './token-storage';
import { AuthStore } from './auth-store';
import { AuthApiService, type LoginDto, type RegisterDto } from '../core/api/auth-api.service';

export type { LoginDto, RegisterDto };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authApi = inject(AuthApiService);
  private storage = inject(TokenStorageService);
  private authStore = inject(AuthStore);
  private _authed$ = new BehaviorSubject<boolean>(!!this.authStore.token());
  authed$ = this._authed$.asObservable();

  isLoggedIn(): boolean {
    return !!this.authStore.token();
  }

  getDisplayName(): string {
    const u = this.storage.getUser() as { name?: string; username?: string; email?: string } | null;
    return (u?.name ?? u?.username ?? u?.email ?? '').trim();
  }

  login(dto: LoginDto): Observable<{ token?: string; accessToken?: string; user?: unknown }> {
    return this.authApi.login(dto).pipe(
      tap((res) => {
        const t = res?.token ?? res?.accessToken;
        if (t) this.authStore.setToken(t);
        if (res?.user != null) this.storage.setUser(res.user);
        this._authed$.next(true);
      }),
    );
  }

  register(dto: RegisterDto): Observable<{ token?: string; accessToken?: string; user?: unknown }> {
    return this.authApi.register(dto).pipe(
      tap((res) => {
        const t = res?.token ?? res?.accessToken;
        if (t) this.authStore.setToken(t);
        const u = res?.user ?? (dto.name || dto.email ? { name: dto.name, email: dto.email } : undefined);
        if (u != null) this.storage.setUser(u);
        this._authed$.next(true);
      }),
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
