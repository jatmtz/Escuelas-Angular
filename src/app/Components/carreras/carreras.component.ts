import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

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
  rol : string='';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.carreraObj = new Carrera()
  }

  ngOnInit(): void {
    console.log('Rol:', this.cookieService.get('rol'));
    this.rol = this.cookieService.get('rol');
    this.obtenerCarreras();
  }

  obtenerCarreras() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://' + window.location.hostname + ':8000/api/auth/getCarreras', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Carreras") {
        this.carreras = res.data;
      } else {
        console.log("Error al obtener las varreras:", res);
      }
    });
  }

  editarCarrera(carrera: any) {
    this.router.navigate(['/carreras/editar/', carrera.id]);
    console.log('Editar carrera:', carrera);
  }

  eliminarCarrera(carrera: Carrera) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (confirm("¿Estás seguro de eliminar la carrera?")){
    this.http.delete('http://' + window.location.hostname + ':8000/api/auth/deleteCarreras/' + carrera.id, { headers: headers2 }).subscribe((res: any) => {
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




