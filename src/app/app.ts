import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth';
import { TokenStorageService } from './services/token-storage';
import { ServerModule } from '@angular/platform-server';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,ServerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [TokenStorageService, AuthService],
})
export class App {
  protected readonly title = signal('ecomm-fullstack');
}
