import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-materia-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './materia-edit.component.html',
  styleUrl: './materia-edit.component.css'
})
export class MateriaEditComponent {
  materiaObj: Materia;
  materiaForm: FormGroup;
  carreraObj: Carrera;
  carreras: Carrera[] = [];
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) {
    const materiaId = this.route.snapshot.paramMap.get('id');
    this.obtenerMateriaPorId(materiaId);
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
  

  editarMateria() {
    this.http.put('http://127.0.0.0.1:8000/api/putMaterias/' + this.materiaObj.id, this.materiaObj).subscribe((res: any) => {
      if (res.msg === "Materia actualizada") {
        alert("Materia actualizada");
        this.router.navigate(['/layout/materias']);
      } else {
        console.log("Error al actualizar la materia:", res);
      }
    });
  }

  obtenerCarreras() {
    this.http.get('http://127.0.0.0.1:8000/api/getCarreras').subscribe((res: any) => {
      if (res.msg === "Carreras") {
        this.carreras = res.data;
      } else {
        console.log("Error al obtener los carreras:", res);
      }
    });
  }

  obtenerMateriaPorId(materiaId: any) {
    this.http.get('http://127.0.0.0.1:8000/api/showMaterias/' + materiaId).subscribe((res: any) => {
      if (res.msg === "Materia") {
        this.materiaObj = res.data;
        this.materiaObj.id = this.materiaObj.id;
        this.materiaObj.nombre = this.materiaObj.nombre;
        this.materiaObj.clave = this.materiaObj.clave;
        this.materiaObj.carrera_id = this.materiaObj.carrera_id;
      } else {
        console.log("Error al obtener los detalles de la materia:", res);
      }
    });
  }

}

export class Materia {
  id: number;
  nombre: string;
  clave: string;
  carrera_id: number;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.carrera_id = 0;
  }
}

export class Carrera {
  id: number;
  nombre: string;
  active: boolean;
  constructor() {
    this.id = 0;
    this.nombre = '';
    this.active = true;
  }
}
