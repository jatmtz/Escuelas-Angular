import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  rolObj: Rol;
  roll : string='';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.rolObj = new Rol()
  }

  roles: Rol[] = [];

  ngOnInit(): void {
    console.log('Rol:', this.cookieService.get('rol'));
    this.roll = this.cookieService.get('rol');
    this.obtenerRoles();
  }

  obtenerRoles() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getRoles', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Roles") {
        this.roles = res.data;
      } else {
        console.log("Error al obtener los roles:", res);
      }
    });
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