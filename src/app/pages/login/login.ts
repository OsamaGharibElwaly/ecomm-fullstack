import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // ReactiveFormsModule سيضاف تلقائيًا إلى imports في module إذا كنت تستخدم Angular 14 أو أكثر
})
export class LoginComponent {
  form: FormGroup; // نحدد النوع لتسهيل الوصول إلى الـ form
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // تهيئة الـ form في الـ constructor
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter methods for accessing form controls easily in the template
  get emailControl() {
    return this.form.get('email');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  submit(): void {
    if (this.form.invalid) return; // تحقق من صحة الفورم
    this.loading = true;

    const formData = this.form.value;  // استخدم `value` بدلاً من `getRawValue` إذا كنت لا تحتاج للقيم المخفية (مثل القيم المبدئية)

    // تأكد إن الـ email و الـ password مش null أو undefined
    const email = formData.email ?? '';  // تعيينها إلى قيمة فارغة إذا كانت null أو undefined
    const password = formData.password ?? '';  // نفس الشيء هنا

    // تأكد من أنه يتم إرسال البيانات بشكل صحيح
    this.auth.login({ email, password }).subscribe({
      next: () => {
        // التوجيه للصفحة المطلوبة بعد الدخول
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.loading = false; // إلغاء التحميل في حال الخطأ
      },
      complete: () => {
        this.loading = false; // إلغاء التحميل بعد العملية
      },
    });
  }
}
