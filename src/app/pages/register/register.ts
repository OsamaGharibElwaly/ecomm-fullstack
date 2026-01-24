import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup;
  loading = false;
  serverError = '';

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

  get nameControl() { return this.form.get('name'); }
  get emailControl() { return this.form.get('email'); }
  get passwordControl() { return this.form.get('password'); }
  get confirmControl() { return this.form.get('confirmPassword'); }
  get mismatch() { return this.form.hasError('mismatch'); }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.loading = true;
    this.serverError = '';
    const { name = '', email = '', password = '' } = this.form.value;

    this.auth.register({ email, password, name: name.trim() || undefined }).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message ?? err?.error?.error ?? err?.message ?? 'Registration failed. Please try again.';
        this.serverError = msg;
      },
      complete: () => { this.loading = false; },
    });
  }
}
