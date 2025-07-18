import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'student') {
      this.router.navigate(['/student']);
      return false;
    } else if (token && role === 'teacher') {
      this.router.navigate(['/teacher']);
      return false;
    }
    return true;
  }
} 