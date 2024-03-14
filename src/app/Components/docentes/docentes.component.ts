import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './docentes.component.html',
  styleUrl: './docentes.component.css'
})
export class DocentesComponent {
  docenteObj: Docente;

  constructor(private http: HttpClient,private router: Router) {
    this.docenteObj = new Docente()
  }

  docentes: Docente[] = [];

  ngOnInit(): void {
    this.obtenerDocentes();
  }

  obtenerDocentes() {
    this.http.get('http://' + window.location.hostname + ':8000/api/getDocentes').subscribe((res: any) => {
      if (res.msg === "Docentes") {
        this.docentes = res.data;
      } else {
        console.log("Error al obtener los docentes:", res);
      }
    });
  }

  editarDocente(docente: Docente) {
    this.router.navigate(['/editar/', docente.id]);
    console.log('Editar docente:', docente);
  }

  eliminarDocente(docente: Docente) {
    if(confirm("¿Estás seguro de eliminar el docente?")){
      this.http.delete('http://' + window.location.hostname + ':8000/api/deleteDocentes/' + docente.id).subscribe((res: any) => {
      if (res.msg === "Docente eliminado") {
        this.obtenerDocentes();
      } else {
        console.log("Error al eliminar el docente:", res);
      }
    });
    console.log('Eliminar docente:', docente);
    }
  }

}

export class Docente {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rfc: string;
  active: boolean;
  constructor() {
    this.id = 0;
    this.apellido_materno = '';
    this.nombre = '';
    this.apellido_paterno = '';
    this.rfc = '';
    this.active = true;
  }
}
