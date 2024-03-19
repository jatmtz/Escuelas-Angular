import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../../app.component';
import exp from 'constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-codigo',
  standalone: true,
  imports: [FormsModule, AppComponent, CommonModule],
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.css']
})
export class CodigoComponent {
  isProcessing=false;
  codigo: number=0;
  errorMessage: string = '';


  constructor(private userService: UserService, private authService: AuthService, private router: Router, private http: HttpClient, private cookieService: CookieService) {
    this.errorMessage = '';
  }

  onCodigo() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(this.codigo);
    this.http.post('http://127.0.0.1:8000/api/auth/verify', { codigo: this.codigo }, { headers: headers2 }).subscribe((res: any) => {
          this.router.navigate(['/layout']);
        }, (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Código incorrecto';
          } else {
            this.errorMessage = 'Error en la solicitud';
          }
          this.isProcessing = false;
      });
      this.isProcessing = true;
    const hederss = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://127.0.0.1:8000/api/auth/me', this.codigo, { headers: hederss }).subscribe((res: any) => {
      console.log(res);
    
      if (res && res.verificado === 1) {
        this.cookieService.delete('rol');
        this.cookieService.set('rol', res.rol_id);
        return true;
      }
      this.router.navigate(['/codigo']);
      return false;
    
    }
    );
    this.isProcessing = false;
  }

  prueba() {
    const token = localStorage.getItem('token');
    const hederss = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://127.0.0.1:8000/api/auth/me', { headers: hederss }).subscribe((res: any) => {
      console.log(res);
    });

  }

}

export class Codigo {
  codigo: number;
  constructor() {
    this.codigo = 0;
  }
}