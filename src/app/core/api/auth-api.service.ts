import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type LoginDto = { email: string; password: string };
export type RegisterDto = { email: string; password: string; name?: string };

/** API: 200/201 with { token } and optionally { user }. */
export type AuthResponse = { token?: string; accessToken?: string; user?: unknown };

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private http = inject(HttpClient);

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', dto);
  }

  register(dto: RegisterDto): Observable<AuthResponse> {
    const body = { email: dto.email, password: dto.password, ...(dto.name && { name: dto.name }) };
    return this.http.post<AuthResponse>('/api/auth/register', body);
  }
}
