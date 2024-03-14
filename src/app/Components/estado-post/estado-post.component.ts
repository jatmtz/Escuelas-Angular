import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-estado-post',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './estado-post.component.html',
  styleUrl: './estado-post.component.css'
})
export class EstadoPostComponent {
  estadoObj: Estado;
  estadoForm: FormGroup;
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.estadoForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]]
    });
    this.estadoObj = new Estado();
  }

  ngOnInit(): void {
    this.estadoForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]]
    });
  }
  

  agregarEstado() {
    if (this.estadoForm.invalid) {
      return;
    }
    const token = localStorage.getItem('token');
    const hederss = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://127.0.0.1:8000/api/auth/postEstados', this.estadoObj, { headers: hederss }).subscribe(
      (res: any) => {
        if (res.msg === "Estado creado") {
          alert("Estado creado");
          this.router.navigate(['layout/estados']);
        } else {
          alert("Error al crear el estado");
          console.log("Error al crear el estado:", res);
        }
      },
      (error) => {
        console.error("Error en la solicitud HTTP:", error);
      }
    );
  }
}

export class Estado {
  nombre: string;
  constructor() {
    this.nombre = '';
  }
}
