import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    role: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  get f() { return this.signinForm.controls; }

  onSubmit() {
    if (this.signinForm.invalid) return;
    this.authService.login(this.signinForm.value).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.user.id);
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('userName', res.user.name);
        this.router.navigate([`/${res.user.role}`]);
      },
      error: err => alert(err.error.message || 'Login failed')
    });
  }
}