import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent {
  alumnoObj: Alumno;
  alumnos: Alumno[] = [];
  rol : string='';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.alumnoObj = new Alumno()

  }

  ngOnInit(): void {
    console.log('Rol:', this.cookieService.get('rol'));
    this.rol = this.cookieService.get('rol');
    this.obtenerAlumnos();
  }

  obtenerAlumnos() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getAlumnos', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Alumnos") {
        this.alumnos = res.data;
      } else {
        console.log("Error al obtener las alumnos:", res);
      }
    });
  }

  editarAlumno(alumno: any) {
    this.router.navigate(['/alumnos/editar/', alumno.id]);
  }

  eliminarAlumno(alumno: Alumno) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (confirm("¿Estás seguro de eliminar la alumno?")){
    this.http.delete('http://127.0.0.1:8000/api/auth/deleteAlumnos/' + alumno.id, { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Alumno eliminada") {
        this.obtenerAlumnos();
      } else {
        console.log("Error al eliminar la alumno:", res);
      }
    });
    console.log('Eliminar alumno:', alumno);
  }
}
}

export class Alumno {
  id : number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  matricula: string;
  carrera_id: number;
  grupo_id: number;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.apellido_materno = '';
    this.apellido_paterno = '';
    this.matricula = '';
    this.carrera_id = 0;
    this.grupo_id = 0;
  }
}
