import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  Onlogin(credentials: any) {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', credentials);
  }
}
