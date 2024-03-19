import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-materia-post',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './materias-post.component.html',
  styleUrl: './materias-post.component.css'
})
export class MateriaPostComponent {
  materiaObj: Materia;
  materiaForm: FormGroup;
  carreraObj: Carrera;
  carreras: Carrera[] = [];
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService) {
    this.materiaForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]],
      clave: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]],
      carrera_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.materiaObj = new Materia();
    this.carreraObj = new Carrera();
  }

  ngOnInit(): void {
    this.materiaForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]],
      clave: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]],
      carrera_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.obtenerCarreras();
  }
  

  agregarMateria() {
    if (this.materiaForm.invalid) {
      return; 
    }
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://' + window.location.hostname + ':8000/api/auth/postMaterias', this.materiaObj,{ headers: headers2 }).subscribe(
      (res: any) => {
        if (res.msg === "Materia creada") {
          alert("Materia creada");
          this.router.navigate(['layout/materias']);
        } else {
          alert("Error al crear la materia");
          console.log("Error al crear la materia:", res);
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
    this.http.get('http://' + window.location.hostname + ':8000/api/auth/getCarreras',{ headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Carreras") {
        this.carreras = res.data;
      } else {
        console.log("Error al obtener los carreras:", res);
      }
    });
  }

}

export class Materia {
  nombre: string;
  clave: string;
  carrera_id: number;
  constructor(){
    this.nombre = '';
    this.clave = '';
    this.carrera_id = 0;
  }
}

export class Carrera {
  id: number;
  nombre: string;
  clave: string;
  escuela_id: string;
  active: boolean;
  constructor() {
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.escuela_id = '';
    this.active = true;
  }
}
