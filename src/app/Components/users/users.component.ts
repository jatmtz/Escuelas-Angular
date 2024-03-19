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
export class UsersComponent implements OnInit {
  userObj: User;
  rol : string='';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.userObj = new User()
  }
  users: User[] = [];

  ngOnInit(): void {
    this.rolUser();
    this.rol = this.cookieService.get('rol');
    this.getUsers();
  }

  rolUser(){
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://127.0.0.1:8000/api/auth/me', {}, { headers: headers2 }).subscribe((rest: any) => {
      if (rest && rest.verificado === 1) {
        this.cookieService.delete('rol');
        this.cookieService.set('rol', rest.rol_id);
        return true;
      }
      this.router.navigate(['/codigo']);
      return false;
    });
  }

  getUsers() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/get', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Usuarios") {
        this.users = res.data;
      } else {
        alert("Error al obtener los usuarios");
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
    this.http.delete('http://127.0.0.1:8000/api/auth/delete/' + user.id, { headers: headers2 }).subscribe((res: any) => {
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
