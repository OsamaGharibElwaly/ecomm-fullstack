import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFacade } from '../auth/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [AuthFacade],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  readonly f = inject(AuthFacade);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailControl() {
    return this.form.get('email');
  }
  get passwordControl() {
    return this.form.get('password');
  }

  submit(): void {
    if (this.form.invalid) return;
    const { email = '', password = '' } = this.form.value;
    this.f.login({ email, password });
  }
}
