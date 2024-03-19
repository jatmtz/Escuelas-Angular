import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-alumno-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './alumno-edit.component.html',
  styleUrl: './alumno-edit.component.css'
})
export class AlumnoEditComponent {
  alumnoObj: Alumno;
  alumnoForm: FormGroup;
  carreraObj: Carrera;
  carreras: Carrera[] = [];
  grupoObj: Grupo;
  grupos: Grupo[] = [];
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService) {
    const alumnoId = this.route.snapshot.paramMap.get('id');
    this.obtenerAlumnoPorId(alumnoId);
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
    const alumnoId = this.route.snapshot.paramMap.get('id');
    this.obtenerAlumnoPorId(alumnoId);
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
    this.obtenerGrupos(0);
    this.obtenerCarreras()
  }
  

  editarAlumno() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put('http://127.0.0.1:8000/api/putAlumnos/' + this.alumnoObj.id, this.alumnoObj, { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Alumno actualizada") {
        alert("Alumno actualizada");
        this.router.navigate(['/layout/alumnos']);
      } else {
        console.log("Error al actualizar la alumno:", res);
      }
    });
  }

  obtenerGrupos(carrera_id: number) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/GruposCarrera/'+carrera_id, { headers: headers2 }).subscribe((res: any) => {
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

  obtenerAlumnoPorId(alumnoId: any) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/showAlumnos/' + alumnoId, { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Alumno") {
        this.alumnoObj = res.data;
        this.alumnoObj.id = this.alumnoObj.id;
        this.alumnoObj.nombre = this.alumnoObj.nombre;
        this.alumnoObj.apellido_materno = this.alumnoObj.apellido_materno;
        this.alumnoObj.apellido_paterno = this.alumnoObj.apellido_paterno;
        this.alumnoObj.matricula = this.alumnoObj.matricula;
        this.alumnoObj.carrera_id = this.alumnoObj.carrera_id;
        this.alumnoObj.grupo_id = this.alumnoObj.grupo_id;
      } else {
        console.log("Error al obtener los detalles de la alumno:", res);
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



