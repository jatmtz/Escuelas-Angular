import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userObj: User;
  users: User[] = [];
  rol : string='';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.userObj = new User()
  }

  ngOnInit(): void {
    console.log('Rol:', this.cookieService.get('rol'));
    this.rol = this.cookieService.get('rol');
    this.getUsers();
  }

  getUsers() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getUsers', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Usuarios") {
        this.users = res.data;
      } else {
        console.log("Error al obtener los usuarios:", res);
      }
    });
  }

  editUser(user: any) {
    this.router.navigate(['/users/editar/', user.id]);
    console.log('Editar usuario:', user);
  }

  deleteUser(user: User) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (confirm("¿Estás seguro de eliminar el usuario?")){
    this.http.delete('http://127.0.0.1:8000/api/auth/deleteUsers/' + user.id, { headers: headers2 }).subscribe((res: any) => {
        if (res.msg === "Usuario eliminado") {
          this.getUsers();
        } else {
          console.log("Error al eliminar el usuario:", res);
        }
      });
      console.log('Eliminar usuario:', user);
    }
  }
}

export class User {
  id : number;
  name: string;
  email: string;
  rol_id: number;
  estado: boolean;
  verificado: boolean;
  constructor(){
    this.id = 0;
    this.name = '';
    this.email = '';
    this.rol_id = 0;
    this.estado = false;
    this.verificado = false;
  }
}
