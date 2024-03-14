import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-carrera-post',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './carrera-post.component.html',
  styleUrl: './carrera-post.component.css'
})
export class CarreraPostComponent {
  carreraObj: Carrera;
  carreraForm: FormGroup;
  escuelaObj: Escuela;
  escuelas: Escuela[] = [];
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
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
  

  agregarCarrera() {
    if (this.carreraForm.invalid) {
      return; 
    }
    this.http.post('http://' + window.location.hostname + ':8000/api/postCarreras', this.carreraObj).subscribe(
      (res: any) => {
        if (res.msg === "Carrera creada") {
          alert("Carrera creada");
          this.router.navigate(['layout/carreras']);
        } else {
          alert("Error al crear la carrera");
          console.log("Error al crear la carrera:", res);
        }
      },
      (error) => {
        console.error("Error en la solicitud HTTP:", error);
      }
    );
  }
  

  obtenerEscuelas() {
    this.http.get('http://' + window.location.hostname + ':8000/api/getEscuelas').subscribe((res: any) => {
      if (res.msg === "Escuelas") {
        this.escuelas = res.data;
      } else {
        console.log("Error al obtener las escuelas:", res);
      }
    });
  }

}

export class Carrera {
  nombre: string;
  clave: string;
  escuela_id: number;
  constructor(){
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
