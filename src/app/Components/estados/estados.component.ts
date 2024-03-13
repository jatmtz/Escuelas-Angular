import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-estados',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './estados.component.html',
  styleUrl: './estados.component.css'
})
export class EstadosComponent implements OnInit{
  estadoObj: Estado;

  constructor(private http: HttpClient,private router: Router) {
    this.estadoObj = new Estado()
  }

  estados: Estado[] = [];

  ngOnInit(): void {
    this.obtenerEstados();
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

  editarEstado(estado: Estado) {
    this.router.navigate(['/editar/', estado.id]);
    console.log('Editar estado:', estado);
  }

  eliminarEstado(estado: Estado) {
    if(confirm("¿Estás seguro de eliminar el estado?")){
      this.http.delete('http://' + window.location.hostname + ':8000/api/deleteEstados/' + estado.id).subscribe((res: any) => {
      if (res.msg === "Estado eliminado") {
        this.obtenerEstados();
      } else {
        console.log("Error al eliminar el estado:", res);
      }
    });
    console.log('Eliminar estado:', estado);
    }
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