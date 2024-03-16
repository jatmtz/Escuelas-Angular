// auth.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const token2 = this.cookieService.get('token');
    if (!token2) {
      console.log('no token');
      return false;
    }
    if (this.tokenExpired(token2)) {
      console.log('token expirado');
      return false;
    }
    return !!token2;
  }
  
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }


}
