import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edificio-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './edificio-edit.component.html',
  styleUrl: './edificio-edit.component.css'
})
export class EdificioEditComponent {
  edificioObj: Edificio;
  edificioForm: FormGroup;
  escuelaObj: Escuela;
  escuelas: Escuela[] = [];
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService) {
    const edificioId = this.route.snapshot.paramMap.get('id');
    this.obtenerEdificioPorId(edificioId);
    this.edificioForm = this.formBuilder.group({
      nombre: ['', [
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
    this.edificioObj = new Edificio();
    this.escuelaObj = new Escuela();
  }

  ngOnInit(): void {
    this.edificioForm = this.formBuilder.group({
      nombre: ['', [
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
    this.obtenerEscuelas();
  }
  

  editarEdificio() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put('http://127.0.0.1:8000/api/auth/putEdificios/' + this.edificioObj.id, this.edificioObj, { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Edificio actualizado") {
        alert("Edificio actualizado");
        this.router.navigate(['/layout/edificios']);
      } else {
        console.log("Error al actualizar la edificio:", res);
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

  obtenerEdificioPorId(edificioId: any) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/showEdificios/' + edificioId,{ headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Edificio") {
        this.edificioObj = res.data;
        this.edificioObj.id = this.edificioObj.id;
        this.edificioObj.nombre = this.edificioObj.nombre;
        this.edificioObj.escuela_id = this.edificioObj.escuela_id;
      } else {
        console.log("Error al obtener los detalles de la edificio:", res);
      }
    });
  }

}

export class Edificio {
  id: number;
  nombre: string;
  escuela_id: number;
  constructor(){
    this.id = 0;
    this.nombre = '';
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
