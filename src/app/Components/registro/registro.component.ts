import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registerObj: Register;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.registerObj = new Register()
    this.errorMessage = '';
  }

  onRegister(event: Event) {
    event.preventDefault();
    console.log(this.registerObj);
    this.http.post('http://127.0.0.1:8000/api/register', this.registerObj)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.msg === 'Usuario registrado, revisa tu correo para activar tu cuenta') {
            this.router.navigate(['/login']);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 422) {
            const errorMessageData = JSON.stringify(error.error.data);
            if (
              errorMessageData === '{"name":["The name field is required."],"email":["The email field is required."],"password":["The password field is required."]}'
              || errorMessageData === '{"email":["The email field is required."],"password":["The password field is required."]}'
              || errorMessageData === '{"password":["The password field is required."]}'
            ) {
              this.errorMessage = 'Completa el formulario';
            } else if (errorMessageData === '{"password":["The password must be at least 8 characters."]}') {
              this.errorMessage = 'La contraseña debe tener al menos 8 caracteres';
            } else {
              this.errorMessage = 'Datos incorrectos';
            }
          } else {
            this.errorMessage = 'Error en la solicitud';
          }
        }
      );
  }
}
  
export class Register {
  name: string;
  email: string;
  password: string;
  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
  }
}

