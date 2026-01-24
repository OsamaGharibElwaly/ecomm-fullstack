import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './auth-nav.html',
})
export class AuthNavComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private el = inject(ElementRef<HTMLElement>);

  isLoggedIn = toSignal(this.auth.authed$, { initialValue: this.auth.isLoggedIn() });
  menuOpen = signal(false);

  get displayName(): string {
    return this.auth.getDisplayName();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (this.menuOpen() && !this.el.nativeElement.contains(e.target as Node))
      this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  goAccount(): void {
    this.menuOpen.set(false);
    this.router.navigate(['/account']);
  }

  logout(): void {
    this.menuOpen.set(false);
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
