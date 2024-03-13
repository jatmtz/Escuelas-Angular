import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.css'
})
export class CarrerasComponent {
  carreraObj: Carrera;
  carreras: Carrera[] = [];

  constructor(private http: HttpClient,private router: Router) {
    this.carreraObj = new Carrera()
  }

  ngOnInit(): void {
    this.obtenerCarreras();
  }

  obtenerCarreras() {
    this.http.get('http://' + window.location.hostname + ':8000/api/getCarreras').subscribe((res: any) => {
      if (res.msg === "Carreras") {
        this.carreras = res.data;
      } else {
        console.log("Error al obtener las escuelas:", res);
      }
    });
  }

  editarCarrera(carrera: any) {
    this.router.navigate(['/carreras/editar/', carrera.id]);
    console.log('Editar carrera:', carrera);
  }

  eliminarCarrera(carrera: Carrera) {
    if (confirm("¿Estás seguro de eliminar la carrera?")){
    this.http.delete('http://' + window.location.hostname + ':8000/api/deleteCarreras/' + carrera.id).subscribe((res: any) => {
      if (res.msg === "Carrera eliminada") {
        this.obtenerCarreras();
      } else {
        console.log("Error al eliminar la carrera:", res);
      }
    });
    console.log('Eliminar carrera:', carrera);
  }
}
}

export class Carrera {
  id : number;
  nombre: string;
  clave: string;
  escuela_id: number;
  active: boolean;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.escuela_id = 0;
    this.active = false;
  }

}




