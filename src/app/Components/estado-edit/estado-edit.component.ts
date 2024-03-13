import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-estado-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './estado-edit.component.html',
  styleUrl: './estado-edit.component.css'
})
export class EstadoEditComponent  implements OnInit{
  estado: any;
  estadoObj: Estado;
  estadoForm: FormGroup;

  constructor( 
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
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
    const estadoId = this.route.snapshot.paramMap.get('id');
    this.obtenerEstadoPorId(estadoId);
    this.estadoForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]]
    });
  }

  editarEstado() {
    this.http.put('http://' + window.location.hostname + ':8000/api/putEstados/' + this.estado.id, this.estadoObj).subscribe((res: any) => {
      if (res.msg === "Estado actualizado") {
        alert("Estado actualizado");
        this.router.navigate(['/layout/estados']);
      } else {
        console.log("Error al actualizar el estado:", res);
      }
    });
  }

  obtenerEstadoPorId(estadoId: any) {
    this.http.get('http://' + window.location.hostname + ':8000/api/showEstados/' + estadoId).subscribe((res: any) => {
      if (res.msg === "Estado") {
        this.estado = res.data;
        this.estadoObj.id = this.estado.id;
        this.estadoObj.nombre = this.estado.nombre;
        this.estadoObj.active = this.estado.active;
      } else {
        console.log("Error al obtener los detalles del estado:", res);
      }
    });
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
