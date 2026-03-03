import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      if (this.email?.errors?.['required']) {
        this.toastService.showError('Email is required.');
        return;
      }
      if (this.email?.errors?.['pattern']) {
        this.toastService.showError('Please enter a valid email address.');
        return;
      }
      if (this.password?.errors?.['required']) {
        this.toastService.showError('Password is required.');
        return;
      }
      if (this.password?.errors?.['minlength']) {
        this.toastService.showError('Password must be at least 8 characters.');
        return;
      }
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authenticationService.login({ email, password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastService.showSuccess('Login successful!', 'Success');
        localStorage.setItem('userName', response?.userName)
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        const message =
          err?.error?.message || 'Login failed. Please check your credentials.';
        this.toastService.showError(message);
      },
    });
  }
}
