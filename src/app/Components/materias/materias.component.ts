import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css'
})
export class MateriasComponent {
  materiaObj: Materia;
  materias: Materia[] = [];
  rol : string='';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.materiaObj = new Materia()
  }

  ngOnInit(): void {
    this.rol = this.cookieService.get('rol');
    this.obtenerMaterias();
  }

  obtenerMaterias() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getMaterias', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Materias") {
        this.materias = res.data;
      } else {
        console.log("Error al obtener las materias:", res);
      }
    });
  }

  editarMateria(materia: any) {
    this.router.navigate(['/materias/editar/', materia.id]);
    console.log('Editar materia:', materia);
  }

  eliminarMateria(materia: Materia) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (confirm("¿Estás seguro de eliminar la materia?")){
    this.http.delete('http://127.0.0.1:8000/api/auth/deleteMaterias/' + materia.id, { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Materia eliminada") {
        this.obtenerMaterias();
      } else {
        console.log("Error al eliminar la materia:", res);
      }
    });
    console.log('Eliminar materia:', materia);
  }
}
}

export class Materia {
  id : number;
  nombre: string;
  clave: string;
  carrera_id: number;
  active: boolean;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.clave = '';
    this.carrera_id = 0;
    this.active = false;
  }
}
