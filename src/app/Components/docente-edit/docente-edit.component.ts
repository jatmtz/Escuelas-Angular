import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-docente-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './docente-edit.component.html',
  styleUrl: './docente-edit.component.css'
})
export class DocenteEditComponent  implements OnInit{
  docente: any;
  docenteObj: Docente;
  docenteForm: FormGroup;

  constructor( 
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {
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
    const docenteId = this.route.snapshot.paramMap.get('id');
    this.obtenerDocentePorId(docenteId);
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

  editarDocente() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put('http://' + window.location.hostname + ':8000/api/auth/putDocentes/' + this.docente.id, this.docenteObj, { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Docente actualizado") {
        alert("Docente actualizado");
        this.router.navigate(['/layout/profesores']);
      } else {
        console.log("Error al actualizar el docente:", res);
      }
    });
  }

  obtenerDocentePorId(docenteId: any) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://' + window.location.hostname + ':8000/api/auth/showDocentes/' + docenteId,{ headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Docente") {
        this.docente = res.data;
        this.docenteObj.id = this.docente.id;
        this.docenteObj.nombre = this.docente.nombre;
        this.docenteObj.apellido_materno = this.docente.apellido_materno;
        this.docenteObj.apellido_paterno = this.docente.apellido_paterno;
        this.docenteObj.rfc = this.docente.rfc;
        this.docenteObj.active = this.docente.active;
      } else {
        console.log("Error al obtener los detalles del docente:", res);
      }
    });
  }
}

export class Docente {
  id: number;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  rfc: string;
  active: boolean;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.apellido_materno = '';
    this.apellido_paterno = '';
    this.rfc = '';
    this.active = true;
  }
}
