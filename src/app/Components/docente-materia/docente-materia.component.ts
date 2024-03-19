import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-docente-materia',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './docente-materia.component.html',
  styleUrl: './docente-materia.component.css'
})

export class DocenteMateriaComponent implements OnInit{
  docenteMateriaObj: DocenteMateria;
  rol : string = '';
  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.docenteMateriaObj = new DocenteMateria()
  }

  ngOnInit(): void {
    this.rol = this.cookieService.get('rol');
    this.obtenerDocenteMaterias();
  }

  docenteMaterias: DocenteMateria[] = [];

  obtenerDocenteMaterias() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getDocentesCarreras', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "DocenteCarreras") {
        this.docenteMaterias = res.data;
      } else {
        console.log("Error al obtener los datos", res);
      }
    }); 
  }

  editarDocenteMateria(docenteMateria: any) {
    this.router.navigate(['/docenteMateria/editar/', docenteMateria.id]);
    console.log('Editar docenteMateria:', docenteMateria);
  }

  eliminarDocenteMateria(docenteMateria: DocenteMateria) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(confirm("¿Estás seguro de eliminar?")){
      this.http.delete('http://127.0.0.1:8000/api/auth/deleteDocentesCarreras/' + docenteMateria.id, { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Se elimino correctamente") {
        this.obtenerDocenteMaterias();
      } else {
        console.log("Error al eliminar la departamento:", res);
      }
    });
    console.log('Eliminar departamento:', docenteMateria);
  }
  }

}

export class DocenteMateria {
  id: number;
  docente_id: number;
  materia_id: number;
  constructor() {
    this.id = 0;
    this.docente_id = 0;
    this.materia_id = 0;
  }
}
