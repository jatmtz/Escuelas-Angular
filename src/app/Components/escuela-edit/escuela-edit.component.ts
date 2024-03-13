import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-escuela-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './escuela-edit.component.html',
  styleUrl: './escuela-edit.component.css'
})
export class EscuelaEditComponent {
  escuelaObj: Escuela;
  escuelaForm: FormGroup;
  estadoObj: Estado;
  estados: Estado[] = [];
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) {
    const escuelaId = this.route.snapshot.paramMap.get('id');
    this.obtenerEscuelaPorId(escuelaId);
    this.escuelaForm = this.formBuilder.group({
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
      estado_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.escuelaObj = new Escuela();
    this.estadoObj = new Estado();
  }

  ngOnInit(): void {
    this.escuelaForm = this.formBuilder.group({
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
      estado_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.obtenerEstados();
  }
  

  editarEscuela() {
    this.http.put('http://' + window.location.hostname + ':8000/api/putEscuelas/' + this.escuelaObj.id, this.escuelaObj).subscribe((res: any) => {
      if (res.msg === "Escuela actualizada") {
        alert("Escuela actualizada");
        this.router.navigate(['/layout/escuelas']);
      } else {
        console.log("Error al actualizar la escuela:", res);
      }
    });
  }

  obtenerEstados() {
    this.http.get('http://' + window.location.hostname + ':8000/api/getEstados').subscribe((res: any) => {
      if (res.msg === "Estados") {
        this.estados = res.data;
      } else {
        console.log("Error al obtener los estados:", res);
      }
    });
  }

  obtenerEscuelaPorId(escuelaId: any) {
    this.http.get('http://' + window.location.hostname + ':8000/api/showEscuelas/' + escuelaId).subscribe((res: any) => {
      if (res.msg === "Escuela") {
        this.escuelaObj = res.data;
        this.escuelaObj.id = this.escuelaObj.id;
        this.escuelaObj.nombre = this.escuelaObj.nombre;
        this.escuelaObj.clave = this.escuelaObj.clave;
        this.escuelaObj.estado_id = this.escuelaObj.estado_id;
      } else {
        console.log("Error al obtener los detalles de la escuela:", res);
      }
    });
  }

}

export class Escuela {
  id: number;
  nombre: string;
  clave: string;
  estado_id: number;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.estado_id = 0;
  }
}

export class Estado {
  id: number;
  nombre: string;
  active: boolean;
  constructor() {
    this.id = 0;
    this.nombre = '';
    this.active = true;
  }
}
