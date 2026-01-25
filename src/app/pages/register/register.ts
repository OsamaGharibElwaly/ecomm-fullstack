import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFacade } from '../auth/auth.facade';

function confirmPasswordMatch(g: AbstractControl): ValidationErrors | null {
  const p = g.get('password')?.value;
  const c = g.get('confirmPassword')?.value;
  if (!p || !c) return null;
  return p === c ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [AuthFacade],
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  readonly f = inject(AuthFacade);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: confirmPasswordMatch }
    );
  }

  get nameControl() {
    return this.form.get('name');
  }
  get emailControl() {
    return this.form.get('email');
  }
  get passwordControl() {
    return this.form.get('password');
  }
  get confirmControl() {
    return this.form.get('confirmPassword');
  }
  get mismatch() {
    return this.form.hasError('mismatch');
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const { name = '', email = '', password = '' } = this.form.value;
    this.f.register({ email, password, name: name.trim() || undefined });
  }
}
