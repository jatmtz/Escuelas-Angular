import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-escuela-post',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './escuela-post.component.html',
  styleUrl: './escuela-post.component.css'
})
export class EscuelaPostComponent {
  escuelaObj: Escuela;
  escuelaForm: FormGroup;
  estadoObj: Estado;
  estados: Estado[] = [];
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
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
  

  agregarEscuela() {
    if (this.escuelaForm.invalid) {
      return; 
    }
    this.http.post('http://' + window.location.hostname + ':8000/api/postEscuelas', this.escuelaObj).subscribe(
      (res: any) => {
        if (res.msg === "Escuela creada") {
          alert("Escuela creada");
          this.router.navigate(['layout/escuelas']);
        } else {
          alert("Error al crear la escuela");
          console.log("Error al crear la escuela:", res);
        }
      },
      (error) => {
        console.error("Error en la solicitud HTTP:", error);
      }
    );
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

}

export class Escuela {
  nombre: string;
  clave: string;
  estado_id: number;
  constructor(){
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
