import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage';

type LoginDto = { email: string; password: string };
type AuthResponse = { accessToken: string; user: any };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api'; // عدّلها حسب الباك
  private _authed$ = new BehaviorSubject<boolean>(false); // في البداية تكون القيمة false
  authed$ = this._authed$.asObservable();

  constructor(private http: HttpClient, private storage: TokenStorageService) {
    // هنا بعد التهيئة، هنقوم بتعيين القيمة بناءً على الـ token
    this._authed$.next(!!this.storage.getToken());
  }

  isLoggedIn(): boolean {
    return !!this.storage.getToken();
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/login`, dto).pipe(
      tap(res => {
        this.storage.setToken(res.accessToken);
        this.storage.setUser(res.user);
        this._authed$.next(true); // بعد التحقق، يتم تحديث القيمة إلى true
      })
    );
  }

  logout(): void {
    this.storage.clear();
    this._authed$.next(false); // بعد تسجيل الخروج، نقوم بتحديث القيمة إلى false
  }

  hasRole(role: string): boolean {
    const user = this.storage.getUser(); // لا حاجة لـ <any>
    return !!user?.role && user.role === role;
  }
}
