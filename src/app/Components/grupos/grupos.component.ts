import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {
  grupoObj: Grupo;
  grupos: Grupo[] = [];

  constructor(private http: HttpClient,private router: Router) {
    this.grupoObj = new Grupo()
  }

  ngOnInit(): void {
    this.obtenerGrupos();
  }

  obtenerGrupos() {
    this.http.get('http://' + window.location.hostname + ':8000/api/getGrupos').subscribe((res: any) => {
      if (res.msg === "Grupos") {
        this.grupos = res.data;
      } else {
        console.log("Error al obtener las grupos:", res);
      }
    });
  }

  editarGrupo(grupo: any) {
    this.router.navigate(['/grupos/editar/', grupo.id]);
    console.log('Editar grupo:', grupo);
  }

  eliminarGrupo(grupo: Grupo) {
    if (confirm("¿Estás seguro de eliminar la grupo?")){
    this.http.delete('http://' + window.location.hostname + ':8000/api/deleteGrupos/' + grupo.id).subscribe((res: any) => {
      if (res.msg === "grupo eliminada") {
        this.obtenerGrupos();
      } else {
        console.log("Error al eliminar la grupo:", res);
      }
    });
    console.log('Eliminar grupo:', grupo);
  }
}
}

export class Grupo {
  id : number;
  nombre: string;
  clave: string;
  carrera_id: number;
  turno_id: number;
  active: boolean;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.carrera_id = 0;
    this.turno_id = 0;
    this.active = false;
  }
}
