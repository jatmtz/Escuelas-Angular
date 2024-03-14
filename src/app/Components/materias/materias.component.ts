import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css'
})
export class MateriasComponent {
  materiaObj: Materia;
  materias: Materia[] = [];

  constructor(private http: HttpClient,private router: Router) {
    this.materiaObj = new Materia()
  }

  ngOnInit(): void {
    this.obtenerMaterias();
  }

  obtenerMaterias() {
    this.http.get('http://' + window.location.hostname + ':8000/api/getMaterias').subscribe((res: any) => {
      if (res.msg === "Materias") {
        this.materias = res.data;
      } else {
        console.log("Error al obtener las materias:", res);
      }
    });
  }

  editarMateria(materia: any) {
    this.router.navigate(['/materias/editar/', materia.id]);
    console.log('Editar materia:', materia);
  }

  eliminarMateria(materia: Materia) {
    if (confirm("¿Estás seguro de eliminar la materia?")){
    this.http.delete('http://' + window.location.hostname + ':8000/api/deleteMaterias/' + materia.id).subscribe((res: any) => {
      if (res.msg === "Materia eliminada") {
        this.obtenerMaterias();
      } else {
        console.log("Error al eliminar la materia:", res);
      }
    });
    console.log('Eliminar materia:', materia);
  }
}
}

export class Materia {
  id : number;
  nombre: string;
  clave: string;
  carrera_id: number;
  active: boolean;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.carrera_id = 0;
    this.active = false;
  }
}
