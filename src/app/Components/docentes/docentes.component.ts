import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './docentes.component.html',
  styleUrl: './docentes.component.css'
})
export class DocentesComponent {
  docenteObj: Docente;
  rol : string='';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.docenteObj = new Docente()
  }

  docentes: Docente[] = [];

  ngOnInit(): void {
    console.log('Rol:', this.cookieService.get('rol'));
    this.rol = this.cookieService.get('rol');
    this.obtenerDocentes();
  }

  obtenerDocentes() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getDocentes', { headers: headers2 }).subscribe((res: any) => {
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
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (confirm("¿Estás seguro de eliminar al docente?")){
    this.http.delete('http://127.0.0.1:8000/api/auth/deleteDocentes/' + docente.id, { headers: headers2 }).subscribe((res: any) => {
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
