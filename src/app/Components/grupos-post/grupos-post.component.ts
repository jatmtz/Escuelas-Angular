import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-grupo-post',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './grupos-post.component.html',
  styleUrl: './grupos-post.component.css'
})
export class GrupoPostComponent {
  grupoObj: Grupo;
  grupoForm: FormGroup;
  carreraObj: Carrera;
  carreras: Carrera[] = [];
  turnoObj: Turno;
  turnos: Turno[] = [];
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder,
    private cookieService: CookieService) {
    this.grupoForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ0-9\s]+$/)
      ]],
      clave: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ0-9\s]+$/)
      ]],
      carrera_id: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]],
      turno_id: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.grupoObj = new Grupo();
    this.carreraObj = new Carrera();
    this.turnoObj = new Turno();
  }

  ngOnInit(): void {
    this.grupoForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ0-9\s]+$/)
      ]],
      clave: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-ZñÑ0-9\s]+$/)
      ]],
      carrera_id: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]],
      turno_id: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.obtenerCarreras();
    this.obtenerTurnos();
  }
  

  agregarGrupo() {
    if (this.grupoForm.invalid) {
      return; 
    }
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(this.grupoObj);
    this.http.post('http://' + window.location.hostname + ':8000/api/auth/postGrupos', this.grupoObj,{ headers: headers2 }).subscribe(
      (res: any) => {
        if (res.msg === "Grupo creado") {
          alert("Grupo creado");
          this.router.navigate(['layout/grupos']);
        } else {
          alert("Error al crear la grupo");
          console.log("Error al crear la grupo:", res);
        }
      },
      (error) => {
        console.error("Error en la solicitud HTTP:", error);
      }
    );
  }

  obtenerCarreras() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://' + window.location.hostname + ':8000/api/auth/getCarreras', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Carreras") {
        this.carreras = res.data;
      } else {
        console.log("Error al obtener los carreras:", res);
      }
    });
  }

  obtenerTurnos() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getTurnos', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Turnos") {
        this.turnos = res.data;
      } else {
        console.log("Error al obtener los turnos:", res);
      }
    });
  }

}

export class Grupo {
  nombre: string;
  clave: string;
  carrera_id: number;
  turno_id: number;
  constructor(){
    this.nombre = '';
    this.clave = '';
    this.carrera_id = 0;
    this.turno_id = 0;
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

export class Turno {
  id: number;
  turno: string;
  active: boolean;
  constructor() {
    this.id = 0;
    this.turno = '';
    this.active = true;
  }
}