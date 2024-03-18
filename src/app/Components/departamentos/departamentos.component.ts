import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css'
})
export class DepartamentosComponent {
  departamentoObj: Departamento;
  departamentos: Departamento[] = [];
  rol : string = '';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.departamentoObj = new Departamento()
  }

  ngOnInit(): void {
    this.rol = this.cookieService.get('rol');
    this.obtenerDepartamentos();
  }

  obtenerDepartamentos() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getDepartamentos', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Departamentos") {
        this.departamentos = res.data;
      } else {
        console.log("Error al obtener las departamentos:", res);
      }
    });
  }

  editarDepartamento(departamento: any) {
    this.router.navigate(['/departamentos/editar/', departamento.id]);
    console.log('Editar departamento:', departamento);
  }

  eliminarDepartamento(departamento: Departamento) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(confirm("¿Estás seguro de eliminar el departamento?")){
      this.http.delete('http://127.0.0.1:8000/api/auth/deleteDepartamentos/' + departamento.id, { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Departamento eliminada") {
        this.obtenerDepartamentos();
      } else {
        console.log("Error al eliminar la departamento:", res);
      }
    });
    console.log('Eliminar departamento:', departamento);
  }
}
}

export class Departamento {
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