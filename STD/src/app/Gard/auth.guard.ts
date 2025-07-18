import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const url = state.url;

    if (!token || !role) {
      this.router.navigate(['/home']);
      return false;
    }

    if (role === 'student') {
      if (url.startsWith('/student')) {
        return true;
      } else {
        this.router.navigate(['/student']);
        return false;
      }
    }

    if (role === 'teacher') {
      if (url.startsWith('/teacher')) {
        return true;
      } else {
        this.router.navigate(['/teacher']);
        return false;
      }
    }

    // Default fallback
    this.router.navigate(['/home']);
    return false;
  }
} 