import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-carrera-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './carrera-edit.component.html',
  styleUrl: './carrera-edit.component.css'
})
export class CarreraEditComponent {
  carreraObj: Carrera;
  carreraForm: FormGroup;
  escuelaObj: Escuela;
  escuelas: Escuela[] = [];
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder,
    private cookieService: CookieService) {
    const carreraId = this.route.snapshot.paramMap.get('id');
    this.obtenerCarreraPorId(carreraId);
    this.carreraForm = this.formBuilder.group({
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
      escuela_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.carreraObj = new Carrera();
    this.escuelaObj = new Escuela();
  }

  ngOnInit(): void {
    this.carreraForm = this.formBuilder.group({
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
      escuela_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.obtenerEscuelas();
  }
  

  editarCarrera() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put('http://127.0.0.1:8000/api/auth/putCarreras/' + this.carreraObj.id, this.carreraObj,{ headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Carrera actualizada") {
        alert("Carrera actualizada");
        this.router.navigate(['/layout/carreras']);
      } else {
        console.log("Error al actualizar la carrera:", res);
      }
    });
  }

  obtenerEscuelas() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getEscuelas', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Escuelas") {
        this.escuelas = res.data;
      } else {
        console.log("Error al obtener los escuelas:", res);
      }
    });
  }

  obtenerCarreraPorId(carreraId: any) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/showCarreras/' + carreraId,{ headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Carrera") {
        this.carreraObj = res.data;
        this.carreraObj.id = this.carreraObj.id;
        this.carreraObj.nombre = this.carreraObj.nombre;
        this.carreraObj.clave = this.carreraObj.clave;
        this.carreraObj.escuela_id = this.carreraObj.escuela_id;
      } else {
        console.log("Error al obtener los detalles de la carrera:", res);
      }
    });
  }

}

export class Carrera {
  id: number;
  nombre: string;
  clave: string;
  escuela_id: number;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.escuela_id = 0;
  }
}

export class Escuela {
  id: number;
  nombre: string;
  clave: string;
  estado_id: string;
  active: boolean;
  constructor() {
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.estado_id= '';
    this.active = true;
  }
}
