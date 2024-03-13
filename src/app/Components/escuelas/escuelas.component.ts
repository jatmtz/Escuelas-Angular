import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-escuelas',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './escuelas.component.html',
  styleUrl: './escuelas.component.css'
})
export class EscuelasComponent {
  escuelaObj: Escuela;
  escuelas: Escuela[] = [];

  constructor(private http: HttpClient,private router: Router) {
    this.escuelaObj = new Escuela()
  }

  ngOnInit(): void {
    this.obtenerEscuelas();
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

  editarEscuela(escuela: any) {
    this.router.navigate(['/escuelas/editar/', escuela.id]);
    console.log('Editar escuela:', escuela);
  }

  eliminarEscuela(escuela: Escuela) {
    if (confirm("¿Estás seguro de eliminar la escuela?")){
    this.http.delete('http://' + window.location.hostname + ':8000/api/deleteEscuelas/' + escuela.id).subscribe((res: any) => {
      if (res.msg === "Escuela eliminada") {
        this.obtenerEscuelas();
      } else {
        console.log("Error al eliminar la escuela:", res);
      }
    });
    console.log('Eliminar escuela:', escuela);
  }
}
}

export class Escuela {
  id : number;
  nombre: string;
  clave: string;
  estado_id: number;
  active: boolean;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.estado_id = 0;
    this.active = false;
  }
}
