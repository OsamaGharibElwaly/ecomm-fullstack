import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './bottom-nav.html',
})
export class BottomNavComponent {
  private auth = inject(AuthService);

  isLoggedIn = toSignal(this.auth.authed$, { initialValue: this.auth.isLoggedIn() });
}
