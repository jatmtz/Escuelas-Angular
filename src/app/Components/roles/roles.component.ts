import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  rolObj: Rol;

  constructor(private http: HttpClient,private router: Router) {
    this.rolObj = new Rol()
  }

  roles: Rol[] = [];

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles() {
    this.http.get('http://' + window.location.hostname + ':8000/api/getRoles').subscribe((res: any) => {
      if (res.msg === "Roles") {
        this.roles = res.data;
      } else {
        console.log("Error al obtener los roles:", res);
      }
    });
  }

  editarRol(rol: Rol) {
    this.router.navigate(['/editar/', rol.id]);
    console.log('Editar rol:', rol);
  }

  eliminarRol(rol: Rol) {
    if(confirm("¿Estás seguro de eliminar el rol?")){
      this.http.delete('http://' + window.location.hostname + ':8000/api/deleteRoles/' + rol.id).subscribe((res: any) => {
      if (res.msg === "Rol eliminado") {
        this.obtenerRoles();
      } else {
        console.log("Error al eliminar el rol:", res);
      }
    });
    console.log('Eliminar rol:', rol);
    }
  }

}

export class Rol {
  id: number;
  name: string;
  active: boolean;
  constructor() {
    this.id = 0;
    this.name = '';
    this.active = true;
  }
}