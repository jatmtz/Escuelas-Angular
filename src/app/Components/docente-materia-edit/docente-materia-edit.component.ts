import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-docente-materia-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './docente-materia-edit.component.html',
  styleUrl: './docente-materia-edit.component.css'
})
export class DocenteMateriaEditComponent implements OnInit { 
  docenteMateriaObj: DocenteMateria;
  docenteMateriaForm: FormGroup;
  docenteMateria : any;
  docenteObj: Docente;
  materiaObj: Materia;
  docentes: Docente[] = [];
  materias: Materia[] = [];

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder,
    private cookieService: CookieService, private route: ActivatedRoute) {
    this.docenteMateriaForm = this.formBuilder.group({
      docente_id: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]],
      materia_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.docenteMateriaObj = new DocenteMateria();
    this.docenteObj = new Docente();
    this.materiaObj = new Materia();
  }

  ngOnInit(): void {
    const docenteMateria = this.route.snapshot.paramMap.get('id');
    this.obtenerDocenteMateriaPorId(docenteMateria);
    this.docenteMateriaForm = this.formBuilder.group({
      docente_id: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]],
      materia_id: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.obtenerDocentes();
    this.obtenerMaterias();
  }

  obtenerDocentes() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getDocentes', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Docentes") {
        this.docentes = res.data;
      } else {
        console.log("Error al obtener los docentes:", res);
      }
    });
  }

  obtenerMaterias() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getMaterias', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Materias") {
        this.materias = res.data;
      } else {
        console.log("Error al obtener las materias:", res);
      }
    });
  }

  agregarDocenteMateria() {
    if (this.docenteMateriaForm.invalid) {
      return;
    }
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put('http://' + window.location.hostname + ':8000/api/auth/putDocentesCarreras/'+this.docenteMateria.id, this.docenteMateriaObj, { headers: headers2 }).subscribe(
      (res: any) => {
        if (res.msg === "Se actualizo correctamente") {
          alert("DocenteCarrera asignado");
          this.router.navigate(['layout/docenteMateria']);
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

  obtenerDocenteMateriaPorId(docenteId: any) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://' + window.location.hostname + ':8000/api/auth/showDocentesCarreras/' + docenteId,{ headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "DocenteCarrera") {
        this.docenteMateria = res.data;
        this.docenteMateriaObj.id = this.docenteMateria.id;
        this.docenteMateriaObj.docente_id = this.docenteMateria.docente_id;
        this.docenteMateriaObj.materia_id = this.docenteMateria.materia_id;
      } else {
        console.log("Error al obtener los detalles:", res);
      }
    });
  }
}

export class DocenteMateria {
  id: number;
  docente_id: number;
  materia_id: number;
  constructor() {
    this.id = 0;
    this.docente_id = 0;
    this.materia_id = 0;
  }
}

export class Docente {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rfc: string;
  active: boolean;
  constructor() {
    this.id = 0;
    this.apellido_materno = '';
    this.nombre = '';
    this.apellido_paterno = '';
    this.rfc = '';
    this.active = true;
  }
}

export class Materia {
  id : number;
  nombre: string;
  clave: string;
  carrera_id: number;
  active: boolean;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.carrera_id = 0;
    this.active = false;
  }
}