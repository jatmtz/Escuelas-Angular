import { inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CanActivateFn, CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../Services/auth.service';


export const tokenauthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (authService.isLoggedIn() && token) { 
    return true;
  }
  router.navigate(['/login']);
  return false;
};

export const verificaGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const http = inject(HttpClient);
  const cookieService = inject(CookieService);
  const token = localStorage.getItem('token');
  if (authService.isLoggedIn() && token) { 
    const token = cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    http.post('http://127.0.0.1:8000/api/auth/me',{ headers: headers2 }).subscribe((rest: any) => {
      console.log(rest);
      if (rest && rest.verificado === 1) {
        cookieService.set('rol', rest.rol_id);
        return true;
      }
      router.navigate(['/codigo']);
      return false;
    });
    return true;
  }
  console.log('no logeado');
  router.navigate(['/login']);
  return false;

};

export const rolAdmin = (route: Route, segments: UrlSegment[]) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const http = inject(HttpClient);
  const token = localStorage.getItem('token');
  if (authService.isLoggedIn() && token) { 
    const token = cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (cookieService.get('rol') === '1') {
      return true;
    }
    router.navigate(['/login']);
    return false;
  }
  else {
    router.navigate(['/login']);
    return false;
  }
};


export const rolUser = (route: Route, segments: UrlSegment[]) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const http = inject(HttpClient);
  const token = localStorage.getItem('token');
  if (authService.isLoggedIn() && token) { 
    if (cookieService.get('rol') === '2' || cookieService.get('rol') === '1'){
      return true;
    }
  }
  else {
    router.navigate(['/login']);
    return false;
  }
  router.navigate(['/login']);
  return false;
};