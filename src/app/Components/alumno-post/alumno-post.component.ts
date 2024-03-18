import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-alumno-post',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './alumno-post.component.html',
  styleUrl: './alumno-post.component.css'
})
export class AlumnoPostComponent {
  alumnoObj: Alumno;
  alumnoForm: FormGroup;
  carreraObj: Carrera;
  carreras: Carrera[] = [];
  grupoObj: Grupo;
  grupos: Grupo[] = [];
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService) {
    this.alumnoForm = this.formBuilder.group({
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
      matricula: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      carrera_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]],
      grupo_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.alumnoObj = new Alumno();
    this.grupoObj = new Grupo();
    this.carreraObj = new Carrera();
  }

  ngOnInit(): void {
    this.alumnoForm = this.formBuilder.group({
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
      matricula: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      carrera_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]],
      grupo_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.obtenerGrupos();
    this.obtenerCarreras()
  }
  

  agregarAlumno() {
    if (this.alumnoForm.invalid) {
      return; 
    }
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://127.0.0.1:8000/api/auth/postAlumnos', this.alumnoObj, { headers: headers2 }).subscribe(
      (res: any) => {
        if (res.msg === "Alumno creada") {
          alert("Alumno creada");
          this.router.navigate(['layout/alumnos']);
        } else {
          alert("Error al crear la alumno");
          console.log("Error al crear la alumno:", res);
        }
      },
      (error) => {
        console.error("Error en la solicitud HTTP:", error);
      }
    );
  }

  obtenerGrupos() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getGrupos', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Grupos") {
        this.grupos = res.data;
      } else {
        console.log("Error al obtener los grupos:", res);
      }
    });
  }

  obtenerCarreras() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getCarreras', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Carreras") {
        this.grupos = res.data;
      } else {
        console.log("Error al obtener las carreras:", res);
      }
    });
  }

}

export class Alumno {
  id : number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  matricula: string;
  carrera_id: number;
  grupo_id: number;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.apellido_materno = '';
    this.apellido_paterno = '';
    this.matricula = '';
    this.carrera_id = 0;
    this.grupo_id = 0;
  }
}

export class Carrera {
  id : number;
  nombre: string;
  clave: string;
  escuela_id: number;
  active: boolean;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.escuela_id = 0;
    this.active = false;
  }
}

  export class Grupo {
    id : number;
    nombre: string;
    clave: string;
    carrera_id: number;
    turno_id: number;
    active: boolean;
    constructor(){
      this.id = 0;
      this.nombre = '';
      this.clave = '';
      this.carrera_id = 0;
      this.turno_id = 0;
      this.active = false;
    }
  }


