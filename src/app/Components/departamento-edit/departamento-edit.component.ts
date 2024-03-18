import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-departamento-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './departamento-edit.component.html',
  styleUrl: './departamento-edit.component.css'
})
export class DepartamentoEditComponent {
  departamentoObj: Departamento;
  departamentoForm: FormGroup;
  escuelaObj: Escuela;
  escuelas: Escuela[] = [];
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) {
    const departamentoId = this.route.snapshot.paramMap.get('id');
    this.obtenerDepartamentoPorId(departamentoId);
    this.departamentoForm = this.formBuilder.group({
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
      ]], 
      clave: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]]
    });
    this.departamentoObj = new Departamento();
    this.escuelaObj = new Escuela();
  }

  ngOnInit(): void {
    this.departamentoForm = this.formBuilder.group({
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
      ]], 
      clave: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]]
    });
    this.obtenerEscuelas();
  }
  

  editarDepartamento() {
    this.http.put('http://127.0.0.0.1:8000/api/putDepartamentos/' + this.departamentoObj.id, this.departamentoObj).subscribe((res: any) => {
      if (res.msg === "Departamento actualizada") {
        alert("Departamento actualizada");
        this.router.navigate(['/layout/departamentos']);
      } else {
        console.log("Error al actualizar la departamento:", res);
      }
    });
  }

  obtenerEscuelas() {
    this.http.get('http://127.0.0.0.1:8000/api/getEscuelas').subscribe((res: any) => {
      if (res.msg === "Escuelas") {
        this.escuelas = res.data;
      } else {
        console.log("Error al obtener los escuelas:", res);
      }
    });
  }

  obtenerDepartamentoPorId(departamentoId: any) {
    this.http.get('http://127.0.0.0.1:8000/api/showDepartamentos/' + departamentoId).subscribe((res: any) => {
      if (res.msg === "Departamento") {
        this.departamentoObj = res.data;
        this.departamentoObj.id = this.departamentoObj.id;
        this.departamentoObj.nombre = this.departamentoObj.nombre;
        this.departamentoObj.escuela_id = this.departamentoObj.escuela_id;
      } else {
        console.log("Error al obtener los detalles de la departamento:", res);
      }
    });
  }

}

export class Departamento {
  id: number;
  nombre: string;
  clave: string;
  escuela_id: number;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.clave= '';
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