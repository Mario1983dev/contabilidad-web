import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

function hasToken(): boolean {
  const token = localStorage.getItem('token');
  return !!token && token.trim().length > 0;
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (!hasToken()) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (hasToken()) {
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};
