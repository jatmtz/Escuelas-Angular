import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

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
  rol : string='';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.escuelaObj = new Escuela()

  }

  ngOnInit(): void {
    console.log('Rol:', this.cookieService.get('rol'));
    this.rol = this.cookieService.get('rol');
    this.obtenerEscuelas();
  }

  obtenerEscuelas() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getEscuelas', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Escuelas") {
        this.escuelas = res.data;
      } else {
        console.log("Error al obtener las escuelas:", res);
      }
    });
  }

  editarEscuela(escuela: any) {
    this.router.navigate(['/escuelas/editar/', escuela.id]);
  }

  eliminarEscuela(escuela: Escuela) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (confirm("¿Estás seguro de eliminar la escuela?")){
    this.http.delete('http://127.0.0.1:8000/api/auth/deleteEscuelas/' + escuela.id, { headers: headers2 }).subscribe((res: any) => {
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
