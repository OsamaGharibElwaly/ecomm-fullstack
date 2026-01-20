export class TokenStorageService {

  // استرجاع الـ token
  getToken(): string | null {
    // تحقق من بيئة المتصفح
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null; // في حال كان الكود يعمل في بيئة الخادم
  }

  // تعيين الـ token
  setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    }
  }

  // مسح الـ token
  clear(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
  }

  // استرجاع الـ user
  getUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return null; // في حال كان الكود يعمل في بيئة الخادم
  }

  // تعيين الـ user
  setUser(user: any): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}
