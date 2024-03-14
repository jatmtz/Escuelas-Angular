import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-edificio-post',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './edificio-post.component.html',
  styleUrl: './edificio-post.component.css'
})
export class EdificioPostComponent {
  edificioObj: Edificio;
  edificioForm: FormGroup;
  escuelaObj: Escuela;
  escuelas: Escuela[] = [];
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
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
  

  agregarEdificio() {
    if (this.edificioForm.invalid) {
      return; 
    }
    this.http.post('http://' + window.location.hostname + ':8000/api/postEdificios', this.edificioObj).subscribe(
      (res: any) => {
        if (res.msg === "Edificio creada") {
          alert("Edificio creada");
          this.router.navigate(['layout/edificios']);
        } else {
          alert("Error al crear la edificio");
          console.log("Error al crear la edificio:", res);
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
        console.log("Error al obtener los escuelas:", res);
      }
    });
  }

}

export class Edificio {
  nombre: string;
  escuela_id: number;
  constructor(){
    this.nombre = '';
    this.escuela_id = 0;
  }
}

export class Escuela {
  id: number;
  nombre: string;
  active: boolean;
  constructor() {
    this.id = 0;
    this.nombre = '';
    this.active = true;
  }
}