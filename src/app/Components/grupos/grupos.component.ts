import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

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
  rol : string='';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.grupoObj = new Grupo()
  }

  ngOnInit(): void {
    console.log('Rol:', this.cookieService.get('rol'));
    this.rol = this.cookieService.get('rol');
    this.obtenerGrupos();
  }

  obtenerGrupos() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getGrupos', { headers: headers2 }).subscribe((res: any) => {
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
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (confirm("¿Estás seguro de eliminar el grupo?")){
    this.http.delete('http://127.0.0.1:8000/api/auth/deleteGrupos/' + grupo.id, { headers: headers2 }).subscribe((res: any) => {
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
