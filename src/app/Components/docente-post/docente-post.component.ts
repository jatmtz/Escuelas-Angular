import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-docente-post',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './docente-post.component.html',
  styleUrl: './docente-post.component.css'
})
export class DocentePostComponent {
  docenteObj: Docente;
  docenteForm: FormGroup;
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService) {
    this.docenteForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]],
      apellido_materno: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]],
      apellido_paterno: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]],
      rfc: ['', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(13)
      ]]
    });
    this.docenteObj = new Docente();
  }

  ngOnInit(): void {
    this.docenteForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]],
      apellido_materno: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]],
      apellido_paterno: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]],
      rfc: ['', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(13)
      ]]
    });
  }
  

  agregarDocente() {
    if (this.docenteForm.invalid) {
      return;
    }
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://' + window.location.hostname + ':8000/api/auth/postDocentes', this.docenteObj, { headers: headers2 }).subscribe(
      (res: any) => {
        if (res.msg === "Docente creado") {
          alert("Docente creado");
          this.router.navigate(['layout/profesores']);
        } else {
          alert("Error al crear el docente");
          console.log("Error al crear el docente:", res);
        }
      },
      (error) => {
        console.error("Error en la solicitud HTTP:", error);
      }
    );
  }
}

export class Docente {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rfc: string;
  constructor() {
    this.nombre = '';
    this.apellido_materno = '';
    this.apellido_paterno='';
    this.rfc = '';
  }
}
