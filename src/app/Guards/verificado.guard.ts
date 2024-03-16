import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const verificadoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (authService.isLoggedIn() && token) { 
    return true;
  }
  router.navigate(['/codigo']);
  return false;

};
