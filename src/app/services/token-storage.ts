import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage)
      return localStorage.getItem('token');
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage)
      localStorage.setItem('token', token);
  }

  clear(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  getUser(): unknown {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return JSON.parse(localStorage.getItem('user') ?? 'null');
      } catch { return null; }
    }
    return null;
  }

  setUser(user: unknown): void {
    if (typeof window !== 'undefined' && window.localStorage)
      localStorage.setItem('user', JSON.stringify(user ?? {}));
  }
}
